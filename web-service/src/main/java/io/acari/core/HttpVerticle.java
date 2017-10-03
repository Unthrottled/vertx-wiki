package io.acari.core;

import com.google.inject.Inject;
import io.acari.handler.Config;
import io.acari.handler.http.api.*;
import io.acari.handler.http.auth.TokenHandler;
import io.acari.handler.http.auth.UserCreationHandler;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.auth.AuthProvider;
import io.vertx.ext.auth.jwt.JWTAuth;
import io.vertx.ext.auth.mongo.MongoAuth;
import io.vertx.ext.auth.shiro.ShiroAuth;
import io.vertx.ext.auth.shiro.ShiroAuthOptions;
import io.vertx.ext.auth.shiro.ShiroAuthRealmType;
import io.vertx.ext.mongo.MongoClient;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.*;
import io.vertx.ext.web.sstore.LocalSessionStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static io.acari.util.MongoConfig.getConfig;

public class HttpVerticle extends AbstractVerticle {
  private static final Logger LOGGER = LoggerFactory.getLogger(HttpVerticle.class);
  private static final String CONFIG_HTTP_SERVER_PORT = "http.server.port";
  private static final String CONFIG_WIKIDB_QUEUE = "wikidb.queue";
  private static final int CONFIG_HTTP_SERVER_PORT_NUMBER = 8989;
  private final io.acari.handler.http.api.APIAllPageDataHandler APIAllPageDataHandler;
  private final APIPageHandler apiPageHandler;
  private final APICreationHandler apiCreationHandler;
  private final APIUpdateHandler apiUpdateHandler;
  private final APIDeletionHandler apiDeletionHandler;
  private final TokenHandler tokenHandler;
  private final APIPageExistsHandler apiPageExistsHandler;
  private MongoClient mongoClient;

  @Inject
  public HttpVerticle(APIAllPageDataHandler APIAllPageDataHandler,
                      APIPageHandler apiPageHandler,
                      APICreationHandler apiCreationHandler,
                      APIUpdateHandler apiUpdateHandler,
                      APIDeletionHandler apiDeletionHandler,
                      TokenHandler tokenHandler,
                      APIPageExistsHandler apiPageExistsHandler) {
    this.APIAllPageDataHandler = APIAllPageDataHandler;
    this.apiPageHandler = apiPageHandler;
    this.apiCreationHandler = apiCreationHandler;
    this.apiUpdateHandler = apiUpdateHandler;
    this.apiDeletionHandler = apiDeletionHandler;
    this.tokenHandler = tokenHandler;
    this.apiPageExistsHandler = apiPageExistsHandler;
  }


  @Override
  public void start(Future<Void> future) {
    Config config = new Config(config().getString(CONFIG_WIKIDB_QUEUE, CONFIG_WIKIDB_QUEUE));
    mongoClient = MongoClient.createShared(vertx, getConfig());
    JsonObject authProps = new JsonObject();
    MongoAuth mongoAuth = MongoAuth.create(mongoClient, authProps);

    Router router = Router.router(vertx);

    router.route().handler(CookieHandler.create());
    router.route().handler(BodyHandler.create());
    router.route().handler(SessionHandler.create(LocalSessionStore.create(vertx)));
    router.route().handler(UserSessionHandler.create(mongoAuth));

    AuthHandler authHandler = RedirectAuthHandler.create(mongoAuth, "/");
    router.route("/wiki/*").handler(authHandler);
    router.route("/action/*").handler(authHandler);

    Router apiRouter = Router.router(vertx);

    JWTAuth jwtAuth = JWTAuth.create(vertx, new JsonObject()
      .put("keyStore", new JsonObject()//dis needs to be camel case
        .put("path", "keystore.jceks")
        .put("type", "jceks")
        .put("password", "secret")));//TODO: DIS FEELS ICKY
    apiRouter.route().handler(JWTAuthHandler.create(jwtAuth, "/api/token"));
    apiRouter.post().handler(BodyHandler.create());
    apiRouter.post("/token").handler(tokenHandler
      .applyConfiguration(jwtAuth)
      .applyConfiguration(mongoAuth));

    apiRouter.get("/pages").handler(APIAllPageDataHandler.applyConfiguration(config));
    apiRouter.get("/pages/:page").handler(apiPageHandler.applyConfiguration(config));
    apiRouter.get("/exists/:page").handler(apiPageExistsHandler.applyConfiguration(config));
    apiRouter.post("/pages").handler(apiCreationHandler.applyConfiguration(config));
    apiRouter.post("/user/create").handler(new UserCreationHandler(mongoAuth));
    apiRouter.put().handler(BodyHandler.create());
    apiRouter.put("/pages").handler(apiUpdateHandler.applyConfiguration(config));
    apiRouter.delete("/page/:page").handler(apiDeletionHandler.applyConfiguration(config));
    router.mountSubRouter("/api", apiRouter);

    StaticHandler requestHandler = StaticHandler.create();
    router.get("/*").handler(requestHandler).failureHandler(routingContext -> routingContext.reroute("/"));

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
