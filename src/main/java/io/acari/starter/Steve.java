package io.acari.starter;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;

public class Steve extends AbstractVerticle {

  @Override
  public void start(Future<Void> startupGuy) {
    vertx.createHttpServer()
      .requestHandler(req -> req.response().end("Hello Vert.x!\n"))
      .listen(6666);
    startupGuy.complete();
  }

}
