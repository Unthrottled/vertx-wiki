package io.acari.handler.http.api;

import io.acari.handler.Config;
import io.acari.handler.Configurable;
import io.acari.util.ChainableOptional;
import io.acari.util.TriFunction;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BaseAPIPageHandler implements Handler<RoutingContext>, Configurable<Config, BaseAPIPageHandler> {
  private static final Logger LOGGER = LoggerFactory.getLogger(BaseAPIPageHandler.class);
  private final Vertx vertx;
  private final String action;
  private Config config;
  private final TriFunction<AsyncResult<Message<JsonObject>>, RoutingContext, String, JsonObject> fundie;


  public BaseAPIPageHandler(Vertx vertx,
                            String action,
                            TriFunction<AsyncResult<Message<JsonObject>>, RoutingContext, String, JsonObject> fundie) {
    this.vertx = vertx;
    this.action = action;
    this.fundie = fundie;
  }

  public void handle(RoutingContext routingContext) {
    ChainableOptional.ofNullable(routingContext.request().getParam("page"))
      .ifPresent(pago -> vertx.eventBus().<JsonObject>send(config.getDbQueueName(),
        new JsonObject().put("page", pago),
        Config.createDeliveryOptions(action),
        connectionResult -> routingContext.response()
          .putHeader("Cache-Control", "no-store, no-cache")
          .putHeader("Content-Type", "application/json")
          .end(getPayLoad(connectionResult, routingContext, pago).encode()))).orElseDo(() -> routingContext.response()
      .setStatusCode(400)
      .end("No Path Provided, bruv."));
  }

  private JsonObject getPayLoad(AsyncResult<Message<JsonObject>> connectionResult, RoutingContext routingContext, String pageName) {
    if (connectionResult.succeeded()) {
      return fundie.apply(connectionResult, routingContext, pageName);
    } else {
      routingContext.response().setStatusCode(500);
      return getFailure();
    }
  }

  private JsonObject getFailure() {
    return new JsonObject()
      .put("success", false);
  }

  @Override
  public BaseAPIPageHandler applyConfiguration(Config config) {
    this.config = config;
    return this;
  }
}
