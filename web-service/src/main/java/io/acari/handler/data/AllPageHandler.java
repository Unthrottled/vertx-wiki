package io.acari.handler.data;

import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.mongo.FindOptions;
import io.vertx.ext.mongo.MongoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AllPageHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(AllPageHandler.class);
  private static final int PAGES_PER_PAGE = 100;
  private final MongoClient mongoClient;

  public AllPageHandler(MongoClient mongoClient) {
    this.mongoClient = mongoClient;
  }


  @Override
  public void handle(Message<JsonObject> message) {
    ChainableOptional.ofNullable(message.body().getInteger("pageNumber"))
      .ifPresent(pageNumber -> mongoClient.findWithOptions("pages",
        new JsonObject(),
        new FindOptions()
          .setLimit(PAGES_PER_PAGE)
          .setSkip(getSkipCount(pageNumber)),
        ar -> ChainableOptional.of(ar)
          .filter(AsyncResult::succeeded)
          .ifPresent(listAsyncResult -> {
            JsonArray pages = listAsyncResult.result()
              .stream()
              .map(json -> json.getString("name"))
              .collect(JsonArray::new, JsonArray::add, JsonArray::add);
            //TODO: It would be nice if this could be done concurrently :)
            mongoClient.count("pages",
              new JsonObject(),
              arc -> ChainableOptional.of(arc)
                .filter(AsyncResult::succeeded)
                .map(AsyncResult::result)
                .ifPresent(county ->
                  message.reply(new JsonObject()
                    .put("pages", pages)
                    .put("metaData", new JsonObject()
                      .put("itemsPerPage", PAGES_PER_PAGE)
                      .put("currentPageNumber", pageNumber)
                      .put("totalPages", county))))
                .orElseDo(() -> logFail(message, arc.cause().getMessage())
                ));
          })
          .orElseDo(() -> logFail(message, ar.cause().getMessage()))))
      .orElseDo(() -> message.fail(ErrorCodes.BAD_ACTION.ordinal(), "No page number"));
  }

  private void logFail(Message<JsonObject> message, String message2) {
    LOGGER.warn("Ohh shit", message2);
    message.fail(ErrorCodes.DB_ERROR.ordinal(), message2);
  }

  private Integer getSkipCount(Integer pageNumber) {
    return --pageNumber * PAGES_PER_PAGE;
  }
}
