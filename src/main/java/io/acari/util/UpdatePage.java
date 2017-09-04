package io.acari.util;

import io.vertx.core.json.JsonObject;

public class UpdatePage {

  public static JsonObject update(String id, String markDown) {
    return new JsonObject()
      .put("id", id)
      .put("content", markDown);
  }
}
