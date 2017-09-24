package io.acari.handler;

import io.vertx.core.eventbus.DeliveryOptions;

public class Config {

  private final String dbQueueName;

  public Config(String dbQueueName) {
    this.dbQueueName = dbQueueName;
  }

  public static DeliveryOptions createDeliveryOptions(String action) {
    return new DeliveryOptions().addHeader("action", action);
  }

  public String getDbQueueName() {
    return dbQueueName;
  }
}
