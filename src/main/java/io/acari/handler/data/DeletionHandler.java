package io.acari.handler.data;

import com.google.inject.Inject;
import io.acari.handler.Config;
import io.acari.handler.Configurable;
import io.acari.util.ChainableOptional;
import io.acari.util.PageReRouter;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DeletionHandler implements Handler<RoutingContext>, Configurable<DeletionHandler> {
  private static final Logger LOGGER = LoggerFactory.getLogger(DeletionHandler.class);

  private final Vertx vertx;
  private final ErrorHandler errorHandler;
  private Config config;

  @Inject
  public DeletionHandler(Vertx vertx, ErrorHandler errorHandler) {
    this.vertx = vertx;
    this.errorHandler = errorHandler;
  }

  @Override
  public void handle(RoutingContext routingContext) {
    ChainableOptional.ofNullable(routingContext.request().getParam("id"))
      .ifPresent(id ->
        vertx.eventBus().send(config.getDbQueueName(),
          new JsonArray().add(id),
          Config.createDeliveryOptions("create-page"),
          asr -> {
            if (asr.succeeded()) {
              PageReRouter.reRouteHome(routingContext);
            } else {
              errorHandler.handle(routingContext, asr);
            }
          })
      ).orElseDo(() -> routingContext.response().setStatusCode(400)
      .end("No Id entered bruv!"));

  }

  @Override
  public DeletionHandler applyConfiguration(Config config) {
    this.config = config;
    return this;
  }
}
