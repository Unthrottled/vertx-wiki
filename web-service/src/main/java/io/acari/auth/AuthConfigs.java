package io.acari.auth;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class AuthConfigs {
  private static Properties properties;

  static {
    try (InputStream is = AuthConfigs.class.getResourceAsStream("/auth-configs.properties")) {
      properties = new Properties();
      properties.load(is);
    } catch (IOException ignored) {
    }
  }

  public enum Configs {
    PASSWORD("password"), SSL_PASSWORD("ssl_keystore_password"), TYPE("type"), KEYSTORE("keystore"), SSL_KEYSTORE("ssl_keystore");

    private final String value;

    Configs(String butt) {
      this.value = properties.getProperty(butt);
    }

    public String getValue() {
      return value;
    }
  }

}

