package io.acari.handler.http.auth;

import io.acari.util.ChainableOptional;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.auth.User;
import io.vertx.ext.auth.mongo.MongoAuth;
import io.vertx.rx.java.ObservableFuture;
import io.vertx.rx.java.RxHelper;
import rx.Observable;
import rx.functions.Func1;

public class PrincipalGenerator {

  public Observable<JsonObject> generate(User user) {
    return getUserRole(user)
        .flatMap(this::getPermissions);
  }


  private Observable<String> getUserRole(User user) {
    ObservableFuture<Boolean> adminHandler = RxHelper.observableFuture();
    user.isAuthorised(MongoAuth.ROLE_PREFIX + "admin", adminHandler.toHandler());
    ObservableFuture<Boolean> editorHandler = RxHelper.observableFuture();
    user.isAuthorised(MongoAuth.ROLE_PREFIX + "editor", editorHandler.toHandler());
    ObservableFuture<Boolean> writerHandler = RxHelper.observableFuture();
    user.isAuthorised(MongoAuth.ROLE_PREFIX + "writer", writerHandler.toHandler());
    ObservableFuture<Boolean> readerHandler = RxHelper.observableFuture();
    user.isAuthorised(MongoAuth.ROLE_PREFIX + "reader", readerHandler.toHandler());
    return adminHandler.map(getMapper("admin"))
        .zipWith(editorHandler.map(getMapper("editor")), (a, b) -> a == null ? b : a)
        .zipWith(writerHandler.map(getMapper("writer")), (a, b) -> a == null ? b : a)
        .zipWith(readerHandler.map(getMapper("reader")), (a, b) -> a == null ? "reader" : a);
  }

  private Func1<? super Boolean, ? extends String> getMapper(String role) {
    return res ->
        ChainableOptional.of(res)
            .filter(hasRole -> hasRole)
            .map(has -> role)
            .orElse(null);
  }

  //todo put in persistence.
  private Observable<JsonObject> getPermissions(String userRole) {
    return Observable.fromCallable(() -> new JsonObject()
        .put("role", userRole)
        .put("canView", canView(userRole))
        .put("canCreate", canCreate(userRole))
        .put("canDelete", canDelete(userRole))
        .put("canUpdate", canUpdate(userRole)));
  }

  private Boolean canUpdate(String userRole) {
    switch (userRole) {
      case "admin":
      case "editor":
      case "writer":
        return true;
      default:
        return false;
    }
  }

  private Boolean canDelete(String userRole) {
    switch (userRole) {
      case "admin":
      case "editor":
        return true;
      default:
        return false;
    }
  }

  private Boolean canCreate(String userRole) {
    switch (userRole) {
      case "admin":
      case "editor":
      case "writer":
        return true;
      default:
        return false;
    }
  }

  private Boolean canView(String userRole) {
    switch (userRole) {
      case "admin":
      case "editor":
      case "writer":
      case "reader":
        return true;
      default:
        return false;
    }
  }
}
