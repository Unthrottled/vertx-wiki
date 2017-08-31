package io.acari;

import com.google.inject.Inject;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class ErrorHandler implements Handler<RoutingContext> {
  private static final Logger LOGGER = LoggerFactory.getLogger(ErrorHandler.class);
  private final TemplateRenderer templateRenderer;

  @Inject
  public ErrorHandler(TemplateRenderer templateRenderer) {
    this.templateRenderer = templateRenderer;
  }


  @Override
  public void handle(RoutingContext routingContext) {
    brokenTemplate(routingContext);
  }

  public <T> void handle(RoutingContext routingContext, AsyncResult<T> asyncResult) {
    LOGGER.warn("Things Borked ->", asyncResult.cause());
    brokenTemplate(routingContext);
  }

  public <T> void brokenTemplate(RoutingContext routingContext) {
    routingContext.response().setStatusCode(500);
    templateRenderer.render(routingContext, "/error.ftl");
  }
}
