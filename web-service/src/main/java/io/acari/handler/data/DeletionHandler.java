package io.acari.handler.data;

import io.acari.core.Queries;
import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.jdbc.JDBCClient;
import io.vertx.ext.mongo.MongoClient;
import io.vertx.ext.sql.SQLConnection;
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
      .ifPresent(name -> mongoClient.removeDocument("pages",
        new JsonObject().put("name", name),
        asc -> ChainableOptional.of(asc)
          .filter(AsyncResult::succeeded)
          .ifPresent(deletRes -> message.reply(new JsonObject().put("status", "gewd")))
          .orElseDo(() -> {
            String message1 = asc.cause().getMessage();
            LOGGER.warn("Ohh shit", message1);
            message.fail(500, message1);
          })))
      .orElseDo(() -> message.fail(400, "No Name entered bruv!"));


  }
}
