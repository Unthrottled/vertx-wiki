package io.acari.handler.http;

import com.google.inject.Inject;
import io.acari.handler.Config;
import io.acari.handler.Configurable;
import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class APICreationHandler implements Handler<RoutingContext>, Configurable<APICreationHandler> {
  private static final Logger LOGGER = LoggerFactory.getLogger(APICreationHandler.class);
  private final Vertx vertx;
  private Config config;

  @Inject
  public APICreationHandler(Vertx vertx) {
    this.vertx = vertx;
  }

  public void handle(RoutingContext routingContext) {
    JsonObject bodyAsJson = routingContext.getBodyAsJson();
    ChainableOptional.ofNullable(bodyAsJson.getString("name"))
      .ifPresent(pago -> ChainableOptional.ofNullable(bodyAsJson.getString("markdown"))
        .ifPresent(markdown -> vertx.eventBus().<JsonObject>send(config.getDbQueueName(),
          new JsonObject()
            .put("name", pago)
            .put("content", markdown),
          Config.createDeliveryOptions("create-page"),
          connectionResult -> {
            routingContext.response()
              .putHeader("Content-Type", "application/json")
              .end(getPayLoad(connectionResult, routingContext).encode());
          })).orElseDo(() -> fourHundred(routingContext, "markdown")))
      .orElseDo(() -> fourHundred(routingContext, "name"));
  }

  private void fourHundred(RoutingContext routingContext, String name) {
    routingContext.response()
      .setStatusCode(400)
      .end("No " + name + " Provided, bruv.");
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

  @Override
  public APICreationHandler applyConfiguration(Config config) {
    this.config = config;
    return this;
  }
}
