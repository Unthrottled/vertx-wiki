package io.vertx;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Provider;
import io.acari.util.inject.VerticalOrchestrator;
import io.acari.util.inject.VertxModule;
import io.vertx.core.Future;
import io.vertx.core.Vertx;
import io.vertx.ext.unit.Async;
import io.vertx.ext.unit.TestContext;
import io.vertx.ext.unit.junit.VertxUnitRunner;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(VertxUnitRunner.class)
public class VerticalOrchestratorTest {


  private Provider<Vertx> provider;

  @Before
  public void setUp(TestContext tc) {
    Injector injector = Guice.createInjector(new VertxModule());
    provider = injector.getProvider(Vertx.class);
    VerticalOrchestrator instance = injector.getInstance(VerticalOrchestrator.class);
    instance.start(Future.future());
  }

  @After
  public void tearDown(TestContext tc) {
    provider.get().close(tc.asyncAssertSuccess());
  }

  @Ignore
  @Test
  public void testThatTheServerIsStarted(TestContext tc) {
    Async async = tc.async();
    provider.get().createHttpClient().getNow(8989, "localhost", "/", response -> {
      tc.assertEquals(response.statusCode(), 200);
      response.bodyHandler(body -> {
        tc.assertTrue(body.length() > 0);
        async.complete();
      });
    });
  }

}
