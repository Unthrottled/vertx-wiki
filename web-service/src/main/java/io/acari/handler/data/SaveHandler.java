package io.acari.handler.data;

import io.acari.core.Queries;
import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.mongo.MongoClient;
import io.vertx.ext.sql.SQLConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SaveHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(SaveHandler.class);

  private final MongoClient mongoClient;

  public SaveHandler(MongoClient mongoClient) {
    this.mongoClient = mongoClient;
  }

  @Override
  public void handle(Message<JsonObject> message) {
    JsonObject request = message.body();
    ChainableOptional.ofNullable(request.getString("name"))
      .ifPresent(id -> ChainableOptional.ofNullable(request.getString("content"))
        .ifPresent(content -> {
          JsonObject query = new JsonObject().put("name", id);
          JsonObject update = new JsonObject().put("$set", new JsonObject().put("content", content));
          mongoClient.updateCollection("pages", query, update, aConn -> {
            ChainableOptional.of(aConn)
              .filter(AsyncResult::succeeded)
              .ifPresent(conRes -> {
                message.reply(new JsonObject().put("status", "gewd"));
              })
              .orElseDo(() -> {
                LOGGER.warn("Ohh shit", aConn.cause().getMessage());
                message.fail(ErrorCodes.DB_ERROR.ordinal(), aConn.cause().getMessage());
              });
          });
        })
        .orElseDo(() -> fourHundred(message, "No Title Provided, Bruv."))
      ).orElseDo(() -> fourHundred(message, "No Id Provided, Bruv."));
  }

  private void fourHundred(Message routingContext, String errorMessage) {
    routingContext.fail(400, errorMessage);
  }
}
