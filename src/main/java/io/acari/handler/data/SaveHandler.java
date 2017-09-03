package io.acari.handler.data;

import io.acari.core.Queries;
import io.acari.handler.data.ErrorCodes;
import io.acari.util.ChainableOptional;
import io.acari.util.NewPage;
import io.acari.util.UpdatePage;
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
      .ifPresent(id -> ChainableOptional.ofNullable(request.getString("title"))
        .ifPresent(pageName -> ChainableOptional.ofNullable(request.getString("markdown"))
          .ifPresent(markDown -> ChainableOptional.ofNullable(request.getBoolean("newPage"))
            .map(Boolean::valueOf)
            .map(Boolean.TRUE::equals)
            .ifPresent(newPage ->
              jdbcClient.getConnection(aConn -> {
                if (aConn.succeeded()) {
                  SQLConnection connection = aConn.result();
                  JsonArray params = getParams(newPage, id, pageName, markDown);
                  connection.updateWithParams(getSql(newPage), params,
                    aRes -> {
                      if (aRes.succeeded()) {
                        message.reply(new JsonObject().put("status", "gewd"));
                        ;
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
            .orElseDo(() -> fourHundred(message, "No NewPage Provided, Bruv.")))
          .orElseDo(() -> fourHundred(message, "No MarkDown Provided, Bruv.")))
        .orElseDo(() -> fourHundred(message, "No Title Provided, Bruv."))
      ).orElseDo(() -> fourHundred(message, "No Id Provided, Bruv."));
  }

  private JsonArray getParams(Boolean newPage, String id, String pageName, String markDown) {
    return newPage ? NewPage.create(pageName, markDown) : UpdatePage.update(id, markDown);
  }

  private String getSql(Boolean newPage) {
    return newPage ? Queries.SqlQueries.CREATE_PAGE.getValue() :
      Queries.SqlQueries.SAVE_PAGE.getValue();
  }

  private void fourHundred(Message routingContext, String errorMessage) {
    routingContext.fail(400, errorMessage);
  }
}
