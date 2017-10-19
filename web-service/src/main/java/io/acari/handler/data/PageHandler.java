package io.acari.handler.data;

import io.vertx.core.json.JsonObject;
import io.vertx.ext.mongo.MongoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PageHandler extends BasePageHandler {
  private static final Logger LOGGER = LoggerFactory.getLogger(PageHandler.class);


  public PageHandler(MongoClient mongoClient) {
    super(mongoClient, body -> body.getString("page")
        , pageName -> new JsonObject()
            .put("name", pageName), "pages");
  }
}
