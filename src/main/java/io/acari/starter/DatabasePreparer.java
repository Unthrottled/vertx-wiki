package io.acari.starter;

import io.vertx.core.AsyncResult;
import io.vertx.core.Future;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.jdbc.JDBCClient;
import io.vertx.ext.sql.SQLConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DatabasePreparer {
  private static final Logger LOGGER = LoggerFactory.getLogger(DatabasePreparer.class);
  private static final String SQL_CREATE_PAGES_TABLE = "create table if not exists Pages (Id integer identity primary key, Name varchar(255) unique, Content clob)";
  private static final String SQL_GET_PAGE = "select Id, Content from Pages where Name = ?";
  private static final String SQL_CREATE_PAGE = "insert into Pages values (NULL, ?, ?)";
  private static final String SQL_SAVE_PAGE = "update Pages set Content = ? where Id = ?";
  private static final String SQL_ALL_PAGES = "select Name from Pages";
  private static final String SQL_DELETE_PAGE = "delete from Pages where Id = ?";

  private JDBCClient jdbcClient;

  public Future<Void> prepare(Vertx vertx) {
    Future<Void> future = Future.future();
    jdbcClient = JDBCClient.createShared(vertx, getConfiguration());
    jdbcClient.getConnection(sqlConnectionHandler(future));
    return future;
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
