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

public class APIBaseArchiveHandler implements Handler<RoutingContext>, Configurable<Config, APIBaseArchiveHandler> {
  private static final Logger LOGGER = LoggerFactory.getLogger(APIBaseArchiveHandler.class);
  private final Vertx vertx;
  private SimpleResponseHandler simpleResponseHandler;
  private final String permission;
  private final String deliveryOption;
  private final String identifier;

  @Inject
  public APIBaseArchiveHandler(Vertx vertx, String permission, String deliveryOption, String identifier) {
    this.vertx = vertx;
    this.permission = permission;
    this.deliveryOption = deliveryOption;
    this.identifier = identifier;
  }

  public void handle(RoutingContext routingContext) {
    ChainableOptional.ofNullable(routingContext.user().principal().getBoolean(permission, false))
      .filter(b -> b)
      .ifPresent(canDelete -> ChainableOptional.ofNullable(routingContext.pathParam("page"))
        .ifPresent(name -> {
          DeliveryOptions deliveryOptions = Config.createDeliveryOptions(deliveryOption);
          JsonObject params = new JsonObject()
            .put(identifier, name);
          simpleResponseHandler.handle(routingContext, params, deliveryOptions);
        }).orElseDo(() -> fourHundred(routingContext, identifier)))
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
  public APIBaseArchiveHandler applyConfiguration(Config config) {
    this.simpleResponseHandler = new SimpleResponseHandler(config, vertx);
    return this;
  }
}
