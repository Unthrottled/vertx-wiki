package io.acari.handler.data;

import io.vertx.ext.mongo.MongoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DeletionHandler extends BaseDeletionHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(DeletionHandler.class);

  public DeletionHandler(MongoClient mongoClient) {
    super(mongoClient, "pages", "pageArchive", "name");
  }
}
