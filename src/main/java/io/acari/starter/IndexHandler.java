package io.acari.starter;

import com.google.inject.Inject;
import io.vertx.core.Handler;
import io.vertx.ext.web.RoutingContext;

public class IndexHandler implements Handler<RoutingContext> {

  private final Database database;

  @Inject
  public IndexHandler(Database database) {
    this.database = database;
  }

  public void handle(RoutingContext routingContext) {
    routingContext.response()
      .setStatusCode(200)
      .end("Hey, that's pretty good!\n");
  }
}
