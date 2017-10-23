package io.acari.util;

import io.acari.auth.DbConfigs;
import io.vertx.core.json.JsonObject;

public class MongoConfig {
  public static JsonObject getConfig() {
    return new JsonObject()
      .put("host", DbConfigs.Configs.HOST.getValue())
      .put("port", Integer.parseInt(DbConfigs.Configs.PORT.getValue()))
      .put("maxPoolSize", 30)
      ;
  }

}
