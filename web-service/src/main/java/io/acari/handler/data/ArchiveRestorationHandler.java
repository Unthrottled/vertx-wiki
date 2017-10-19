package io.acari.handler.data;

import io.vertx.ext.mongo.MongoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ArchiveRestorationHandler extends BaseDeletionHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(ArchiveRestorationHandler.class);

  public ArchiveRestorationHandler(MongoClient mongoClient) {
    super(mongoClient, "pageArchive", "pages", "_id");
  }
}
