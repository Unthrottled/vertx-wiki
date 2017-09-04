package io.acari.handler.data;

import io.acari.core.Queries;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.jdbc.JDBCClient;
import io.vertx.ext.sql.SQLConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AllPageHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(AllPageHandler.class);

  private final JDBCClient jdbcClient;

  public AllPageHandler(JDBCClient jdbcClient) {
    this.jdbcClient = jdbcClient;
  }


  @Override
  public void handle(Message<JsonObject> message) {
    jdbcClient.getConnection(ar -> {
      if (ar.succeeded()) {
        SQLConnection sqlConnection = ar.result();
        sqlConnection.query(Queries.SqlQueries.ALL_PAGES.getValue(),
          resultSetAsyncResult -> {
            sqlConnection.close();
            if (resultSetAsyncResult.succeeded()) {
              JsonArray pages = resultSetAsyncResult.result()
                .getResults()
                .stream()
                .map(json -> json.getString(0))
                .sorted()
                .collect(JsonArray::new, JsonArray::add, JsonArray::add);
              message.reply(new JsonObject()
                .put("pages", pages));
            } else {
              message.fail(ErrorCodes.DB_ERROR.ordinal(), resultSetAsyncResult.cause().getMessage());
            }
          });
      } else {
        message.fail(ErrorCodes.DB_ERROR.ordinal(), ar.cause().getMessage());
      }
    });
  }
}
