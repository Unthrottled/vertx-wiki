package io.acari.core;

import com.google.inject.Singleton;
import io.acari.auth.AuthConfigs;
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

@Singleton
public class DatabaseVerticle extends AbstractVerticle {
  private static final Logger LOGGER = LoggerFactory.getLogger(DatabaseVerticle.class);
  private static final String CONFIG_WIKIDB_QUEUE = "wikidb.queue";

  private MongoClient mongoClient;

  @Override
  public void start(Future<Void> future) {
    mongoClient = MongoClient.createShared(vertx, getConfig());
    mongoClient.getCollections(listAsyncResult ->
      ChainableOptional.of(listAsyncResult)
        .filter(AsyncResult::succeeded)
        .orElseDo(future::complete)
        .ifPresent(lasr ->
          ChainableOptional.of(lasr.result().stream()
            .noneMatch("user"::equals))
            .filter(noUser -> noUser)
            .ifPresent(userCollectionNotExist -> mongoClient.createCollection("user", voidAsyncResult ->
              ChainableOptional.of(voidAsyncResult)
                .filter(AsyncResult::succeeded)
                .ifPresent(vasr -> mongoClient.createIndexWithOptions("user", new JsonObject()
                    .put("username", 1),
                  //todo: setup page.
                  new IndexOptions(new JsonObject().put("unique", true)),
                  voidAsyncResult1 -> ChainableOptional.of(voidAsyncResult1)
                    .filter(AsyncResult::succeeded)
                    .ifPresent(res -> {
                      LOGGER.info("created index on user collection");
                      future.complete();
                    })
                    .orElseDo(() -> {
                      LOGGER.warn("Problem creating user index", voidAsyncResult1.cause());
                      future.fail(voidAsyncResult1.cause());
                    })))
                .orElseDo(() -> {
                  LOGGER.warn("Ohhhh shiiiiiiittttttt", voidAsyncResult.cause());
                  future.fail(voidAsyncResult.cause());
                }))))
        .orElseDo(() -> {
          LOGGER.warn("Ohhhh shiiiiiiittttttt", listAsyncResult.cause());
          future.fail(listAsyncResult.cause());
        }));
  }

  private JsonObject getConfig() {
    return new JsonObject()
      .put("host", AuthConfigs.Configs.HOST.getValue())
      .put("port", Integer.parseInt(AuthConfigs.Configs.PORT.getValue()))
      ;
  }

  private DataMessageConsumer getHandler() {
    return new DataMessageConsumer(
      new PageHandler(mongoClient),
      new DeletionHandler(mongoClient),
      new SaveHandler(mongoClient),
      new AllPageHandler(mongoClient),
      new CreationHandler(mongoClient),
      new AllPageDataHandler(mongoClient),
      new PageExistsHandler(mongoClient));
  }


  //todo: feex me
  private JsonObject getConfiguration() {
    return new JsonObject()
      .put("url", config().getString(Queries.CONFIG_WIKIDB_JDBC_URL, "jdbc:hsqldb:file:db/wiki"))
      .put("driver_class", config().getString(Queries.CONFIG_WIKIDB_JDBC_DRIVER_CLASS, "org.hsqldb.jdbcDriver"))
      .put("max_pool_size", config().getInteger(Queries.CONFIG_WIKIDB_JDBC_MAX_POOL_SIZE, 30));
  }
}
