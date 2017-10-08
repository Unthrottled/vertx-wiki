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

public class AllPageHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(AllPageHandler.class);

  private final MongoClient mongoClient;

  public AllPageHandler(MongoClient mongoClient) {
    this.mongoClient = mongoClient;
  }


  @Override
  public void handle(Message<JsonObject> message) {
    ChainableOptional.ofNullable(message.body().getInteger("pageNumber"))
      .ifPresent(pageNumber -> mongoClient.find("pages", new JsonObject(), ar -> {
        ChainableOptional.of(ar)
          .filter(AsyncResult::succeeded)
          .ifPresent(listAsyncResult -> {
            JsonArray pages = listAsyncResult.result()
              .stream()
              .map(json -> json.getString("name"))
              .collect(JsonArray::new, JsonArray::add, JsonArray::add);
            message.reply(new JsonObject()
              .put("pages", pages));
          })
          .orElseDo(() -> {
            LOGGER.warn("Ohh shit", ar.cause().getMessage());
            message.fail(ErrorCodes.DB_ERROR.ordinal(), ar.cause().getMessage());
          });
      }))
      .orElseDo(() -> message.fail(ErrorCodes.BAD_ACTION.ordinal(), "No page number"));
  }
}
