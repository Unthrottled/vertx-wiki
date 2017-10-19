package io.acari.handler.http.api;

import com.google.inject.Inject;
import io.acari.handler.Config;
import io.acari.handler.Configurable;
import io.acari.handler.data.BaseAllPageHandler;
import io.acari.util.ChainableOptional;
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

public class APIAllPageDataHandler extends BaseAllPageDataHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(APIAllPageDataHandler.class);

  @Inject
  public APIAllPageDataHandler(Vertx vertx) {
    super(vertx, "all-pages");
  }

}
