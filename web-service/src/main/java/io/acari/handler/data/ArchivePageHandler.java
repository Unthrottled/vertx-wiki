package io.acari.handler.data;

import io.vertx.core.json.JsonObject;
import io.vertx.ext.mongo.MongoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ArchivePageHandler extends BasePageHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(ArchivePageHandler.class);


  public ArchivePageHandler(MongoClient mongoClient) {
    super(mongoClient, body -> body.getString("_id")
        , pageId -> new JsonObject()
            .put("_id", pageId), "pageArchive");
  }
}
