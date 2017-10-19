package io.acari.handler.data;

import io.acari.util.ChainableOptional;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.mongo.FindOptions;
import io.vertx.ext.mongo.MongoClient;
import io.vertx.rx.java.ObservableFuture;
import io.vertx.rx.java.RxHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import rx.Observable;

import java.util.List;
import java.util.function.Function;

public class BaseAllPageHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(BaseAllPageHandler.class);
  private static final int PAGES_PER_PAGE = 100;
  private final MongoClient mongoClient;
  private final String collection;
  private final Function<JsonObject, Object> resultBuilder;

  public BaseAllPageHandler(MongoClient mongoClient,
                            String collection,
                            Function<JsonObject, Object> resultBuilder) {
    this.mongoClient = mongoClient;
    this.collection = collection;
    this.resultBuilder = resultBuilder;
  }


  @Override
  public void handle(Message<JsonObject> message) {
    ChainableOptional.ofNullable(message.body().getInteger("pageNumber"))
        .ifPresent(pageNumber -> {
          Observable<JsonObject> countResult = getLongObservableFuture();
          Observable<JsonObject> listResult = getListObservableFuture(pageNumber);
          listResult.zipWith(countResult,
              (listRes, countRes) -> new JsonObject()
                  .put("pages", listRes.getJsonArray("result"))
                  .put("metaData", new JsonObject()
                      .put("itemsPerPage", PAGES_PER_PAGE)
                      .put("currentPageNumber", pageNumber)
                      .put("totalItems", countRes.getLong("result"))))
              .subscribe(
                  message::reply,
                  throwable -> {
                    LOGGER.warn("Aww snap", throwable.getMessage());
                    logFail(message, throwable.getMessage());
                  });
        })
        .orElseDo(() -> message.fail(ErrorCodes.BAD_ACTION.ordinal(), "No page number"));
  }

  private Observable<JsonObject> getListObservableFuture(Integer pageNumber) {
    ObservableFuture<List<JsonObject>> listObservableFuture = RxHelper.observableFuture();
    mongoClient.findWithOptions(collection,
        new JsonObject(),
        new FindOptions()
            .setLimit(PAGES_PER_PAGE)
            .setSkip(getSkipCount(pageNumber)), listObservableFuture.toHandler());
    return listObservableFuture.map(ar ->
        ar.stream()
            .map(resultBuilder)
            .collect(JsonArray::new, JsonArray::add, JsonArray::add))
        .map(list -> new JsonObject().put("result", list));
  }

  private Observable<JsonObject> getLongObservableFuture() {
    ObservableFuture<Long> longObservableFuture = RxHelper.observableFuture();
    mongoClient.count(collection,
        new JsonObject(), longObservableFuture.toHandler());
    return longObservableFuture.map(count -> new JsonObject().put("result", count));
  }

  private void logFail(Message<JsonObject> message, String message2) {
    LOGGER.warn("Ohh shit", message2);
    message.fail(ErrorCodes.DB_ERROR.ordinal(), message2);
  }

  private Integer getSkipCount(Integer pageNumber) {
    return --pageNumber * PAGES_PER_PAGE;
  }
}
