package io.acari.util;

import io.vertx.core.json.JsonObject;

public class NewPage {
  public static JsonObject create(String pageName, String markDown) {
    return new JsonObject()
      .put("name", pageName)
      .put("content", markDown);
  }
}
