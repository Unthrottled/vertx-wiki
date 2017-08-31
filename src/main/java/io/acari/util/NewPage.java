package io.acari.util;

import io.vertx.core.json.JsonArray;

public class NewPage {
  public static JsonArray create(String pageName, String markDown){
    return new JsonArray().add(pageName).add(markDown);
  }
}
