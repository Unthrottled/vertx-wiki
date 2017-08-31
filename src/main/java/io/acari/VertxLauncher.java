package io.acari;

import com.google.inject.Guice;
import com.google.inject.Injector;
import io.acari.util.inject.VerticalOrchestrator;
import io.acari.util.inject.VertxModule;
import io.vertx.core.Future;

public class VertxLauncher {

  public static void main(String... args){
    Injector injector = Guice.createInjector(new VertxModule());
    VerticalOrchestrator verticalOrchestrator = injector.getInstance(VerticalOrchestrator.class);
    verticalOrchestrator.start(Future.future());
  }
}
