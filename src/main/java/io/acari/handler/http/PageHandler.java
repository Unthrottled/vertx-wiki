package io.acari.handler.http;

import com.github.rjeschke.txtmark.Processor;
import com.google.inject.Inject;
import io.acari.core.TemplateRenderer;
import io.acari.handler.Config;
import io.acari.handler.Configurable;
import io.acari.util.ChainableOptional;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;

public class PageHandler implements Handler<RoutingContext>, Configurable<PageHandler> {
  private static final Logger LOGGER = LoggerFactory.getLogger(PageHandler.class);
  private static final String EMPTY_PAGE_MARKDOWN =
    "# A new page\n" +
      "\n" +
      "Feel-free to write in Markdown!\n";

  private final Vertx vertx;
  private final ErrorHandler errorHandler;
  private final TemplateRenderer templateRenderer;
  private Config config;


  @Inject
  public PageHandler(Vertx vertx, ErrorHandler errorHandler, TemplateRenderer templateRenderer) {
    this.vertx = vertx;
    this.errorHandler = errorHandler;
    this.templateRenderer = templateRenderer;
  }

  @Override
  public void handle(RoutingContext routingContext) {
    ChainableOptional.ofNullable(routingContext.request().getParam("page"))
      .ifPresent(pago -> vertx.eventBus().<JsonObject>send(config.getDbQueueName(),
        new JsonObject().put("page", pago),
        Config.createDeliveryOptions("get-page"),
        connectionResult -> {
          if (connectionResult.succeeded()) {
            JsonObject messageReceieved = connectionResult.result().body();
            Integer id = messageReceieved.getInteger("id");
            String content = messageReceieved.getString("content");
            routingContext.put("id", id);
            routingContext.put("rawContent", content);
            routingContext.put("newPage", Boolean.valueOf(id == -1));
            routingContext.put("title", pago);
            String rawContent = routingContext.get("rawContent").toString();
            routingContext.put("content", Processor.process(rawContent));
            routingContext.put("timestamp", Instant.now().toString());
            templateRenderer.render(routingContext, "/page.ftl");
          } else {
            errorHandler.handle(routingContext, connectionResult);
          }
        })).orElseDo(() -> routingContext.response()
      .setStatusCode(400)
      .end("No Path Provided, bruv."));

  }

  @Override
  public PageHandler applyConfiguration(Config config) {
    this.config = config;
    return this;
  }
}
