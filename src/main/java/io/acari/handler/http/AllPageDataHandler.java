package io.acari.handler.http;

import com.google.inject.Inject;
import io.acari.core.TemplateRenderer;
import io.acari.handler.Config;
import io.acari.handler.Configurable;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.Message;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class AllPageDataHandler implements Handler<RoutingContext>, Configurable<AllPageDataHandler> {
  private static final Logger LOGGER = LoggerFactory.getLogger(AllPageDataHandler.class);

  private final Vertx vertx;
  private Config config;

  @Inject
  public AllPageDataHandler(Vertx vertx) {
    this.vertx = vertx;
  }

  public void handle(RoutingContext routingContext) {

    vertx.eventBus().<JsonObject>send(config.getDbQueueName(),
      new JsonObject(),
      Config.createDeliveryOptions("all-pages-data"), ar -> {
        JsonObject responseGuy = new JsonObject();
        getRoutingContext(responseGuy, routingContext, ar)
          .putHeader("Content-Type", "application/json")
          .end(responseGuy.encode());
      });
  }

  private HttpServerResponse getRoutingContext(JsonObject responseGuy, RoutingContext routingContext, AsyncResult<Message<JsonObject>> ar) {
    if (ar.succeeded()) {
      JsonArray pages = createPagesData(ar);
      responseGuy.put("success", true);
      responseGuy.put("pages", pages);
      return routingContext.response()
        .setStatusCode(200);
    } else {
      responseGuy.put("success", false);
      return routingContext.response()
        .setStatusCode(500);
    }
  }

  private JsonArray createPagesData(AsyncResult<Message<JsonObject>> ar) {
    return getBody(ar)
      .stream()
      .map(b->(JsonObject)b)
      .map(pageData -> new JsonObject()
        .put("id", pageData.getInteger("ID"))
        .put("data", pageData.getString("NAME")))
      .collect(JsonArray::new, JsonArray::add, JsonArray::addAll);
  }

  private JsonArray getBody(AsyncResult<Message<JsonObject>> ar) {
    return ar.result().body().getJsonArray("pages");
  }

  @Override
  public AllPageDataHandler applyConfiguration(Config config) {
    this.config = config;
    return this;
  }
}
