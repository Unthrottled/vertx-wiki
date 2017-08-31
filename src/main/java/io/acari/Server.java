package io.acari;

import io.vertx.core.Future;
import io.vertx.core.Vertx;

public interface Server {
  Future<Void> start(Vertx vertx);
}
