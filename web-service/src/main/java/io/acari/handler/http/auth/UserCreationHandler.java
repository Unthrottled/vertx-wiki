package io.acari.handler.http.auth;

import io.vertx.core.Handler;
import io.vertx.ext.auth.mongo.MongoAuth;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserCreationHandler implements Handler<RoutingContext> {
  private static final Logger LOGGER = LoggerFactory.getLogger(UserCreationHandler.class);
  private final MongoAuth mongoAuth;

  public UserCreationHandler(MongoAuth mongoAuth) {
    this.mongoAuth = mongoAuth;
  }

  @Override
  public void handle(RoutingContext routingContext) {

  }
}
