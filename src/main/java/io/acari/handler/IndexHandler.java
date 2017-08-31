package io.acari.handler;

import com.google.inject.Inject;
import io.acari.core.DatabaseVerticle;
import io.acari.core.Queries;
import io.acari.core.TemplateRenderer;
import io.vertx.core.Handler;
import io.vertx.ext.sql.SQLConnection;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

public class IndexHandler implements Handler<RoutingContext> {
  private static final Logger LOGGER = LoggerFactory.getLogger(IndexHandler.class);

  private final DatabaseVerticle database;
  private final TemplateRenderer templateRenderer;
  private final ErrorHandler errorHandler;

  @Inject
  public IndexHandler(DatabaseVerticle database, TemplateRenderer templateRenderer, ErrorHandler errorHandler) {
    this.database = database;
    this.templateRenderer = templateRenderer;
    this.errorHandler = errorHandler;
  }

  public void handle(RoutingContext routingContext) {

    database.getConnection(ar -> {
      if (ar.succeeded()) {
        SQLConnection sqlConnection = ar.result();
        sqlConnection.query(Queries.SQL_ALL_PAGES, resultSetAsyncResult -> {
          sqlConnection.close();
          if (resultSetAsyncResult.succeeded()) {
            List<String> pages = resultSetAsyncResult.result()
              .getResults()
              .stream()
              .map(json -> json.getString(0))
              .sorted()
              .collect(Collectors.toList());

            routingContext.put("title", "Wiki Home");
            routingContext.put("pages", pages);
            String templateFileName = "/index.ftl";
            templateRenderer.render(routingContext, templateFileName);
          } else {
            errorHandler.handle(routingContext, resultSetAsyncResult);
          }
        });
      } else {
        errorHandler.handle(routingContext, ar);
      }
    });
  }
}
