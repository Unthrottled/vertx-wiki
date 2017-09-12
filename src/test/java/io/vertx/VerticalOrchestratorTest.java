package io.vertx;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Provider;
import io.acari.HttpVerticalFactory;
import io.acari.core.DatabaseVerticle;
import io.acari.util.ChainableOptional;
import io.acari.util.inject.VertxModule;
import io.vertx.core.AsyncResult;
import io.vertx.core.DeploymentOptions;
import io.vertx.core.Future;
import io.vertx.core.Vertx;
import io.vertx.ext.unit.Async;
import io.vertx.ext.unit.TestContext;
import io.vertx.ext.unit.junit.VertxUnitRunner;
import org.junit.After;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(VertxUnitRunner.class)
public class VerticalOrchestratorTest {


  private static Provider<Vertx> provider;
  private static Future<String> onDeploy;

  @BeforeClass
  public static void setUp() {
    Injector injector = Guice.createInjector(new VertxModule());
    provider = injector.getProvider(Vertx.class);
    Vertx vertx = provider.get();
    vertx.registerVerticleFactory(new HttpVerticalFactory(injector));
    Future<String> dbDeploy = Future.future();
    vertx.deployVerticle(injector.getInstance(DatabaseVerticle.class), dbDeploy.completer());
    onDeploy = dbDeploy.compose(id -> {
      Future<String> httpDeploy = Future.future();
      vertx.deployVerticle("io.acari.core.HttpVerticle",
        new DeploymentOptions().setInstances(2),
        httpDeploy);
      return httpDeploy;
    });
  }

  @After
  public void tearDown(TestContext tc) {
    provider.get().close(tc.asyncAssertSuccess());
  }

  @Test
  public void testThatTheServerIsStarted(TestContext tc) {
    onDeploy.setHandler(result -> {
      ChainableOptional.of(result)
        .filter(AsyncResult::succeeded)
        .ifPresent(deployStatus -> {
          Async async = tc.async();
          provider.get().createHttpClient().getNow(8989, "localhost", "/login", response -> {
            tc.assertEquals(response.statusCode(), 200);
            response.bodyHandler(body -> {
              tc.assertTrue(body.length() > 0);
              async.complete();
            });
          });
        })
        .orElseDo(tc::fail);
    });
  }

}
