package io.acari.starter;

import com.google.inject.Inject;
import io.vertx.core.Handler;
import io.vertx.rxjava.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DeletionHandler implements Handler<RoutingContext> {
  private static final Logger LOGGER = LoggerFactory.getLogger(DeletionHandler.class);

  private final Database database;
  private final ErrorHandler errorHandler;

  @Inject
  public DeletionHandler(Database database, ErrorHandler errorHandler) {
    this.database = database;
    this.errorHandler = errorHandler;
  }

  @Override
  public void handle(RoutingContext routingContext) {


  }
}
