package io.acari.starter;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Steve extends AbstractVerticle {
  private static final Logger LOGGER = LoggerFactory.getLogger(Steve.class);
  private final DatabasePreparer databasePreparer;
  private final HttpSeverStarter httpSeverStarter;

  public Steve(DatabasePreparer databasePreparer, HttpSeverStarter httpSeverStarter) {
    this.databasePreparer = databasePreparer;
    this.httpSeverStarter = httpSeverStarter;
  }

  public Steve() {
    databasePreparer = new DatabasePreparer();
    httpSeverStarter = new HttpSeverStarter();
  }

  @Override
  public void start(Future<Void> startupGuy) {
    LOGGER.info("STARTING!");
    databasePreparer.prepare()
      .compose(v-> httpSeverStarter.start())
      .setHandler(startupGuy.completer());
  }

}
