package io.acari.handler.data;

import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.mongo.MongoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserUpdateHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(UserUpdateHandler.class);

  private final MongoClient mongoClient;

  public UserUpdateHandler(MongoClient mongoClient) {
    this.mongoClient = mongoClient;
  }

  @Override
  public void handle(Message<JsonObject> message) {
    JsonObject request = message.body();
    ChainableOptional.ofNullable(request.getString("username"))
        .ifPresent(username -> ChainableOptional.ofNullable(request.getString("role"))
            .ifPresent(role -> {
              JsonObject query = new JsonObject().put("username", username);
              JsonObject update = new JsonObject().put("$set", new JsonObject()
                  .put("roles", new JsonArray().add(role)));
              mongoClient.findOneAndUpdate("user", query, update, getAsyncResultHandler(message));
            }).orElseDo(() -> fourHundred(message, "No role Provided, Bruv."))
        ).orElseDo(() -> fourHundred(message, "No username Provided, Bruv."));
  }

  //todo: dis can be shared :)
  private Handler<AsyncResult<JsonObject>> getAsyncResultHandler(Message<JsonObject> message) {
    return aConn -> ChainableOptional.of(aConn)
        .filter(AsyncResult::succeeded)
        .ifPresent(conRes -> message.reply(new JsonObject().put("status", "gewd")))
        .orElseDo(() -> {
          LOGGER.warn("Ohh shit", aConn.cause().getMessage());
          message.fail(ErrorCodes.DB_ERROR.ordinal(), aConn.cause().getMessage());
        });
  }

  //todo: move dis to some static method.
  private void fourHundred(Message routingContext, String errorMessage) {
    routingContext.fail(400, errorMessage);
  }
}
