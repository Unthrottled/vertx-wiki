package io.acari.handler.http.auth;

import io.acari.handler.Configurable;
import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.auth.AuthProvider;
import io.vertx.ext.auth.jwt.JWTAuth;
import io.vertx.ext.auth.jwt.JWTOptions;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TokenHandler implements Handler<RoutingContext>, Configurable<AuthProvider, TokenHandler> {
  private static final Logger LOGGER = LoggerFactory.getLogger(TokenHandler.class);
  private AuthProvider authProvider;
  private JWTAuth jwtAuth;

  @Override
  public void handle(RoutingContext routingContext) {
    JsonObject body = routingContext.getBodyAsJson();
    ChainableOptional.ofNullable(body.getString("login"))
      .ifPresent(username ->
        ChainableOptional.ofNullable(body.getString("password"))
          .ifPresent(password -> {
            JsonObject credentials = new JsonObject()
              .put("username", username)
              .put("password", password);
            authProvider.authenticate(credentials, authRes -> ChainableOptional.of(authRes)
              .filter(AsyncResult::succeeded)
              .map(AsyncResult::result)
              .ifPresent(user -> user.isAuthorised("view", canView ->
                user.isAuthorised("create", canCreate ->
                  user.isAuthorised("delete", canDelete ->
                    user.isAuthorised("update", canUpdate -> {
                      JsonObject principal = new JsonObject()
                        .put("username", username)
                        .put("canView", canView.succeeded() && canView.result())
                        .put("canCreate", canCreate.succeeded() && canCreate.result())
                        .put("canDelete", canDelete.succeeded() && canDelete.result())
                        .put("canUpdate", canUpdate.succeeded() && canUpdate.result());
                      String token = jwtAuth.generateToken(
                        principal,
                        new JWTOptions()
                          .setSubject("Wiki API")
                          .setIssuer("Vert.x")
                      );
                      routingContext.response()
                        .putHeader("Content-Type", "application/json")
                        .end(new JsonObject()
                          .put("token", token)
                          .put("principal", principal).encode());
                    })))))
              .orElseDo(() -> {
                LOGGER.warn("Thing Broke in Token Handler -> ", authRes.cause());
                routingContext.response().setStatusCode(401).end();
              }));
          })
          .orElseDo(() -> fourHundred(routingContext, "password")))
      .orElseDo(() -> fourHundred(routingContext, "login"));
  }

  private void fourHundred(RoutingContext routingContext, String name) {
    routingContext.response()
      .setStatusCode(400)
      .end("No " + name + " Provided, bruv.");
  }

  @Override
  public TokenHandler applyConfiguration(AuthProvider authProvider) {
    this.authProvider = authProvider;
    return this;
  }

  public TokenHandler applyConfiguration(JWTAuth jwtAuth) {
    this.jwtAuth = jwtAuth;
    return this;
  }
}
