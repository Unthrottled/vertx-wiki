package io.acari.starter;

import com.google.common.net.MediaType;
import com.google.inject.Inject;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.buffer.Buffer;
import io.vertx.ext.sql.SQLConnection;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.templ.FreeMarkerTemplateEngine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

public class IndexHandler implements Handler<RoutingContext> {
  private static final Logger LOGGER = LoggerFactory.getLogger(IndexHandler.class);

  private final Database database;
  private final FreeMarkerTemplateEngine templateEngine = FreeMarkerTemplateEngine.create();

  @Inject
  public IndexHandler(Database database) {
    this.database = database;
  }

  public void handle(RoutingContext routingContext) {
    final Handler<AsyncResult<Buffer>> templateResultHandler = bufferAsyncResult -> {
      if (bufferAsyncResult.succeeded()) {
        routingContext.response().putHeader("Content-Type", MediaType.HTML_UTF_8.type());
        routingContext.response().end(bufferAsyncResult.result());
      } else {
        broken(routingContext, bufferAsyncResult);
      }
    };

    database.executeQuery(ar -> {
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
            renderTemplate(routingContext, templateResultHandler, templateFileName);
          } else {
            brokenTemplate(routingContext, resultSetAsyncResult, templateResultHandler);
          }
        });
      } else {
        brokenTemplate(routingContext, ar, templateResultHandler);
      }
    });
  }

  private void renderTemplate(RoutingContext routingContext, Handler<AsyncResult<Buffer>> asyncResultHandler, String templateFileName) {
    templateEngine.render(routingContext, "templates", templateFileName, asyncResultHandler);
  }

  private <T> void brokenTemplate(RoutingContext routingContext, AsyncResult<T> asyncResult, Handler<AsyncResult<Buffer>> asyncResultHandler) {
    LOGGER.warn("Things Borked ->", asyncResult.cause());
    routingContext.response().setStatusCode(500);
    renderTemplate(routingContext, asyncResultHandler, "/error.ftl");
  }

  private <T> void broken(RoutingContext routingContext, AsyncResult<T> asyncResult) {
    LOGGER.warn("Things Borked ->", asyncResult.cause());
    routingContext.response()
      .setStatusCode(500)
      .end("¯\\_(ツ)_/¯\n");
  }
}
