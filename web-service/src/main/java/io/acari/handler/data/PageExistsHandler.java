package io.acari.handler.data;

import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.mongo.MongoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PageExistsHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(PageExistsHandler.class);
  private final MongoClient mongoClient;

  public PageExistsHandler(MongoClient mongoClient) {
    this.mongoClient = mongoClient;
  }

  @Override
  public void handle(Message<JsonObject> message) {
    ChainableOptional.ofNullable(message.body().getString("page"))
      .ifPresent(pago -> mongoClient.find("pages", new JsonObject()
        .put("name", pago), asyncResultHandler -> {
        ChainableOptional.of(asyncResultHandler)
          .filter(AsyncResult::succeeded)
          .ifPresent(result -> {
            message.reply(result.result()
              .stream()
              .findFirst()
              .map(jsonArray -> new JsonObject()
                .put("exists", true))
              .orElse(new JsonObject()
                .put("exists", false)));
          })
          .orElseDo(() -> {
            LOGGER.warn("Ohhhhhh Sheeit", asyncResultHandler.cause().getMessage());
            message.fail(500, asyncResultHandler.cause().getMessage());
          });
      })).orElseDo(() -> message.fail(400, "No Path Provided, bruv."));
  }
}
