package io.acari.handler.http.api;

import com.google.inject.Inject;
import io.vertx.core.Vertx;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class APIAllPageDataHandler extends BaseAllPageDataHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(APIAllPageDataHandler.class);

  @Inject
  public APIAllPageDataHandler(Vertx vertx) {
    super(vertx, "all-pages");
  }

}
