package io.vertx.starter;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Provider;
import io.acari.starter.VerticalOrchestrator;
import io.acari.starter.VertxModule;
import io.acari.starter.VertxProvider;
import io.vertx.core.Future;
import io.vertx.core.Vertx;
import io.vertx.ext.unit.Async;
import io.vertx.ext.unit.TestContext;
import io.vertx.ext.unit.junit.VertxUnitRunner;
import org.junit.After;
import org.junit.Before;
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

  @Test
  public void testThatTheServerIsStarted(TestContext tc) {
    Async async = tc.async();
    provider.get().createHttpClient().getNow(6666, "localhost", "/", response -> {
      tc.assertEquals(response.statusCode(), 200);
      response.bodyHandler(body -> {
        tc.assertTrue(body.length() > 0);
        tc.assertEquals("Hey, that's pretty good!\n",body.toString());
        async.complete();
      });
    });
  }

}
