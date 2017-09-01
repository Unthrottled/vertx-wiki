package io.acari;

import com.google.inject.Guice;
import com.google.inject.Injector;
import io.acari.core.DatabaseVerticle;
import io.acari.core.HttpVerticle;
import io.acari.util.inject.VertxModule;
import io.vertx.core.Vertx;

public class VertxLauncher {

  public static void main(String... args) {
    Injector injector = Guice.createInjector(new VertxModule());
    Vertx vertx = Vertx.vertx();
    vertx.deployVerticle(injector.getInstance(DatabaseVerticle.class));
    vertx.deployVerticle(injector.getInstance(HttpVerticle.class));
  }
}
