package io.acari.starter;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;

public class Steve extends AbstractVerticle {
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
    databasePreparer.prepare()
      .compose(v-> httpSeverStarter.start())
      .setHandler(startupGuy.completer());
  }

}
