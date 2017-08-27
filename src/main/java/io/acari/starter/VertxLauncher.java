package io.acari.starter;

import com.google.inject.Guice;
import com.google.inject.Injector;
import io.vertx.core.Future;

public class VertxLauncher {

  public static void main(String... args){
    Injector injector = Guice.createInjector(new VertxModule());
    VerticalOrchestrator verticalOrchestrator = injector.getInstance(VerticalOrchestrator.class);
    verticalOrchestrator.start(Future.future());
  }
}
