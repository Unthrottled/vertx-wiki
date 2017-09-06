package io.acari.handler.data;

import io.vertx.codegen.annotations.Fluent;
import io.vertx.codegen.annotations.ProxyGen;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;

@ProxyGen
public interface WikiDatabaseService {

  @Fluent
  WikiDatabaseService fetchAllPages(Handler<AsyncResult<JsonObject>> resultHandler);

  @Fluent
  WikiDatabaseService fetchPage(Handler<AsyncResult<JsonObject>> resultHandler);

  @Fluent
  WikiDatabaseService createPage(Handler<AsyncResult<JsonObject>> resultHandler);

  @Fluent
  WikiDatabaseService savePage(Handler<AsyncResult<JsonObject>> resultHandler);

  @Fluent
  WikiDatabaseService deletePage(Handler<AsyncResult<JsonObject>> resultHandler);
}
