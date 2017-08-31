package io.acari.starter;

import com.google.inject.Inject;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonArray;
import io.vertx.ext.sql.SQLConnection;
import io.vertx.ext.web.RoutingContext;
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
    ChainableOptional.ofNullable(routingContext.request().getParam("id"))
      .ifPresent(id -> database.executeQuery(asc -> {
        if (asc.succeeded()) {
          SQLConnection connection = asc.result();
          connection.updateWithParams(Queries.SQL_DELETE_PAGE,
            new JsonArray().add(id),
            asr -> {
              connection.close();
              if(asr.succeeded()){
                PageReRouter.reRouteHome(routingContext);
              } else {
                errorHandler.handle(routingContext, asc);
              }
            });
        } else {
          errorHandler.handle(routingContext, asc);
        }
      }))
      .orElseDo(() -> routingContext.response().setStatusCode(400)
        .end("No Id entered bruv!"));

  }
}
