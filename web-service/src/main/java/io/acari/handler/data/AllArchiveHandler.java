package io.acari.handler.data;

import io.vertx.ext.mongo.MongoClient;

public class AllArchiveHandler extends BaseAllPageHandler {


  public AllArchiveHandler(MongoClient mongoClient) {
    super(mongoClient, "pageArchive");
  }

}
