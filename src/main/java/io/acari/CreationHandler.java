package io.acari;

import io.vertx.core.Handler;
import io.vertx.ext.web.RoutingContext;

import java.util.Objects;

public class CreationHandler implements Handler<RoutingContext> {
  @Override
  public void handle(RoutingContext routingContext) {
    ChainableOptional.ofNullable(routingContext.request().getParam("name"))
      .filter(Objects::nonNull)
      .filter(name -> !name.isEmpty())
      .ifPresent(name -> PageReRouter.reRoute(routingContext, name))
      .orElseDo(() -> routingContext.response()
        .setStatusCode(400)
        .end("No Name Provided, bruv."));
  }
}
