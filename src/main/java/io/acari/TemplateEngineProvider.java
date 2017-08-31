package io.acari;/*
 * Created by IntelliJ IDEA.
 * User: alex
 * Date: 8/27/17
 * Time: 6:25 PM
 */

import com.google.inject.Provider;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import io.vertx.ext.web.templ.FreeMarkerTemplateEngine;
import io.vertx.ext.web.templ.TemplateEngine;

public class TemplateEngineProvider implements Provider<TemplateEngine> {
  private final FreeMarkerTemplateEngine templateEngine = FreeMarkerTemplateEngine.create();

  @Provides
  @Singleton
  public TemplateEngine get() {
    return templateEngine;
  }
}
