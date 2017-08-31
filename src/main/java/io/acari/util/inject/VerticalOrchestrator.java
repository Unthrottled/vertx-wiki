package io.acari.util.inject;

import com.google.inject.Inject;
import io.acari.core.DatabaseVerticle;
import io.acari.core.HttpVerticle;
import io.vertx.core.Future;
import io.vertx.core.Vertx;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class VerticalOrchestrator {
  private static final Logger LOGGER = LoggerFactory.getLogger(VerticalOrchestrator.class);
  private final DatabaseVerticle database;
  private final HttpVerticle httpVerticle;
  private final Vertx vertx;

  @Inject
  public VerticalOrchestrator(DatabaseVerticle database, HttpVerticle httpVerticle, Vertx vertx) {
    this.database = database;
    this.httpVerticle = httpVerticle;
    this.vertx = vertx;
  }

  public void start(Future<Void> startupGuy) {
    LOGGER.info("STARTING!");
  }

}
