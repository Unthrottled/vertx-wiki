package io.acari.handler.http.auth;

import io.acari.handler.Configurable;
import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.auth.AuthProvider;
import io.vertx.ext.auth.User;
import io.vertx.ext.auth.jwt.JWTAuth;
import io.vertx.ext.auth.jwt.JWTOptions;
import io.vertx.ext.auth.mongo.MongoAuth;
import io.vertx.ext.web.RoutingContext;
import io.vertx.rx.java.ObservableHandler;
import io.vertx.rx.java.RxHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import rx.Observable;
import rx.functions.Func1;

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
                                    getUserRole(user)
                                        .subscribe(userRole -> {
                                          JsonObject principal = new JsonObject()
                                              .put("username", username)
                                              .put("role", userRole)
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
                                        }, error -> {
                                          LOGGER.warn("Thing Broke in Token Handler -> ", error);
                                          routingContext.response().setStatusCode(500).end();
                                        });
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

  private Observable<String> getUserRole(User user) {
    ObservableHandler<AsyncResult<Boolean>> adminHandler = RxHelper.observableHandler();
    user.isAuthorised(MongoAuth.ROLE_PREFIX + "admin", adminHandler.toHandler());
    ObservableHandler<AsyncResult<Boolean>> editorHandler = RxHelper.observableHandler();
    user.isAuthorised(MongoAuth.ROLE_PREFIX + "editor", editorHandler.toHandler());
    ObservableHandler<AsyncResult<Boolean>> writerHandler = RxHelper.observableHandler();
    user.isAuthorised(MongoAuth.ROLE_PREFIX + "writer", writerHandler.toHandler());
    ObservableHandler<AsyncResult<Boolean>> readerHandler = RxHelper.observableHandler();
    user.isAuthorised(MongoAuth.ROLE_PREFIX + "reader", readerHandler.toHandler());
    return adminHandler.map(getMapper("admin"))
        .zipWith(editorHandler.map(getMapper("editor")), (a, b) -> a == null ? b : a)
        .zipWith(writerHandler.map(getMapper("writer")), (a, b) -> a == null ? b : a)
        .zipWith(readerHandler.map(getMapper("reader")), (a, b) -> a == null ? "reader" : a);
  }

  private Func1<? super AsyncResult<Boolean>, ? extends String> getMapper(String role) {
    return res ->
        ChainableOptional.of(res)
            .filter(AsyncResult::succeeded)
            .map(has -> role)
            .orElse(null);
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
