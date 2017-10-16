package io.acari.handler.data;

import io.vertx.core.json.JsonObject;
import io.vertx.ext.mongo.MongoClient;

public class AllArchiveHandler extends BaseAllPageHandler {


  public AllArchiveHandler(MongoClient mongoClient) {
    super(mongoClient, "pageArchive", json -> new JsonObject()
        .put("name", json.getString("name"))
        .put("_id", json.getString("_id")));
  }

}
