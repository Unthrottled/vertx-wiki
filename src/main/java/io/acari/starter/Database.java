package io.acari.starter;

import io.vertx.core.AsyncResult;
import io.vertx.core.Future;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.ext.sql.SQLClient;
import io.vertx.ext.sql.SQLConnection;

public interface Database {

  Future<Void> prepare(Vertx vertx);

  SQLClient executeQuery(Handler<AsyncResult<SQLConnection>> asyncResultHandler);
}
