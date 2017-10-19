package io.acari.handler.http.auth;

import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserLogoutHandler implements Handler<RoutingContext> {
  private static final Logger LOGGER = LoggerFactory.getLogger(UserLogoutHandler.class);


  @Override
  public void handle(RoutingContext routingContext) {
    routingContext.clearUser();
    routingContext.response()
        .setStatusCode(200)
        .end(new JsonObject().put("success", true).encode());
  }

}
