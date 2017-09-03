package io.acari.handler.data;

import io.acari.core.Queries;
import io.acari.util.ChainableOptional;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.jdbc.JDBCClient;
import io.vertx.ext.sql.SQLConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DeletionHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(DeletionHandler.class);

  private final JDBCClient jdbcClient;

  public DeletionHandler(JDBCClient jdbcClient) {
    this.jdbcClient = jdbcClient;
  }


  @Override
  public void handle(Message<JsonObject> message) {
    ChainableOptional.ofNullable(message.body().getInteger("id"))
      .ifPresent(id -> jdbcClient.getConnection(asc -> {
        if (asc.succeeded()) {
          SQLConnection connection = asc.result();
          connection.updateWithParams(
            Queries.SqlQueries.DELETE_PAGE.getValue(),
            new JsonArray().add(id),
            asr -> {
              connection.close();
              if (asr.succeeded()) {
                message.reply(new JsonObject().put("status", "gewd"));
              } else {
                message.fail(500, asr.cause().getMessage());
              }
            });
        } else {
          message.fail(500, asc.cause().getMessage());
        }
      }))
      .orElseDo(() -> message.fail(400, "No Id entered bruv!"));


  }
}
