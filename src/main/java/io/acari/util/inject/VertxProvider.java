package io.acari.util.inject;/*
 * Created by IntelliJ IDEA.
 * User: alex
 * Date: 8/27/17
 * Time: 4:54 PM
 */

import com.google.inject.Provider;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import io.vertx.core.Vertx;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Singleton
public class VertxProvider implements Provider<Vertx> {
  private static final Logger LOGGER = LoggerFactory.getLogger(VertxProvider.class);
  public final Vertx vertx = Vertx.vertx();

  @Provides
  public Vertx get() {
    return vertx;
  }
}
