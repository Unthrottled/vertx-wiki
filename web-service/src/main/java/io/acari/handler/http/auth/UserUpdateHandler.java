package io.acari.handler.http.auth;

import com.google.inject.Inject;
import io.acari.handler.Config;
import io.acari.handler.Configurable;
import io.acari.handler.http.api.SimpleResponseHandler;
import io.acari.util.ChainableOptional;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.DeliveryOptions;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserUpdateHandler implements Handler<RoutingContext>, Configurable<Config, UserUpdateHandler> {
  private static final Logger LOGGER = LoggerFactory.getLogger(UserUpdateHandler.class);
  private final Vertx vertx;
  private SimpleResponseHandler simpleResponseHandler;

  @Inject
  public UserUpdateHandler(Vertx vertx) {
    this.vertx = vertx;
  }

  public void handle(RoutingContext routingContext) {
    ChainableOptional.ofNullable(routingContext.user().principal().getBoolean("canView", false))
        .filter(b -> b)
        .ifPresent(canView -> {
          JsonObject bodyAsJson = routingContext.getBodyAsJson();
          ChainableOptional.ofNullable(bodyAsJson.getJsonArray("permissions"))
              .ifPresent(permissions -> {
                DeliveryOptions deliveryOptions = Config.createDeliveryOptions("user-update");
                JsonObject params = new JsonObject()
                    .put("username", routingContext.user().principal().getString("username"))
                    .put("permissions", permissions);
                simpleResponseHandler.handle(routingContext, params, deliveryOptions);
              }).orElseDo(() -> fourHundred(routingContext, "permissions"));
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
  public UserUpdateHandler applyConfiguration(Config config) {
    this.simpleResponseHandler = new SimpleResponseHandler(config, vertx);
    return this;
  }
}
