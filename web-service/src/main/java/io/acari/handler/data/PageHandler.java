package io.acari.handler.data;

import com.google.inject.Inject;
import io.acari.util.ChainableOptional;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.jdbc.JDBCClient;
import io.vertx.ext.mongo.MongoClient;
import io.vertx.ext.sql.SQLConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

import static io.acari.core.Queries.SqlQueries.GET_PAGE;

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
          message.reply(result
            .stream()
            .findFirst()
            .map(jsonArray -> new JsonObject()
              .put("_id", jsonArray.getString("_id"))
              .put("content", jsonArray.getString("content")))
            .orElse(new JsonObject()
              .put("_id", "lulNup")
              .put("content", EMPTY_PAGE_MARKDOWN)));
        } else {
          message.fail(500, asyncResultHandler.cause().getMessage());
        }
      })).orElseDo(() -> message.fail(400, "No Path Provided, bruv."));
  }
}
