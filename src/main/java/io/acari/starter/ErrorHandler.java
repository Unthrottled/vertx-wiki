package io.acari.starter;

import com.google.common.net.MediaType;
import com.google.inject.Inject;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.buffer.Buffer;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.templ.TemplateEngine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class ErrorHandler implements Handler<RoutingContext> {
  private static final Logger LOGGER = LoggerFactory.getLogger(ErrorHandler.class);
  private final TemplateEngine templateEngine;

  @Inject
  public ErrorHandler(TemplateEngine templateEngine) {
    this.templateEngine = templateEngine;
  }


  @Override
  public void handle(RoutingContext routingContext) {
    brokenTemplate(routingContext, a -> {
      if (a.succeeded()) {
        routingContext.response().putHeader("Content-Type", MediaType.XHTML_UTF_8.type());
        routingContext.response().end(a.result());
      } else {
        broken(routingContext, a);
      }
    });
  }

  public void renderTemplate(RoutingContext routingContext, Handler<AsyncResult<Buffer>> asyncResultHandler, String templateFileName) {
    templateEngine.render(routingContext, "templates", templateFileName, asyncResultHandler);
  }

  public <T> void broken(RoutingContext routingContext, AsyncResult<T> asyncResult) {
    LOGGER.warn("Things Borked ->", asyncResult.cause());
    routingContext.response()
      .setStatusCode(500)
      .end("¯\\_(ツ)_/¯\n");
  }

  public <T> void brokenTemplate(RoutingContext routingContext, AsyncResult<T> asyncResult, Handler<AsyncResult<Buffer>> asyncResultHandler) {
    LOGGER.warn("Things Borked ->", asyncResult.cause());
    brokenTemplate(routingContext, asyncResultHandler);
  }

  public <T> void brokenTemplate(RoutingContext routingContext, Handler<AsyncResult<Buffer>> asyncResultHandler) {
    routingContext.response().setStatusCode(500);
    renderTemplate(routingContext, asyncResultHandler, "/error.ftl");
  }
}
