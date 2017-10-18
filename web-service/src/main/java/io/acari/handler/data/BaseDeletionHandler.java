package io.acari.handler.data;

import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.mongo.MongoClient;
import io.vertx.rx.java.ObservableFuture;
import io.vertx.rx.java.RxHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BaseDeletionHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(BaseDeletionHandler.class);

  private final MongoClient mongoClient;
  private final String collectionToRemoveFrom;
  private final String collectionToAddTo;
  private final String identifier;

  public BaseDeletionHandler(MongoClient mongoClient, String collectionToRemoveFrom, String collectionToAddTo, String identifier) {
    this.mongoClient = mongoClient;
    this.collectionToRemoveFrom = collectionToRemoveFrom;
    this.collectionToAddTo = collectionToAddTo;
    this.identifier = identifier;
  }


  @Override
  public void handle(Message<JsonObject> message) {
    ChainableOptional.ofNullable(message.body().getString(identifier))
        .ifPresent(identifier -> {
          JsonObject query = new JsonObject().put(this.identifier, identifier);
          ObservableFuture<JsonObject> jsonObjectObservableFuture = RxHelper.observableFuture();
          mongoClient.findOne(collectionToRemoveFrom, query, new JsonObject(), jsonObjectObservableFuture.toHandler());
          jsonObjectObservableFuture.flatMap(page -> {
            ObservableFuture<String> objectObservableFuture = RxHelper.observableFuture();
            mongoClient.save(collectionToAddTo, page, objectObservableFuture.toHandler());
            return objectObservableFuture;
          }).subscribe(result -> mongoClient.removeDocument(collectionToRemoveFrom,
              query,
              asc -> ChainableOptional.of(asc)
                  .filter(AsyncResult::succeeded)
                  .ifPresent(deletRes -> message.reply(new JsonObject().put("status", "gewd")))
                  .orElseDo(() -> {
                    String message1 = asc.cause().getMessage();
                    LOGGER.warn("Ohh shit", message1);
                    message.fail(500, message1);
                  })), error -> {
            LOGGER.warn("aww snap", error);
            message.fail(500, error.getMessage());
          });
        })
        .orElseDo(() -> message.fail(400, "No " + identifier + " entered bruv!"));


  }
}
