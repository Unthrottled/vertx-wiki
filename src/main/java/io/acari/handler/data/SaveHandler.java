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

public class SaveHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(SaveHandler.class);

  private final JDBCClient jdbcClient;

  public SaveHandler(JDBCClient jdbcClient) {
    this.jdbcClient = jdbcClient;
  }

  @Override
  public void handle(Message<JsonObject> message) {
    JsonObject request = message.body();
    ChainableOptional.ofNullable(request.getString("id"))
      .ifPresent(id -> ChainableOptional.ofNullable(request.getString("content"))
        .ifPresent(content ->
          jdbcClient.getConnection(aConn -> {
            if (aConn.succeeded()) {
              SQLConnection connection = aConn.result();
              connection.updateWithParams(
                Queries.SqlQueries.SAVE_PAGE.getValue(),
                new JsonArray().add(content).add(id),
                aRes -> {
                  if (aRes.succeeded()) {
                    message.reply(new JsonObject().put("status", "gewd"));
                  } else {
                    message.fail(ErrorCodes.DB_ERROR.ordinal(), aRes.cause().getMessage());
                  }
                })
                .commit(voidAsyncResult -> LOGGER.info("Save page commit!"))
                .close(v -> connection.close());
            } else {
              message.fail(ErrorCodes.DB_ERROR.ordinal(), aConn.cause().getMessage());
            }
          }))
        .orElseDo(() -> fourHundred(message, "No Title Provided, Bruv."))
      ).orElseDo(() -> fourHundred(message, "No Id Provided, Bruv."));
  }

  private void fourHundred(Message routingContext, String errorMessage) {
    routingContext.fail(400, errorMessage);
  }
}
