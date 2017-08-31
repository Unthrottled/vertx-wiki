package io.acari.starter;

import com.google.inject.Inject;
import io.vertx.core.Handler;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.ext.sql.SQLConnection;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static io.acari.starter.ChainableOptional.ofNullable;

public class SaveHandler implements Handler<RoutingContext> {
  private static final Logger LOGGER = LoggerFactory.getLogger(SaveHandler.class);

  private final Database database;
  private final ErrorHandler errorHandler;

  @Inject
  public SaveHandler(Database database, ErrorHandler errorHandler) {
    this.database = database;
    this.errorHandler = errorHandler;
  }

  @Override
  public void handle(RoutingContext routingContext) {
    HttpServerRequest request = routingContext.request();
    ofNullable(request.getParam("id"))
      .ifPresent(id -> ofNullable(request.getParam("title"))
        .ifPresent(pageName -> ofNullable(request.getParam("markdown"))
          .ifPresent(markDown -> ofNullable(request.getParam("newPage"))
            .map(Boolean::valueOf)
            .map(Boolean.TRUE::equals)
            .ifPresent(newPage ->
              database.getConnection(aConn -> {
                if (aConn.succeeded()) {
                  SQLConnection connection = aConn.result();
                  JsonArray params = getParams(newPage, id, pageName, markDown);
                  connection.updateWithParams(getSql(newPage), params,
                    aRes -> {
                      if (aRes.succeeded()) {
                        PageReRouter.reRoute(routingContext, pageName);
                      } else {
                        errorHandler.handle(routingContext, aRes);
                      }
                    })
                    .commit(voidAsyncResult -> LOGGER.info("Save page commit!"))
                    .close(v -> connection.close());
                } else {
                  errorHandler.handle(routingContext, aConn);
                }
              }))
            .orElseDo(() -> fourHundred(routingContext, "No NewPage Provided, Bruv.")))
          .orElseDo(() -> fourHundred(routingContext, "No MarkDown Provided, Bruv.")))
        .orElseDo(() -> fourHundred(routingContext, "No Title Provided, Bruv."))
      ).orElseDo(() -> fourHundred(routingContext, "No Id Provided, Bruv."));
  }

  private JsonArray getParams(Boolean newPage, String id, String pageName, String markDown) {
    return newPage ? NewPage.create(pageName, markDown) : UpdatePage.update(id, markDown);
  }

  private String getSql(Boolean newPage) {
    return newPage ? Queries.SQL_CREATE_PAGE : Queries.SQL_SAVE_PAGE;
  }

  private void fourHundred(RoutingContext routingContext, String errorMessage) {
    routingContext.response()
      .setStatusCode(400)
      .end(errorMessage);
  }
}
