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

public class TemplateRenderer {
  private static final Logger LOGGER = LoggerFactory.getLogger(TemplateRenderer.class);

  private final TemplateEngine templateEngine;

  @Inject
  public TemplateRenderer(TemplateEngine templateEngine) {
    this.templateEngine = templateEngine;
  }

  public void render(RoutingContext routingContext, String templateFileName) {
    Handler<AsyncResult<Buffer>> asyncResultHandler = a -> {
      if (a.succeeded()) {
        routingContext.response().putHeader("Content-Type", MediaType.XHTML_UTF_8.type());
        routingContext.response().end(a.result());
      } else {
        broken(routingContext, a);
      }
    };
    templateEngine.render(routingContext, "templates", templateFileName, asyncResultHandler);
  }

  public <T> void broken(RoutingContext routingContext, AsyncResult<T> asyncResult) {
    LOGGER.warn("Things Borked ->", asyncResult.cause());
    routingContext.response()
      .setStatusCode(500)
      .end("¯\\_(ツ)_/¯\n");
  }

}
