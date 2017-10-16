package io.acari.handler.http.api;

import com.google.inject.Inject;
import io.vertx.core.Vertx;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class APIAllArchiveDataHandler extends BaseAllPageDataHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(APIAllArchiveDataHandler.class);

  @Inject
  public APIAllArchiveDataHandler(Vertx vertx) {
    super(vertx, "all-pages-archive");
  }

}
