package io.acari.handler.data;

import com.google.inject.Inject;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.jdbc.JDBCClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static io.acari.core.Queries.SqlQueries.GET_PAGE;

public class PageHandler extends BasePageHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(PageHandler.class);
  private static final String EMPTY_PAGE_MARKDOWN =
    "# A new page\n" +
      "\n" +
      "Feel-free to write in Markdown!\n";


  @Inject
  public PageHandler(JDBCClient jdbcClient) {
    super(jdbcClient, (resultSet) -> resultSet.getResults()
        .stream()
        .findFirst()
        .map(jsonArray -> new JsonObject()
          .put("id", jsonArray.getInteger(0))
          .put("content", jsonArray.getString(1)))
        .orElse(new JsonObject()
          .put("id", -1)
          .put("content", EMPTY_PAGE_MARKDOWN)),
      GET_PAGE);
  }

}
