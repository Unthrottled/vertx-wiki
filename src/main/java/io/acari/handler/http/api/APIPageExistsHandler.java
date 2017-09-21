package io.acari.handler.http.api;

import com.google.inject.Inject;
import io.vertx.core.AsyncResult;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class APIPageExistsHandler extends BaseAPIPageHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(APIPageExistsHandler.class);


  @Inject
  public APIPageExistsHandler(Vertx vertx) {
    super(vertx,
      "page-exists",
      (AsyncResult<Message<JsonObject>> connectionResult, RoutingContext routingContext, String pageName) -> {
        JsonObject message = connectionResult.result().body();
        routingContext.response().setStatusCode(200);
        return new JsonObject()
          .put("success", true)
          .put("exists", message.getBoolean("exits"))
          .put("name", pageName);

      });
  }
}
