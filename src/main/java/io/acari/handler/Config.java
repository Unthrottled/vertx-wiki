package io.acari.handler;

import io.vertx.core.eventbus.DeliveryOptions;

public class Config {
  public static final DeliveryOptions deliveryOptions = new DeliveryOptions().addHeader("action", "all-pages");

  private final String dbQueueName;

  public Config(String dbQueueName) {
    this.dbQueueName = dbQueueName;
  }

  public String getDbQueueName() {
    return dbQueueName;
  }
}
