package io.acari.starter;

import io.vertx.core.Vertx;

public class MainVerticle {

  public static void main(String... args) {
    Vertx.vertx().createHttpServer()
      .requestHandler(req -> req.response().end("Hello Vert.x!"))
      .listen(6666);
  }

}
