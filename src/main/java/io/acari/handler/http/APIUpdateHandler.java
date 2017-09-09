package io.acari.handler.http;

import com.google.inject.Inject;
import io.acari.handler.Config;
import io.acari.handler.Configurable;
import io.acari.util.ChainableOptional;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.DeliveryOptions;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class APIUpdateHandler implements Handler<RoutingContext>, Configurable<APIUpdateHandler> {
  private static final Logger LOGGER = LoggerFactory.getLogger(APIUpdateHandler.class);
  private final Vertx vertx;
  private SimpleResponseHandler simpleResponseHandler;

  @Inject
  public APIUpdateHandler(Vertx vertx) {
    this.vertx = vertx;
  }

  public void handle(RoutingContext routingContext) {
    JsonObject bodyAsJson = routingContext.getBodyAsJson();
    ChainableOptional.ofNullable(bodyAsJson.getString("id"))
      .ifPresent(id -> ChainableOptional.ofNullable(bodyAsJson.getString("markdown"))
        .ifPresent(markdown -> {
          DeliveryOptions deliveryOptions = Config.createDeliveryOptions("save-page");
          JsonObject params = new JsonObject()
            .put("id", id)
            .put("content", markdown);
          simpleResponseHandler.handle(routingContext, params, deliveryOptions);
        }).orElseDo(() -> fourHundred(routingContext, "markdown")))
      .orElseDo(() -> fourHundred(routingContext, "id"));
  }

  private void fourHundred(RoutingContext routingContext, String name) {
    routingContext.response()
      .setStatusCode(400)
      .end("No " + name + " Provided, bruv.");
  }

  @Override
  public APIUpdateHandler applyConfiguration(Config config) {
    this.simpleResponseHandler = new SimpleResponseHandler(config, vertx);
    return this;
  }
}
