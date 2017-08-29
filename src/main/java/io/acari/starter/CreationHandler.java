package io.acari.starter;

import io.vertx.core.Handler;
import io.vertx.ext.web.RoutingContext;

import java.util.Objects;

public class CreationHandler implements Handler<RoutingContext> {
  @Override
  public void handle(RoutingContext routingContext) {
    ChainableOptional.ofNullable(routingContext.request().getParam("name"))
      .filter(Objects::nonNull)
      .filter(name -> !name.isEmpty())
      .ifPresent(name -> routingContext.response()
        .setStatusCode(303)
        .putHeader("Location", "/wiki/" + name)
        .end())
      .orElseDo(() -> routingContext.response()
        .setStatusCode(400)
        .end("No Name Provided, bruv."));
  }
}
