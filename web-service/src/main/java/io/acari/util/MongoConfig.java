package io.acari.util;

import io.acari.auth.AuthConfigs;
import io.acari.auth.DbConfigs;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;

public class MongoConfig {
  public static JsonObject getConfig() {
    return new JsonObject()
        .put("hosts", new JsonArray()
            .add(new JsonObject()
                .put("host", "cluster0-shard-00-00-et7yh.mongodb.net")
                .put("port", 27017))
            .add(new JsonObject()
                .put("host", "cluster0-shard-00-01-et7yh.mongodb.net")
                .put("port", 27017))
            .add(new JsonObject()
                .put("host", "cluster0-shard-00-02-et7yh.mongodb.net")
                .put("port", 27017)))
        .put("maxPoolSize", 30)
        .put("replicaSet", "Cluster0-shard-0")
        .put("authSource", "admin")
        .put("username", DbConfigs.Configs.USERNAME.getValue())
        .put("password", DbConfigs.Configs.PASSWORD.getValue())
        .put("keepAlive",true)
        .put("connectionTimoutMS", 300000)
        .put("socketTimoutMS", 100000)
        .put("serverSelectionTimeoutMS", 300000)
        ;
  }

}
