package io.acari.starter;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Steve extends AbstractVerticle {
  private static final Logger LOGGER = LoggerFactory.getLogger(Steve.class);
  private final DatabaseManager databaseManager;
  private final HttpSeverStarter httpSeverStarter;

  public Steve(DatabaseManager databaseManager, HttpSeverStarter httpSeverStarter) {
    this.databaseManager = databaseManager;
    this.httpSeverStarter = httpSeverStarter;
  }

  public Steve() {
    databaseManager = new DatabaseManager();
    httpSeverStarter = new HttpSeverStarter();
  }

  @Override
  public void start(Future<Void> startupGuy) {
    LOGGER.info("STARTING!");
    databaseManager.prepare(vertx)
      .compose(v-> httpSeverStarter.start(vertx))
      .setHandler(startupGuy.completer());
  }

}
