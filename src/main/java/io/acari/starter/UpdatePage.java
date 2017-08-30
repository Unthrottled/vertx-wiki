package io.acari.starter;

import io.vertx.core.json.JsonArray;

public class UpdatePage {

    public static JsonArray update(String id, String markDown){
      return new JsonArray().add(id).add(markDown);
    }
}
