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

public class APIArchiveHandler implements Handler<RoutingContext>, Configurable<Config, APIArchiveHandler> {
  private static final Logger LOGGER = LoggerFactory.getLogger(APIArchiveHandler.class);
  private final Vertx vertx;
  private SimpleResponseHandler simpleResponseHandler;

  @Inject
  public APIArchiveHandler(Vertx vertx) {
    this.vertx = vertx;
  }

  public void handle(RoutingContext routingContext) {
    ChainableOptional.ofNullable(routingContext.user().principal().getBoolean("canDelete", false))
      .filter(b -> b)
      .ifPresent(canDelete -> ChainableOptional.ofNullable(routingContext.pathParam("page"))
        .ifPresent(name -> {
          DeliveryOptions deliveryOptions = Config.createDeliveryOptions("archive-page");
          JsonObject params = new JsonObject()
            .put("name", name);
          simpleResponseHandler.handle(routingContext, params, deliveryOptions);
        }).orElseDo(() -> fourHundred(routingContext, "name")))
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
  public APIArchiveHandler applyConfiguration(Config config) {
    this.simpleResponseHandler = new SimpleResponseHandler(config, vertx);
    return this;
  }
}
