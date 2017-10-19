package io.acari.handler.data;

import io.vertx.ext.mongo.MongoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ArchiveHandler extends BaseDeletionHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(ArchiveHandler.class);

  public ArchiveHandler(MongoClient mongoClient) {
    super(mongoClient, "pages", "pageArchive", "name");
  }
}
