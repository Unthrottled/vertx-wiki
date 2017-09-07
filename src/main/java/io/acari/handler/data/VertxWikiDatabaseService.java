package io.acari.handler.data;

import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;

public class VertxWikiDatabaseService implements WikiDatabaseService {




  @Override
  public WikiDatabaseService fetchAllPages(Handler<AsyncResult<JsonObject>> resultHandler) {
    return null;
  }

  @Override
  public WikiDatabaseService fetchPage(Handler<AsyncResult<JsonObject>> resultHandler) {
    return null;
  }

  @Override
  public WikiDatabaseService createPage(Handler<AsyncResult<JsonObject>> resultHandler) {
    return null;
  }

  @Override
  public WikiDatabaseService savePage(Handler<AsyncResult<JsonObject>> resultHandler) {
    return null;
  }

  @Override
  public WikiDatabaseService deletePage(Handler<AsyncResult<JsonObject>> resultHandler) {
    return null;
  }
}
