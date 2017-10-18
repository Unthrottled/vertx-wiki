package io.acari.handler.http.api;

import com.google.inject.Inject;
import io.vertx.core.Vertx;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class APIRestoreArchiveHandler extends APIBaseArchiveHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(APIRestoreArchiveHandler.class);


  @Inject
  public APIRestoreArchiveHandler(Vertx vertx) {
    super(vertx, "canCreate","restore-page","name");
  }

}
