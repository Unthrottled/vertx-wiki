package io.acari.handler.http.api;

import com.google.inject.Inject;
import io.vertx.core.Vertx;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class APIPageArchiveHandler extends APIBaseArchiveHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(APIPageArchiveHandler.class);


  @Inject
  public APIPageArchiveHandler(Vertx vertx) {
    super(vertx, "canDelete", "archive-page", "name");
  }

}
