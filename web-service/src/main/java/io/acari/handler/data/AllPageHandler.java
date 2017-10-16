package io.acari.handler.data;

import io.vertx.ext.mongo.MongoClient;

public class AllPageHandler extends BaseAllPageHandler {


  public AllPageHandler(MongoClient mongoClient) {
    super(mongoClient, "pages", jsonObject -> jsonObject.getString("name"));
  }

}
