package io.acari.handler.data;

import io.acari.util.ChainableOptional;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.mongo.MongoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class PageHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(PageHandler.class);
  private static final String EMPTY_PAGE_MARKDOWN =
    "# A new page\n" +
      "\n" +
      "Feel-free to write in Markdown!\n";
  private final MongoClient mongoClient;


  public PageHandler(MongoClient mongoClient) {
    this.mongoClient = mongoClient;
  }

  @Override
  public void handle(Message<JsonObject> message) {
    ChainableOptional.ofNullable(message.body().getString("page"))
      .ifPresent(pago -> mongoClient.find("pages", new JsonObject()
        .put("name", pago), asyncResultHandler -> {
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
