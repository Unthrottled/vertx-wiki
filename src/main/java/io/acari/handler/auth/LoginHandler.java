package io.acari.handler.auth;

import com.google.inject.Inject;
import io.acari.core.TemplateRenderer;
import io.vertx.core.Handler;
import io.vertx.ext.web.RoutingContext;

public class LoginHandler implements Handler<RoutingContext> {
  private final TemplateRenderer templateRenderer;

  @Inject
  public LoginHandler(TemplateRenderer templateRenderer) {
    this.templateRenderer = templateRenderer;
  }

  @Override
  public void handle(RoutingContext routingContext) {
    routingContext.put("title", "Login");
    templateRenderer.render(routingContext, "templates/login.ftl");
  }
}
