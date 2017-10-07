package io.acari.util.inject;

import com.google.inject.AbstractModule;
import io.vertx.core.Vertx;

/**
 * Forged in the flames of battle by alex.
 */
public class VertxModule extends AbstractModule {
  protected void configure() {
    //add configuration logic here
    bind(Vertx.class).toProvider(VertxProvider.class);
  }
}
