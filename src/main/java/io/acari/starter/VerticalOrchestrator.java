package io.acari.starter;

import com.google.inject.Inject;
import io.vertx.core.Future;
import io.vertx.core.Vertx;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class VerticalOrchestrator {
  private static final Logger LOGGER = LoggerFactory.getLogger(VerticalOrchestrator.class);
  private final Database database;
  private final HttpServerStarter httpServerStarter;
  private final Vertx vertx;

  @Inject
  public VerticalOrchestrator(Database database, HttpServerStarter httpServerStarter, Vertx vertx) {
    this.database = database;
    this.httpServerStarter = httpServerStarter;
    this.vertx = vertx;
  }

  public void start(Future<Void> startupGuy) {
    LOGGER.info("STARTING!");
    database.prepare(vertx)
      .compose(v-> httpServerStarter.start(vertx))
      .setHandler(startupGuy.completer());
  }

}
