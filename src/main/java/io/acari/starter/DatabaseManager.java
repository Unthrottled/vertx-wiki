package io.acari.starter;

import com.google.inject.Singleton;
import io.vertx.core.AsyncResult;
import io.vertx.core.Future;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.jdbc.JDBCClient;
import io.vertx.ext.sql.SQLClient;
import io.vertx.ext.sql.SQLConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static io.acari.starter.Queries.SQL_CREATE_PAGES_TABLE;

@Singleton
public class DatabaseManager implements Database {
  private static final Logger LOGGER = LoggerFactory.getLogger(DatabaseManager.class);

  private JDBCClient jdbcClient;

  public Future<Void> prepare(Vertx vertx) {
    Future<Void> future = Future.future();
    jdbcClient = JDBCClient.createShared(vertx, getConfiguration());
    jdbcClient.getConnection(sqlConnectionHandler(future));
    return future;
  }

  public SQLClient getConnection(Handler<AsyncResult<SQLConnection>> asyncResultHandler) {
    return jdbcClient.getConnection(asyncResultHandler);
  }

  private Handler<AsyncResult<SQLConnection>> sqlConnectionHandler(Future<Void> future) {
    return asyncResult -> {
      if (asyncResult.succeeded()) {
        SQLConnection connection = asyncResult.result();
        connection.execute(SQL_CREATE_PAGES_TABLE, onCreate -> {
          connection.close();
          if (onCreate.succeeded()) {
            future.complete();
          } else {
            LOGGER.error("Things Broke in the database ->", onCreate.cause());
            future.fail(onCreate.cause());
          }
        });
      } else {
        LOGGER.error("Could not establish database connection :( ->", asyncResult.cause());
        future.fail(asyncResult.cause());
      }
    };
  }

  private JsonObject getConfiguration() {
    return new JsonObject()
      .put("url", "jdbc:hsqldb:file:db/wiki")
      .put("driver_class", "org.hsqldb.jdbcDriver")
      .put("max_pool_size", 30);
  }
}
