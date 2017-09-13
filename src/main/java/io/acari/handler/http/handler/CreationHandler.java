package io.acari.handler.http.handler;

import io.acari.util.ChainableOptional;
import io.acari.util.PageReRouter;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.ext.web.RoutingContext;

import java.util.Objects;

public class CreationHandler implements Handler<RoutingContext> {
  @Override
  public void handle(RoutingContext routingContext) {
    routingContext.user().isAuthorised("create", booleanAsyncResult -> {
      ChainableOptional.of(booleanAsyncResult)
        .filter(AsyncResult::succeeded)
        .filter(AsyncResult::result)
        .ifPresent(canCreate ->
          ChainableOptional.ofNullable(routingContext.request().getParam("name"))
            .filter(Objects::nonNull)
            .filter(name -> !name.isEmpty())
            .ifPresent(name -> PageReRouter.reRoute(routingContext, name))
            .orElseDo(() -> routingContext.response()
              .setStatusCode(400)
              .end("No Name Provided, bruv."))).orElseDo(() -> routingContext.response()
        .setStatusCode(401)
        .end());
    });
  }
}
