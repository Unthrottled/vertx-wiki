package io.acari;

import com.google.inject.Injector;
import io.acari.core.HttpVerticle;
import io.vertx.core.Verticle;
import io.vertx.core.spi.VerticleFactory;

public class HttpVerticalFactory implements VerticleFactory {
  private final Injector injector;

  public HttpVerticalFactory(Injector injector) {
    this.injector = injector;
  }

  @Override
  public String prefix() {
    return "HttpVerticle";///
  }

  @Override
  public Verticle createVerticle(String s, ClassLoader classLoader) throws Exception {
    return injector.getInstance(HttpVerticle.class);
  }
}
