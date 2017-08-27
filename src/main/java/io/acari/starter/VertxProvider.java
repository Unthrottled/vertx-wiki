package io.acari.starter;/*
 * Created by IntelliJ IDEA.
 * User: alex
 * Date: 8/27/17
 * Time: 4:54 PM
 */

import com.google.inject.Provider;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import io.vertx.core.Vertx;

public class VertxProvider implements Provider<Vertx> {

  public final Vertx vertx = Vertx.vertx();

  @Provides
  @Singleton
  public Vertx get() {
    return vertx;
  }
}
