package io.acari.core;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Queries {
  private static Properties properties;
  static {
    try(InputStream is = SqlQueries.class.getResourceAsStream("/db-queries.properties")){
      properties = new Properties();
      properties.load(is);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  String CONFIG_WIKIDB_JDBC_URL = "wikidb.jdbc.url";
  String CONFIG_WIKIDB_JDBC_DRIVER_CLASS = "wikidb.jdbc.driver_class";
  String CONFIG_WIKIDB_JDBC_MAX_POOL_SIZE = "wikidb.jdbc.max_pool_size";
  String CONFIG_WIKIDB_SQL_QUERIES_RESOURCE_FILE = "wikidb.sqlqueries.resource.file";
  String CONFIG_WIKIDB_QUEUE = "wikidb.queue";

  public enum SqlQueries {
    CREATE_SCHEMA("create-pages-table"),
    ALL_PAGES("create-pages-table"),
    CREATE_PAGE("create-pages-table"),
    SAVE_PAGE("create-pages-table"),
    DELETE_PAGE("create-pages-table");

    private final String value;

    public String getValue() {
      return value;
    }

    SqlQueries(String butt) {
      this.value = properties.getProperty(butt);
    }
  }

}
