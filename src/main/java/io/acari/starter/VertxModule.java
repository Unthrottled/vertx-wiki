package io.acari.starter;

import com.google.inject.AbstractModule;
import io.vertx.core.Vertx;

/**
 * Forged in the flames of battle by alex.
 */
public class VertxModule extends AbstractModule {
    protected void configure() {
        //add configuration logic here
      bind(Database.class).to(DatabaseManager.class);
      bind(Server.class).to(HttpSeverStarter.class);
      bind(Vertx.class).toProvider(VertxProvider.class);
    }
}
