package io.acari.starter;

import com.google.inject.Inject;
import io.vertx.core.Future;
import io.vertx.core.Vertx;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class VerticalOrchestrator {
  private static final Logger LOGGER = LoggerFactory.getLogger(VerticalOrchestrator.class);
  private final Database database;
  private final HttpSeverStarter httpSeverStarter;
  private final Vertx vertx;

  @Inject
  public VerticalOrchestrator(Database database, HttpSeverStarter httpSeverStarter, Vertx vertx) {
    this.database = database;
    this.httpSeverStarter = httpSeverStarter;
    this.vertx = vertx;
  }

  public void start(Future<Void> startupGuy) {
    LOGGER.info("STARTING!");
    database.prepare(vertx)
      .compose(v-> httpSeverStarter.start(vertx))
      .setHandler(startupGuy.completer());
  }

}
