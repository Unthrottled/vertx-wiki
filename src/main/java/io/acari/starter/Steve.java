package io.acari.starter;

import io.vertx.core.AbstractVerticle;

public class Steve extends AbstractVerticle {

  @Override
  public void start() {
    vertx.createHttpServer()
      .requestHandler(req -> req.response().end("Hello Vert.x!"))
      .listen(6666);
  }

}
