package io.acari.handler.data;

import io.acari.core.Queries;
import io.acari.util.ChainableOptional;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.jdbc.JDBCClient;
import io.vertx.ext.sql.ResultSet;
import io.vertx.ext.sql.SQLConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.function.Function;

public class BasePageHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(BasePageHandler.class);

  private final JDBCClient jdbcClient;
  private Queries.SqlQueries SQL_QUERY;
  private Function<ResultSet, JsonObject> queryFunction;


  public BasePageHandler(JDBCClient jdbcClient, Function<ResultSet, JsonObject> queryFunction, Queries.SqlQueries sqlQueries) {
    this.jdbcClient = jdbcClient;
    this.queryFunction = queryFunction;
    this.SQL_QUERY = sqlQueries;
  }

  @Override
  public void handle(Message<JsonObject> message) {
    ChainableOptional.ofNullable(message.body().getString("page"))
      .ifPresent(pago -> jdbcClient.getConnection(connectionResult -> {
        if (connectionResult.succeeded()) {
          SQLConnection connection = connectionResult.result();
          connection.queryWithParams(
            SQL_QUERY.getValue(),
            new JsonArray().add(pago),
            queryResults -> {
              if (queryResults.succeeded()) {
                message.reply(queryFunction.apply(queryResults.result()));
              } else {
                message.fail(500, queryResults.cause().getMessage());
              }
            });
        } else {
          message.fail(500, connectionResult.cause().getMessage());
        }
      })).orElseDo(() -> message.fail(400, "No Path Provided, bruv."));

  }
}
