package io.acari;

import com.google.inject.AbstractModule;
import io.vertx.core.Vertx;
import io.vertx.ext.web.templ.TemplateEngine;

/**
 * Forged in the flames of battle by alex.
 */
public class VertxModule extends AbstractModule {
  protected void configure() {
    //add configuration logic here
    bind(Database.class).to(DatabaseManager.class);
    bind(Server.class).to(HttpServer.class);
    bind(Vertx.class).toProvider(VertxProvider.class);
    bind(TemplateEngine.class).toProvider(TemplateEngineProvider.class);
  }
}
