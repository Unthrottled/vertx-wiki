package io.acari.starter;

import io.vertx.core.Future;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HttpSeverStarter {
  private static final Logger LOGGER = LoggerFactory.getLogger(HttpSeverStarter.class);

  public Future<Void> start(Vertx vertx) {
    Future<Void> future = Future.future();
    Router router = Router.router(vertx);
    router.get("/").handler(this::indexHandler);
    router.get("/wiki/:page").handler(this::pageRenderHandler);
    router.post().handler(BodyHandler.create());
    router.post("/save").handler(this::pageUpdateHandler);
    router.post("/create").handler(this::pageCreateHandler);
    router.post("/delete").handler(this::pageDeleteHandler);

    vertx.createHttpServer()
      .requestHandler(router::accept)
      .listen(6666, httpServerAsyncResult -> {
        HttpServer result = httpServerAsyncResult.result();
        if (httpServerAsyncResult.succeeded()) {
          LOGGER.info("Server listening on port " + result.actualPort());
          future.complete();
        } else {
          LOGGER.warn("Unable to create server because -> ", httpServerAsyncResult.cause());
          future.fail(httpServerAsyncResult.cause());
        }
      });


    return future;
  }

  private void pageDeleteHandler(RoutingContext routingContext) {

  }

  private void pageCreateHandler(RoutingContext routingContext) {

  }

  private void pageUpdateHandler(RoutingContext routingContext) {

  }

  private void pageRenderHandler(RoutingContext routingContext) {

  }

  private void indexHandler(RoutingContext routingContext) {
    LOGGER.info("INCOMING REQUEST!!!");
    routingContext.response()
      .setStatusCode(200)
      .end("Butts!\n");
  }

}
