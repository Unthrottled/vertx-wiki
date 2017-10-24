package io.acari;

import com.google.inject.Guice;
import com.google.inject.Injector;
import io.acari.core.DatabaseVerticle;
import io.acari.util.inject.VertxModule;
import io.vertx.core.DeploymentOptions;
import io.vertx.core.Future;
import io.vertx.core.Vertx;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class VertxLauncher {
  private static final Logger LOGGER = LoggerFactory.getLogger(VertxLauncher.class);

  public static void main(String... args) {
    Injector injector = Guice.createInjector(new VertxModule());
    Vertx vertx = injector.getInstance(Vertx.class);
    vertx.registerVerticleFactory(new HttpVerticalFactory(injector));
    Future<String> dbDeploy = Future.future();
    vertx.deployVerticle(injector.getInstance(DatabaseVerticle.class), dbDeploy.completer());
    dbDeploy.compose(id -> {
      Future<String> httpDeploy = Future.future();
      vertx.deployVerticle("io.acari.core.HttpVerticle",
          new DeploymentOptions().setInstances(2),
          httpDeploy);
      return httpDeploy;
    }).setHandler(stringAsyncResult -> {
      if (stringAsyncResult.succeeded()) {
        LOGGER.info("STARTED");
      } else {
        LOGGER.error("FAILED ->", stringAsyncResult.cause());
      }
    });

  }
}
