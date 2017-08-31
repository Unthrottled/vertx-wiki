package io.acari.core;

import com.google.inject.Inject;
import io.acari.handler.*;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HttpVerticle extends AbstractVerticle {
  private static final Logger LOGGER = LoggerFactory.getLogger(HttpVerticle.class);
  private final IndexHandler indexHandler;
  private final ErrorHandler errorHandler;
  private final PageHandler pageHandler;
  private final CreationHandler creationHandler;
  private final SaveHandler saveHandler;
  private final DeletionHandler deletionHandler;

  @Inject
  public HttpVerticle(IndexHandler indexHandler,
                      ErrorHandler errorHandler,
                      PageHandler pageHandler,
                      CreationHandler creationHandler,
                      SaveHandler saveHandler,
                      DeletionHandler deletionHandler) {
    this.indexHandler = indexHandler;
    this.errorHandler = errorHandler;
    this.pageHandler = pageHandler;
    this.creationHandler = creationHandler;
    this.saveHandler = saveHandler;
    this.deletionHandler = deletionHandler;
  }


  @Override
  public void start(Future<Void> future) {
    Router router = Router.router(vertx);
    router.get("/").handler(indexHandler);
    router.get("/error").handler(errorHandler);
    router.get("/wiki/:page").handler(pageHandler);
    router.post().handler(BodyHandler.create());
    router.post("/save").handler(saveHandler);
    router.post("/create").handler(creationHandler);
    router.post("/delete").handler(deletionHandler);

    vertx.createHttpServer()
      .requestHandler(router::accept)
      .listen(8989, httpServerAsyncResult -> {
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
