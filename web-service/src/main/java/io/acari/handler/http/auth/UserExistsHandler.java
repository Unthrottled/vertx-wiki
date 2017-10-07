package io.acari.handler.http.auth;

import com.google.inject.Inject;
import io.acari.handler.http.api.BaseAPIPageHandler;
import io.vertx.core.AsyncResult;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserExistsHandler extends BaseAPIPageHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(UserExistsHandler.class);


  @Inject
  public UserExistsHandler(Vertx vertx) {
    super(vertx,
      "user-exists",
      (AsyncResult<Message<JsonObject>> connectionResult, RoutingContext routingContext, String pageName) -> {
        JsonObject message = connectionResult.result().body();
        routingContext.response().setStatusCode(200);
        return new JsonObject()
          .put("success", true)
          .put("exists", message.getBoolean("exists"))
          .put("name", pageName);

      });
  }
}
