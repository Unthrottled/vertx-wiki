package io.acari.handler.http.api;

import com.github.rjeschke.txtmark.Processor;
import com.google.inject.Inject;
import io.vertx.core.AsyncResult;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class APIPageHandler extends BaseAPIPageHandler {
  private static final String NOT_FOUND = "lulNup";
  private static final Logger LOGGER = LoggerFactory.getLogger(APIPageHandler.class);


  @Inject
  public APIPageHandler(Vertx vertx) {
    super(vertx,
      "get-page",
      (AsyncResult<Message<JsonObject>> connectionResult, RoutingContext routingContext, String pageName) -> {
        JsonObject message = connectionResult.result().body();
        if (NOT_FOUND.equals(message.getString("_id"))) {
          routingContext.response().setStatusCode(404);
          return getFailure();
        } else {
          routingContext.response().setStatusCode(200);
          String content = message.getString("content");
          return new JsonObject()
            .put("success", true)
            .put("id", message.getString("_id"))
            .put("markdown", content)
            .put("html", Processor.process(content))
            .put("name", pageName);
        }
      });
  }
}
