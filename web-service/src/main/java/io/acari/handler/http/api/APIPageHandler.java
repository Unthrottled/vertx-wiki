package io.acari.handler.http.api;

import com.github.rjeschke.txtmark.Processor;
import com.google.inject.Inject;
import io.acari.util.ChainableOptional;
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
            .put("markdown", content)
            .put("lastModified", getLastModified(message))
            .put("html", Processor.process(content))//TODO: KEEL ME
            .put("name", pageName);
        }
      });
  }

  private static JsonObject getLastModified(JsonObject message) {
    return ChainableOptional.ofNullable(message.getJsonObject("lastModified"))
      .orElse(new JsonObject()
      .put("userName", "?????")
      .put("timeStamp", 0));
  }
}
