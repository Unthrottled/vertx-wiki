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

public class DeletionHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(DeletionHandler.class);

  private final MongoClient mongoClient;

  public DeletionHandler(MongoClient mongoClient) {
    this.mongoClient = mongoClient;
  }


  @Override
  public void handle(Message<JsonObject> message) {
    ChainableOptional.ofNullable(message.body().getString("name"))
        .ifPresent(name -> {
          JsonObject query = new JsonObject().put("name", name);
          ObservableFuture<JsonObject> jsonObjectObservableFuture = RxHelper.observableFuture();
          mongoClient.findOne("pages", query, new JsonObject(), jsonObjectObservableFuture.toHandler());
          jsonObjectObservableFuture.flatMap(page -> {
            ObservableFuture<String> objectObservableFuture = RxHelper.observableFuture();
            mongoClient.save("pageArchive", page, objectObservableFuture.toHandler());
            return objectObservableFuture;
          }).subscribe(result -> mongoClient.removeDocument("pages",
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
        .orElseDo(() -> message.fail(400, "No Name entered bruv!"));


  }
}
