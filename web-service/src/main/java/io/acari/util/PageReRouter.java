package io.acari.util;

import io.vertx.ext.web.RoutingContext;

public class PageReRouter {

  public static void reRoute(RoutingContext routingContext, String pageName) {
    toPlace(routingContext, "/wiki/" + pageName);
  }

  public static void reRouteHome(RoutingContext routingContext) {
    toPlace(routingContext, "/");
  }

  private static void toPlace(RoutingContext routingContext, String place) {
    routingContext.response()
      .setStatusCode(303)
      .putHeader("Location", place)
      .end();
  }
}
