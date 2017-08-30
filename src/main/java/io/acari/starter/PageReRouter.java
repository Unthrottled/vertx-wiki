package io.acari.starter;

import io.vertx.ext.web.RoutingContext;

public class PageReRouter {

  public static void reRoute(RoutingContext routingContext, String pageName){
    routingContext.response()
      .setStatusCode(303)
      .putHeader("Location", "/wiki/" + pageName)
      .end();
  }
}
