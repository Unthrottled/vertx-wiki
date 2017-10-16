package io.acari.handler.data;

import io.acari.util.ChainableOptional;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.mongo.MongoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.function.Function;

public class BasePageHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(BasePageHandler.class);
  private final MongoClient mongoClient;
  private final Function<JsonObject, String> idFunct;
  private final Function<String, JsonObject> queryFunction;
  private final String collection;


  public BasePageHandler(MongoClient mongoClient,
                         Function<JsonObject, String> idFunct,
                         Function<String, JsonObject> queryFunction,
                         String collection) {
    this.mongoClient = mongoClient;
    this.idFunct = idFunct;
    this.queryFunction = queryFunction;
    this.collection = collection;
  }

  @Override
  public void handle(Message<JsonObject> message) {
    ChainableOptional.ofNullable(idFunct.apply(message.body()))
        .ifPresent(id -> mongoClient.find(collection, queryFunction.apply(id),
            asyncResultHandler -> {
              if (asyncResultHandler.succeeded()) {
                List<JsonObject> result = asyncResultHandler.result();
                ChainableOptional.of(result
                    .stream()
                    .findFirst()
                    .map(jsonArray -> new JsonObject()
                        .put("lastModified", jsonArray.getJsonObject("lastModified"))
                        .put("content", jsonArray.getString("content")))
                    .orElse(null))
                    .ifPresent(message::reply)
                    .orElseDo(() -> message.fail(404, "This is no the page you are looking for"));
              } else {
                message.fail(500, asyncResultHandler.cause().getMessage());
              }
            })).orElseDo(() -> message.fail(400, "No Path Provided, bruv."));
  }
}
