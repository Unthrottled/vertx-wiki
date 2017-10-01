package io.acari.auth;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class AuthConfigs {
  private static Properties properties;

  static {
    try (InputStream is = AuthConfigs.class.getResourceAsStream("/db-configs.properties")) {
      properties = new Properties();
      properties.load(is);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public enum Configs {
    CREATE_SCHEMA("create-pages-table"),
    ALL_PAGES("all-pages"),
    ALL_PAGES_DATA("all-pages-data"),
    GET_PAGE("get-page"),
    PAGE_EXISTS("page-exists"),
    CREATE_PAGE("create-page"),
    SAVE_PAGE("save-page"),
    DELETE_PAGE("delete-page");

    private final String value;

    Configs(String butt) {
      this.value = properties.getProperty(butt);
    }

    public String getValue() {
      return value;
    }
  }

}

