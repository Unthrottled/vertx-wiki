package io.acari.util;

import io.acari.auth.AuthConfigs;
import io.vertx.core.json.JsonObject;

public class MongoConfig {
  public static JsonObject getConfig() {
    return new JsonObject()
      .put("host", AuthConfigs.Configs.HOST.getValue())
      .put("port", Integer.parseInt(AuthConfigs.Configs.PORT.getValue()))
      ;
  }
}
