package io.acari.handler;

import com.google.inject.Inject;
import io.acari.util.ChainableOptional;
import io.acari.util.NewPage;
import io.acari.util.PageReRouter;
import io.acari.util.UpdatePage;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SaveHandler implements Handler<RoutingContext>, Configurable<SaveHandler> {
  private static final Logger LOGGER = LoggerFactory.getLogger(SaveHandler.class);

  private final Vertx vertx;
  private final ErrorHandler errorHandler;
  private Config config;

  @Inject
  public SaveHandler(Vertx vertx, ErrorHandler errorHandler) {
    this.vertx = vertx;
    this.errorHandler = errorHandler;
  }

  @Override
  public void handle(RoutingContext routingContext) {
    HttpServerRequest request = routingContext.request();
    ChainableOptional.ofNullable(request.getParam("id"))
      .ifPresent(id -> ChainableOptional.ofNullable(request.getParam("title"))
        .ifPresent(pageName -> ChainableOptional.ofNullable(request.getParam("markdown"))
          .ifPresent(markDown -> ChainableOptional.ofNullable(request.getParam("newPage"))
            .map(Boolean::valueOf)
            .map(Boolean.TRUE::equals)
            .ifPresent(newPage -> {
              JsonArray params = getParams(newPage, id, pageName, markDown);
              vertx.eventBus().send(config.getDbQueueName(),
                params,
                Config.createDeliveryOptions("save-page"),
                aRes -> {
                  if (aRes.succeeded()) {
                    PageReRouter.reRoute(routingContext, pageName);
                  } else {
                    errorHandler.handle(routingContext, aRes);
                  }
                });
            })
            .orElseDo(() -> fourHundred(routingContext, "No NewPage Provided, Bruv.")))
          .orElseDo(() -> fourHundred(routingContext, "No MarkDown Provided, Bruv.")))
        .orElseDo(() -> fourHundred(routingContext, "No Title Provided, Bruv."))
      ).orElseDo(() -> fourHundred(routingContext, "No Id Provided, Bruv."));
  }

  private JsonArray getParams(Boolean newPage, String id, String pageName, String markDown) {
    return newPage ? NewPage.create(pageName, markDown) : UpdatePage.update(id, markDown);
  }

  private void fourHundred(RoutingContext routingContext, String errorMessage) {
    routingContext.response()
      .setStatusCode(400)
      .end(errorMessage);
  }

  @Override
  public SaveHandler applyConfiguration(Config config) {
    this.config = config;
    return this;
  }
}
