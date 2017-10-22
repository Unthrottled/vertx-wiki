package io.acari.auth;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class DbConfigs {
  private static Properties properties;

  static {
    try (InputStream is = DbConfigs.class.getResourceAsStream("/db-configs.properties")) {
      properties = new Properties();
      properties.load(is);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public enum Configs {
    HOST("host"), PORT("port"), PASSWORD("password"), USERNAME("username");

    private final String value;

    Configs(String butt) {
      this.value = properties.getProperty(butt);
    }

    public String getValue() {
      return value;
    }
  }

}

