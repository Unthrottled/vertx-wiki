package io.acari.core;

import com.google.inject.Singleton;
import io.acari.handler.data.*;
import io.acari.util.ChainableOptional;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.AsyncResult;
import io.vertx.core.Future;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.mongo.IndexOptions;
import io.vertx.ext.mongo.MongoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static io.acari.util.MongoConfig.getConfig;

@Singleton
public class DatabaseVerticle extends AbstractVerticle {
  private static final Logger LOGGER = LoggerFactory.getLogger(DatabaseVerticle.class);
  private static final String CONFIG_WIKIDB_QUEUE = "wikidb.queue";

  private MongoClient mongoClient;

  @Override
  public void start(Future<Void> future) {
    mongoClient = MongoClient.createShared(vertx, getConfig());
    vertx.eventBus()
      .consumer(config().getString(CONFIG_WIKIDB_QUEUE, CONFIG_WIKIDB_QUEUE),
        getHandler());

    mongoClient.getCollections(listAsyncResult ->
      ChainableOptional.of(listAsyncResult)
        .filter(AsyncResult::succeeded)
        .orElseDo(future::complete)
        .ifPresent(lasr -> {
          String user = "user";
          createTable(future,
            user,
            lasr.result().stream()
              .noneMatch(user::equals), new JsonObject()
              .put("username", 1));
          String pages = "pages";
          createLastTable(future,
            pages,
            lasr.result().stream().noneMatch(pages::equals),
            new JsonObject()
              .put("name", 1));
        })
        .orElseDo(() -> {
          LOGGER.warn("Ohhhh shiiiiiiittttttt", listAsyncResult.cause());
          future.fail(listAsyncResult.cause());
        }));
  }

  private void createTable(Future<Void> future, String user, boolean noUser, JsonObject username) {
    ChainableOptional.of(noUser)
      .filter(b -> b)
      .ifPresent(userCollectionNotExist -> mongoClient.createCollection(user, voidAsyncResult ->
        ChainableOptional.of(voidAsyncResult)
          .filter(AsyncResult::succeeded)
          .ifPresent(vasr -> mongoClient.createIndexWithOptions(user, username,
            new IndexOptions(new JsonObject().put("unique", true)),
            voidAsyncResult1 -> ChainableOptional.of(voidAsyncResult1)
              .filter(AsyncResult::succeeded)
              .ifPresent(res -> {
                LOGGER.info("created index on user collection");
              })
              .orElseDo(() -> {
                LOGGER.warn("Problem creating " + user + " index", voidAsyncResult1.cause());
                future.fail(voidAsyncResult1.cause());
              })))
          .orElseDo(() -> {
            LOGGER.warn("Ohhhh shiiiiiiittttttt", voidAsyncResult.cause());
            future.fail(voidAsyncResult.cause());
          })));
  }

  private void createLastTable(Future<Void> future, String user, boolean noUser, JsonObject username) {
    ChainableOptional.of(noUser)
      .filter(b -> b)
      .orElseDo(future::complete)
      .ifPresent(userCollectionNotExist -> mongoClient.createCollection(user, voidAsyncResult ->
        ChainableOptional.of(voidAsyncResult)
          .filter(AsyncResult::succeeded)
          .ifPresent(vasr -> mongoClient.createIndexWithOptions(user, username,
            new IndexOptions(new JsonObject().put("unique", true)),
            voidAsyncResult1 -> ChainableOptional.of(voidAsyncResult1)
              .filter(AsyncResult::succeeded)
              .ifPresent(res -> {
                LOGGER.info("created index on user collection");
                future.complete();
              })
              .orElseDo(() -> {
                LOGGER.warn("Problem creating " + user + " index", voidAsyncResult1.cause());
                future.fail(voidAsyncResult1.cause());
              })))
          .orElseDo(() -> {
            LOGGER.warn("Ohhhh shiiiiiiittttttt", voidAsyncResult.cause());
            future.fail(voidAsyncResult.cause());
          })));
  }

  private DataMessageConsumer getHandler() {
    return new DataMessageConsumer(
      new PageHandler(mongoClient),
      new DeletionHandler(mongoClient),
      new SaveHandler(mongoClient),
      new AllPageHandler(mongoClient),
      new CreationHandler(mongoClient),
      new AllPageDataHandler(mongoClient),
      new PageExistsHandler(mongoClient),
      new UserExistsHandler(mongoClient));
  }
}
