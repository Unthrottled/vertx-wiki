package io.acari.handler.data;

import com.google.inject.Inject;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.jdbc.JDBCClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static io.acari.core.Queries.SqlQueries.PAGE_EXISTS;

public class PageExistsHandler extends BasePageHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(PageExistsHandler.class);

  @Inject
  public PageExistsHandler(JDBCClient jdbcClient) {
    super(jdbcClient, (resultSet) -> resultSet.getResults()
        .stream()
        .findFirst()
        .map(jsonArray -> new JsonObject()
          .put("exists", jsonArray.getInteger(0) > 0))
        .orElse(new JsonObject()
          .put("exists", false)),
      PAGE_EXISTS);
  }
}
