package io.acari.handler;

public class Config {

  private final String dbQueueName;

  public Config(String dbQueueName) {
    this.dbQueueName = dbQueueName;
  }

  public String getDbQueueName() {
    return dbQueueName;
  }
}
