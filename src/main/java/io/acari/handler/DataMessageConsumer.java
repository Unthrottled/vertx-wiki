package io.acari.handler;

import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.jdbc.JDBCClient;

public class DataMessageConsumer implements Handler<Message<JsonObject>> {


  public DataMessageConsumer() {

  }

  @Override
  public void handle(Message<JsonObject> message) {

  }
}
