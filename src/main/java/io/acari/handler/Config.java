package io.acari.handler;

import io.vertx.core.eventbus.DeliveryOptions;

public class Config {

  public static DeliveryOptions createDeliveryOptions(String action){
    return new DeliveryOptions().addHeader("action", action);
  }

  private final String dbQueueName;

  public Config(String dbQueueName) {
    this.dbQueueName = dbQueueName;
  }

  public String getDbQueueName() {
    return dbQueueName;
  }
}
