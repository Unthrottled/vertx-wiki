package io.acari.starter;

import com.github.rjeschke.txtmark.Processor;
import com.google.inject.Inject;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonArray;
import io.vertx.ext.sql.SQLConnection;
import io.vertx.ext.sql.SQLRowStream;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;

public class PageHandler implements Handler<RoutingContext> {
  private static final Logger LOGGER = LoggerFactory.getLogger(PageHandler.class);
  private static final String EMPTY_PAGE_MARKDOWN =
    "# A new page\n" +
      "\n" +
      "Feel-free to write in Markdown!\n";

  private final Database database;
  private final ErrorHandler errorHandler;
  private final TemplateRenderer templateRenderer;


  @Inject
  public PageHandler(Database database, ErrorHandler errorHandler, TemplateRenderer templateRenderer) {
    this.database = database;
    this.errorHandler = errorHandler;
    this.templateRenderer = templateRenderer;
  }

  @Override
  public void handle(RoutingContext routingContext) {
    ChainableOptional.ofNullable(routingContext.request().getParam("page")).ifPresent(pago -> database.executeQuery(connectionResult -> {
      if (connectionResult.succeeded()) {
        SQLConnection connection = connectionResult.result();
        connection.queryStreamWithParams(Queries.SQL_GET_PAGE,
          new JsonArray().add(pago),
          queryResults -> {
            if (queryResults.succeeded()) {
              SQLRowStream sqlRowStream = queryResults.result();
              sqlRowStream.handler(tuple -> {
                Integer id = tuple.getInteger(0);
                String content = tuple.getString(1);
                routingContext.put("id", id);
                routingContext.put("rawContent", content);
                routingContext.put("newPage", Boolean.FALSE.toString());
                sqlRowStream.close();
              }).exceptionHandler(throwable -> LOGGER.warn("Things Broken in Page Handler ->"))
                .close(v -> {
                  routingContext.put("title", pago);
                  ChainableOptional.ofNullable(routingContext.get("newPage"))
                    .orElseDo(() -> fillEmptyPage(routingContext));
                  String rawContent = routingContext.<Object>get("rawContent").toString();
                  routingContext.put("content", Processor.process(rawContent));
                  routingContext.put("timestamp", Instant.now().toString());
                  connection.close();
                  templateRenderer.render(routingContext, "/page.ftl");

                });
            } else {
              errorHandler.handle(routingContext, queryResults);
            }
          });
      } else {
        errorHandler.handle(routingContext, connectionResult);
      }
    })).orElseDo(() -> routingContext.response()
      .setStatusCode(400)
      .end("No Path Provided, bruv."));

  }

  private void fillEmptyPage(RoutingContext routingContext) {
    routingContext.put("id", -1);
    routingContext.put("rawContent", EMPTY_PAGE_MARKDOWN);
    routingContext.put("newPage", Boolean.TRUE.toString());
  }
}
