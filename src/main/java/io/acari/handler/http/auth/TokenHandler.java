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

public class TokenHandler implements Handler<RoutingContext>, Configurable<AuthProvider, TokenHandler> {
  private AuthProvider authProvider;
  private JWTAuth jwtAuth;

  @Override
  public void handle(RoutingContext routingContext) {
    JsonObject credentials = new JsonObject()
      .put("username", routingContext.request().getHeader("login"))
      .put("password", routingContext.request().getHeader("password"));
    authProvider.authenticate(credentials, authRes -> {
      ChainableOptional.of(authRes)
        .filter(AsyncResult::succeeded)
        .map(AsyncResult::result)
        .ifPresent(user -> {
          user.isAuthorised("create", canCreate ->
            user.isAuthorised("delete", canDelete ->
              user.isAuthorised("update", canUpdate -> {
                String token = jwtAuth.generateToken(
                  new JsonObject()
                    .put("username", routingContext.request().getHeader("login"))
                    .put("canCreate", canCreate.succeeded() && canCreate.result())
                    .put("canDelete", canDelete.succeeded() && canDelete.result())
                    .put("canUpdate", canUpdate.succeeded() && canUpdate.result()),
                  new JWTOptions()
                    .setSubject("Wiki API")
                    .setIssuer("Vert.x")
                );
                routingContext.response()
                  .putHeader("Content-Type", "text/plain")
                  .end(token);
              })));
        })
        .orElseDo(() -> routingContext.response().setStatusCode(401).end());
    });

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
