package io.acari.handler.http;

import com.github.rjeschke.txtmark.Processor;
import com.google.inject.Inject;
import io.acari.handler.Config;
import io.acari.handler.Configurable;
import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class APIPageHandler implements Handler<RoutingContext>, Configurable<Config, APIPageHandler> {
  public static final int NOT_FOUND = -1;
  private static final Logger LOGGER = LoggerFactory.getLogger(APIPageHandler.class);
  private final Vertx vertx;
  private Config config;

  @Inject
  public APIPageHandler(Vertx vertx) {
    this.vertx = vertx;
  }

  public void handle(RoutingContext routingContext) {
    ChainableOptional.ofNullable(routingContext.request().getParam("page"))
      .ifPresent(pago -> vertx.eventBus().<JsonObject>send(config.getDbQueueName(),
        new JsonObject().put("page", pago),
        Config.createDeliveryOptions("get-page"),
        connectionResult -> {
          routingContext.response()
            .putHeader("Content-Type", "application/json")
            .end(getPayLoad(connectionResult, routingContext).encode());
        })).orElseDo(() -> routingContext.response()
      .setStatusCode(400)
      .end("No Path Provided, bruv."));
  }

  private JsonObject getPayLoad(AsyncResult<Message<JsonObject>> connectionResult, RoutingContext routingContext) {
    if (connectionResult.succeeded()) {
      JsonObject message = connectionResult.result().body();
      if (message.getInteger("id") == NOT_FOUND) {
        routingContext.response().setStatusCode(404);
        return getFailure();
      } else {
        routingContext.response().setStatusCode(200);
        String content = message.getString("content");
        return new JsonObject()
          .put("success", true)
          .put("id", message.getInteger("id"))
          .put("markdown", content)
          .put("html", Processor.process(content));
      }
    } else {
      routingContext.response().setStatusCode(500);
      return getFailure();
    }
  }

  private JsonObject getFailure() {
    return new JsonObject()
      .put("success", false);
  }

  @Override
  public APIPageHandler applyConfiguration(Config config) {
    this.config = config;
    return this;
  }
}
