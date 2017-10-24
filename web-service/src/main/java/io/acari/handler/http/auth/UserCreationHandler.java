package io.acari.handler.http.auth;

import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.auth.mongo.MongoAuth;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;

public class UserCreationHandler implements Handler<RoutingContext> {
  private static final Logger LOGGER = LoggerFactory.getLogger(UserCreationHandler.class);
  private final MongoAuth mongoAuth;

  public UserCreationHandler(MongoAuth mongoAuth) {
    this.mongoAuth = mongoAuth;
  }

  @Override
  public void handle(RoutingContext routingContext) {
    JsonObject body = routingContext.getBodyAsJson();
    ChainableOptional.ofNullable(body.getString("login"))
        .ifPresent(login -> ChainableOptional.ofNullable(body.getString("password"))
            .ifPresent(password -> ChainableOptional.ofNullable(body.getString("role"))
                .ifPresent(role -> {
                  mongoAuth.insertUser(login,
                      password,
                      Collections.singletonList(role),
                      Collections.emptyList(),
                      stringAsyncResult -> ChainableOptional.of(stringAsyncResult)
                          .filter(AsyncResult::succeeded)
                          .map(AsyncResult::result)
                          .ifPresent(result -> {
                            routingContext.response().setStatusCode(201).end(result);
                          })
                          .orElseDo(() -> {
                            LOGGER.warn("Ohhhhh sheeeeeeit", stringAsyncResult.cause());
                            routingContext.response()
                                .setStatusCode(400)
                                .end("You can't do dat \n ¯\\_(ツ)_/¯");
                          }));
                }))
            .orElseDo(() -> fourHundred(routingContext, "password")))
        .orElseDo(() -> fourHundred(routingContext, "login"));

  }

  private void fourHundred(RoutingContext routingContext, String name) {
    routingContext.response()
        .setStatusCode(400)
        .end("No " + name + " Provided, bruv.");
  }
}
