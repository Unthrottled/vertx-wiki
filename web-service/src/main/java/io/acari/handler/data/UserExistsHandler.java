package io.acari.handler.data;

import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.mongo.MongoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserExistsHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(UserExistsHandler.class);
  private final MongoClient mongoClient;

  public UserExistsHandler(MongoClient mongoClient) {
    this.mongoClient = mongoClient;
  }

  @Override
  public void handle(Message<JsonObject> message) {
    ChainableOptional.ofNullable(message.body().getString("page"))//it's page cuz I'm a slob
      .ifPresent(pago -> mongoClient.find("user", new JsonObject()
        .put("username", pago), asyncResultHandler -> {
        ChainableOptional.of(asyncResultHandler)
          .filter(AsyncResult::succeeded)
          .ifPresent(result -> message.reply(result.result()
            .stream()
            .peek(a -> LOGGER.info(result.result().toString()))
            .findFirst()
            .map(jsonArray -> new JsonObject()
              .put("exists", !jsonArray.getString("_id").isEmpty()))
            .orElse(new JsonObject()
              .put("exists", false))))
          .orElseDo(() -> {
            LOGGER.warn("Ohhhhhh Sheeit", asyncResultHandler.cause().getMessage());
            message.fail(500, asyncResultHandler.cause().getMessage());
          });
      })).orElseDo(() -> message.fail(400, "No Path Provided, bruv."));
  }
}
