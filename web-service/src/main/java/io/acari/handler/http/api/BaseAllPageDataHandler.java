package io.acari.handler.http.api;

import io.acari.handler.Config;
import io.acari.handler.Configurable;
import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.Message;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BaseAllPageDataHandler implements Handler<RoutingContext>, Configurable<Config, BaseAllPageDataHandler> {
  private static final Logger LOGGER = LoggerFactory.getLogger(BaseAllPageDataHandler.class);

  private final Vertx vertx;
  private final String action;
  private Config config;

  public BaseAllPageDataHandler(Vertx vertx, String action) {
    this.vertx = vertx;
    this.action = action;
  }

  public void handle(RoutingContext routingContext) {
    ChainableOptional.of(routingContext.user().principal().getBoolean("canView", false))
      .filter(b -> b)
      .ifPresent(canView ->
        ChainableOptional.ofNullable(routingContext.getBodyAsJson().getInteger("pageNumber"))
          .ifPresent(pageNumber -> vertx.eventBus().<JsonObject>send(config.getDbQueueName(),
            new JsonObject()
              .put("pageNumber", pageNumber),
            Config.createDeliveryOptions(action), ar -> {
              JsonObject responseGuy = new JsonObject();
              getRoutingContext(responseGuy, routingContext, ar)
                .putHeader("Cache-Control", "no-store, no-cache")
                .putHeader("Content-Type", "application/json")
                .end(responseGuy.encode());
            }))
          .orElseDo(() -> fourHundred(routingContext, "pageNumber")))
      .orElseDo(() -> routingContext.response()
        .setStatusCode(401)
        .end());
  }

  private HttpServerResponse getRoutingContext(JsonObject responseGuy, RoutingContext routingContext, AsyncResult<Message<JsonObject>> ar) {
    if (ar.succeeded()) {
      responseGuy.put("success", true);
      responseGuy.put("pages", getBody(ar).getJsonArray("pages"));
      responseGuy.put("metaData", getBody(ar).getJsonObject("metaData"));
      return routingContext.response()
        .setStatusCode(200);
    } else {
      responseGuy.put("success", false);
      return routingContext.response()
        .setStatusCode(500);
    }
  }

  private JsonObject getBody(AsyncResult<Message<JsonObject>> ar) {
    return ar.result().body();
  }

  private void fourHundred(RoutingContext routingContext, String name) {
    routingContext.response()
      .setStatusCode(400)
      .end("No " + name + " Provided, bruv.");
  }

  @Override
  public BaseAllPageDataHandler applyConfiguration(Config config) {
    this.config = config;
    return this;
  }
}
