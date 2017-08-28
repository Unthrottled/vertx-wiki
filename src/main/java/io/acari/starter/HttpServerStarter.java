package io.acari.starter;

import com.google.inject.Inject;
import io.vertx.core.Future;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HttpServerStarter implements Server {
  private static final Logger LOGGER = LoggerFactory.getLogger(HttpServerStarter.class);
  private final IndexHandler indexHandler;
  private final ErrorHandler errorHandler;
  private final PageHandler pageHandler;

  @Inject
  public HttpServerStarter(IndexHandler indexHandler, ErrorHandler errorHandler, PageHandler pageHandler) {
    this.indexHandler = indexHandler;
    this.errorHandler = errorHandler;
    this.pageHandler = pageHandler;
  }


  public Future<Void> start(Vertx vertx) {
    Future<Void> future = Future.future();
    Router router = Router.router(vertx);
    router.get("/").handler(indexHandler);
    router.get("/error").handler(errorHandler);
    router.get("/wiki/:page").handler(pageHandler);
    router.post().handler(BodyHandler.create());
    router.post("/save").handler(this::pageUpdateHandler);
    router.post("/create").handler(this::pageCreateHandler);
    router.post("/delete").handler(this::pageDeleteHandler);

    vertx.createHttpServer()
      .requestHandler(router::accept)
      .listen(8989, httpServerAsyncResult -> {
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

}
