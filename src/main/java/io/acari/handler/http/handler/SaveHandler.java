package io.acari.handler.http.handler;

import com.google.inject.Inject;
import io.acari.handler.Config;
import io.acari.handler.Configurable;
import io.acari.util.ChainableOptional;
import io.acari.util.NewPage;
import io.acari.util.PageReRouter;
import io.acari.util.UpdatePage;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.eventbus.Message;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SaveHandler implements Handler<RoutingContext>, Configurable<Config, SaveHandler> {
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
    routingContext.user().isAuthorised("update", booleanAsyncResult -> {
      ChainableOptional.of(booleanAsyncResult)
        .filter(AsyncResult::succeeded)
        .filter(AsyncResult::result)
        .ifPresent(canUpdate -> {
          HttpServerRequest request = routingContext.request();
          ChainableOptional.ofNullable(request.getParam("id"))
            .ifPresent(id -> ChainableOptional.ofNullable(request.getParam("title"))
              .ifPresent(pageName -> ChainableOptional.ofNullable(request.getParam("markdown"))
                .ifPresent(markDown -> ChainableOptional.ofNullable(request.getParam("newPage"))
                  .map(Boolean::valueOf)
                  .map(Boolean.TRUE::equals)
                  .ifPresent(newPage -> {
                    Handler<AsyncResult<Message<JsonObject>>> asyncResultHandler = aRes -> {
                      if (aRes.succeeded()) {
                        PageReRouter.reRoute(routingContext, pageName);
                      } else {
                        errorHandler.handle(routingContext, aRes);
                      }
                    };
                    if (newPage) {
                      sendMessage(asyncResultHandler,
                        NewPage.create(pageName, markDown),
                        "create-page");
                    } else {
                      sendMessage(asyncResultHandler,
                        UpdatePage.update(id, markDown),
                        "save-page");
                    }
                  })
                  .orElseDo(() -> fourHundred(routingContext, "No NewPage Provided, Bruv.")))
                .orElseDo(() -> fourHundred(routingContext, "No MarkDown Provided, Bruv.")))
              .orElseDo(() -> fourHundred(routingContext, "No Title Provided, Bruv."))
            ).orElseDo(() -> fourHundred(routingContext, "No Id Provided, Bruv."));
        })
        .orElseDo(() -> routingContext.response()
          .setStatusCode(401)
          .end());
    });
  }

  private EventBus sendMessage(Handler<AsyncResult<Message<JsonObject>>> asyncResultHandler, JsonObject parameters, String action) {
    return vertx.eventBus()
      .send(config.getDbQueueName(),
        parameters,
        Config.createDeliveryOptions(action),
        asyncResultHandler);
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
