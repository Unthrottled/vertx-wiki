package io.acari.handler.data;

import com.google.inject.Inject;
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

public class PageHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(PageHandler.class);
  private static final String EMPTY_PAGE_MARKDOWN =
    "# A new page\n" +
      "\n" +
      "Feel-free to write in Markdown!\n";

  private final JDBCClient jdbcClient;


  @Inject
  public PageHandler(JDBCClient jdbcClient) {
    this.jdbcClient = jdbcClient;
  }

  @Override
  public void handle(Message<JsonObject> message) {
    ChainableOptional.ofNullable(message.body().getString("page"))
      .ifPresent(pago -> jdbcClient.getConnection(connectionResult -> {
        if (connectionResult.succeeded()) {
          SQLConnection connection = connectionResult.result();
          connection.queryWithParams(
            Queries.SqlQueries.GET_PAGE.getValue(),
            new JsonArray().add(pago),
            queryResults -> {
              if (queryResults.succeeded()) {
                ResultSet resultSet = queryResults.result();
                message.reply(resultSet.getResults()
                  .stream()
                  .findFirst()
                  .map(jsonArray -> new JsonObject()
                    .put("id", jsonArray.getInteger(0))
                    .put("content", jsonArray.getString(1)))
                  .orElse(new JsonObject()
                    .put("id", -1)
                    .put("content", EMPTY_PAGE_MARKDOWN)));
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
