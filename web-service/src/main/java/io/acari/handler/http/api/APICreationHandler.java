package io.acari.handler.http.api;

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

public class APICreationHandler implements Handler<RoutingContext>, Configurable<Config, APICreationHandler> {
  private static final Logger LOGGER = LoggerFactory.getLogger(APICreationHandler.class);
  private final Vertx vertx;
  private SimpleResponseHandler simpleResponseHandler;

  @Inject
  public APICreationHandler(Vertx vertx) {
    this.vertx = vertx;
  }

  public void handle(RoutingContext routingContext) {
    ChainableOptional.ofNullable(routingContext.user().principal().getBoolean("canCreate", false))
      .filter(b -> b)
      .ifPresent(canCreate -> {
        JsonObject bodyAsJson = routingContext.getBodyAsJson();
        ChainableOptional.ofNullable(bodyAsJson.getString("name"))
          .ifPresent(pago -> ChainableOptional.ofNullable(bodyAsJson.getString("markdown"))
            .ifPresent(markdown -> {
              DeliveryOptions deliveryOptions = Config.createDeliveryOptions("create-page");
              JsonObject params = new JsonObject()
                .put("name", pago)
                .put("user", routingContext.user().principal().getString("username"))
                .put("content", markdown);
              simpleResponseHandler.handle(routingContext, params, deliveryOptions);
            }).orElseDo(() -> fourHundred(routingContext, "markdown")))
          .orElseDo(() -> fourHundred(routingContext, "name"));
      })
      .orElseDo(() -> routingContext
        .response()
        .setStatusCode(401)
        .end());
  }

  private void fourHundred(RoutingContext routingContext, String name) {
    routingContext.response()
      .setStatusCode(400)
      .end("No " + name + " Provided, bruv.");
  }

  @Override
  public APICreationHandler applyConfiguration(Config config) {
    this.simpleResponseHandler = new SimpleResponseHandler(config, vertx);
    return this;
  }
}
