package io.acari.core;

import com.google.inject.Inject;
import io.acari.handler.Config;
import io.acari.handler.auth.LoginHandler;
import io.acari.handler.http.*;
import io.acari.handler.http.ErrorHandler;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.auth.AuthProvider;
import io.vertx.ext.auth.jwt.JWTAuth;
import io.vertx.ext.auth.shiro.ShiroAuth;
import io.vertx.ext.auth.shiro.ShiroAuthOptions;
import io.vertx.ext.auth.shiro.ShiroAuthRealmType;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.*;
import io.vertx.ext.web.sstore.LocalSessionStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HttpVerticle extends AbstractVerticle {
  private static final Logger LOGGER = LoggerFactory.getLogger(HttpVerticle.class);
  private static final String CONFIG_HTTP_SERVER_PORT = "http.server.port";
  private static final String CONFIG_WIKIDB_QUEUE = "wikidb.queue";
  private static final int CONFIG_HTTP_SERVER_PORT_NUMBER = 8989;
  private final IndexHandler indexHandler;
  private final ErrorHandler errorHandler;
  private final PageHandler pageHandler;
  private final CreationHandler creationHandler;
  private final SaveHandler saveHandler;
  private final DeletionHandler deletionHandler;
  private final APIAllPageDataHandler APIAllPageDataHandler;
  private final APIPageHandler apiPageHandler;
  private final APICreationHandler apiCreationHandler;
  private final APIUpdateHandler apiUpdateHandler;
  private final APIDeletionHandler apiDeletionHandler;
  private final LoginHandler loginHandler;
  private final TokenHandler tokenHandler;

  @Inject
  public HttpVerticle(IndexHandler indexHandler,
                      ErrorHandler errorHandler,
                      PageHandler pageHandler,
                      CreationHandler creationHandler,
                      SaveHandler saveHandler,
                      DeletionHandler deletionHandler,
                      APIAllPageDataHandler APIAllPageDataHandler,
                      APIPageHandler apiPageHandler,
                      APICreationHandler apiCreationHandler,
                      APIUpdateHandler apiUpdateHandler,
                      APIDeletionHandler apiDeletionHandler,
                      LoginHandler loginHandler,
                      TokenHandler tokenHandler) {
    this.indexHandler = indexHandler;
    this.errorHandler = errorHandler;
    this.pageHandler = pageHandler;
    this.creationHandler = creationHandler;
    this.saveHandler = saveHandler;
    this.deletionHandler = deletionHandler;
    this.APIAllPageDataHandler = APIAllPageDataHandler;
    this.apiPageHandler = apiPageHandler;
    this.apiCreationHandler = apiCreationHandler;
    this.apiUpdateHandler = apiUpdateHandler;
    this.apiDeletionHandler = apiDeletionHandler;
    this.loginHandler = loginHandler;
    this.tokenHandler = tokenHandler;
  }


  @Override
  public void start(Future<Void> future) {
    Config config = new Config(config().getString(CONFIG_WIKIDB_QUEUE, CONFIG_WIKIDB_QUEUE));
    AuthProvider authProvider = ShiroAuth.create(vertx,
      new ShiroAuthOptions()
        .setType(ShiroAuthRealmType.PROPERTIES)
        .setConfig(new JsonObject()
          .put("properties_path", "classpath:user.properties")));

    Router router = Router.router(vertx);

    router.route().handler(CookieHandler.create());
    router.route().handler(BodyHandler.create());
    router.route().handler(SessionHandler.create(LocalSessionStore.create(vertx)));
    router.route().handler(UserSessionHandler.create(authProvider));

    AuthHandler authHandler = RedirectAuthHandler.create(authProvider, "/login");
    router.route("/").handler(authHandler);
    router.route("/wiki/*").handler(authHandler);
    router.route("/action/*").handler(authHandler);

    router.get("/login").handler(loginHandler);
    router.post("/login-auth").handler(FormLoginHandler.create(authProvider)
      .setDirectLoggedInOKURL("/"));
    router.get("/logout").handler(routingContext -> {
      routingContext.clearUser();
      routingContext.response()
        .setStatusCode(302)
        .putHeader("Location", "/")
        .end();
    });

    router.get("/").handler(indexHandler.applyConfiguration(config));
    router.get("/error").handler(errorHandler);
    router.get("/wiki/:page").handler(pageHandler.applyConfiguration(config));
    router.post().handler(BodyHandler.create());
    router.post("/action/save").handler(saveHandler.applyConfiguration(config));
    router.post("/action/create").handler(creationHandler);
    router.post("/action/delete").handler(deletionHandler.applyConfiguration(config));

    Router apiRouter = Router.router(vertx);

    JWTAuth jwtAuth = JWTAuth.create(vertx, new JsonObject()
      .put("keystore", new JsonObject()
        .put("path", "keystore.jceks")
        .put("type", "jceks")
        .put("password", "secret")));//TODO: DIS FEELS ICKY
    apiRouter.route().handler(JWTAuthHandler.create(jwtAuth, "/token"));
    apiRouter.route().handler(tokenHandler
      .applyConfiguration(jwtAuth)
      .applyConfiguration(authProvider));

    apiRouter.get("/pages").handler(APIAllPageDataHandler.applyConfiguration(config));
    apiRouter.get("/pages/:page").handler(apiPageHandler.applyConfiguration(config));
    apiRouter.post().handler(BodyHandler.create());
    apiRouter.post("/pages").handler(apiCreationHandler.applyConfiguration(config));
    apiRouter.put().handler(BodyHandler.create());
    apiRouter.put("/pages").handler(apiUpdateHandler.applyConfiguration(config));
    apiRouter.delete().handler(BodyHandler.create());
    apiRouter.delete("/pages").handler(apiDeletionHandler.applyConfiguration(config));
    router.mountSubRouter("/api", apiRouter);

    int portNumber = config().getInteger(CONFIG_HTTP_SERVER_PORT, CONFIG_HTTP_SERVER_PORT_NUMBER);
    vertx.createHttpServer()
      .requestHandler(router::accept)
      .listen(portNumber, httpServerAsyncResult -> {
        io.vertx.core.http.HttpServer result = httpServerAsyncResult.result();
        if (httpServerAsyncResult.succeeded()) {
          LOGGER.info("Server listening on port " + result.actualPort());
          future.complete();
        } else {
          LOGGER.warn("Unable to create server because -> ", httpServerAsyncResult.cause());
          future.fail(httpServerAsyncResult.cause());
        }
      });
  }
}
