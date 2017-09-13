package io.acari.handler.http.handler;

import io.acari.handler.Config;
import io.vertx.core.AsyncResult;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.DeliveryOptions;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;

public class SimpleResponseHandler {

  private final Config config;
  private final Vertx vertx;

  public SimpleResponseHandler(Config config, Vertx vertx) {
    this.config = config;
    this.vertx = vertx;
  }

  public void handle(RoutingContext routingContext, JsonObject params, DeliveryOptions deliveryOptions) {
    vertx.eventBus().<JsonObject>send(config.getDbQueueName(),
      params,
      deliveryOptions,
      connectionResult -> {
        routingContext.response()
          .putHeader("Content-Type", "application/json")
          .end(getPayLoad(connectionResult, routingContext).encode());
      });
  }

  private JsonObject getPayLoad(AsyncResult<Message<JsonObject>> connectionResult, RoutingContext routingContext) {
    if (connectionResult.succeeded()) {
      routingContext.response().setStatusCode(201);
      return new JsonObject().put("success", true);
    } else {
      routingContext.response().setStatusCode(500);
      return new JsonObject().put("success", false);
    }
  }
}
