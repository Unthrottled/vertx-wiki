package io.acari.handler.http.api;

import com.google.inject.Inject;
import io.acari.handler.Config;
import io.acari.handler.Configurable;
import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.Message;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class APIAllPageDataHandler implements Handler<RoutingContext>, Configurable<Config, APIAllPageDataHandler> {
  private static final Logger LOGGER = LoggerFactory.getLogger(APIAllPageDataHandler.class);

  private final Vertx vertx;
  private Config config;

  @Inject
  public APIAllPageDataHandler(Vertx vertx) {
    this.vertx = vertx;
  }

  public void handle(RoutingContext routingContext) {
    ChainableOptional.of(routingContext.user().principal().getBoolean("canView", false))
      .filter(b -> b)
      .ifPresent(canView ->
        ChainableOptional.ofNullable(routingContext.getBodyAsJson().getInteger("pageNumber"))
          .ifPresent(pageNumber -> vertx.eventBus().<JsonObject>send(config.getDbQueueName(),
            new JsonObject()
              .put("pageNumber", pageNumber),
            Config.createDeliveryOptions("all-pages"), ar -> {
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
  public APIAllPageDataHandler applyConfiguration(Config config) {
    this.config = config;
    return this;
  }
}
