package io.acari.handler.http.api;

import com.google.inject.Inject;
import io.acari.handler.Config;
import io.acari.handler.Configurable;
import io.acari.util.ChainableOptional;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.DeliveryOptions;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class APIPageArchiveHandler extends APIBaseArchiveHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(APIPageArchiveHandler.class);


  @Inject
  public APIPageArchiveHandler(Vertx vertx) {
    super(vertx, "canDelete","archive-page","name");
  }

}
