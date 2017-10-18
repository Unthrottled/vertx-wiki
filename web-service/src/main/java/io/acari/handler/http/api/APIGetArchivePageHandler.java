package io.acari.handler.http.api;

import com.google.inject.Inject;
import io.acari.handler.Config;
import io.acari.handler.Configurable;
import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.Message;
import io.vertx.core.eventbus.ReplyException;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class APIGetArchivePageHandler implements Handler<RoutingContext>, Configurable<Config, APIGetArchivePageHandler> {
    private static final Logger LOGGER = LoggerFactory.getLogger(APIGetArchivePageHandler.class);
    private final Vertx vertx;
    private Config config;


    @Inject
    public APIGetArchivePageHandler(Vertx vertx) {
        this.vertx = vertx;
    }

    protected static JsonObject getFailure() {
        return new JsonObject()
                .put("success", false);
    }

    public void handle(RoutingContext routingContext) {
        ChainableOptional.ofNullable(routingContext.getBodyAsJson().getString("_id"))
                .ifPresent(archiveId -> vertx.eventBus().<JsonObject>send(config.getDbQueueName(),
                        new JsonObject().put("_id", archiveId),
                        Config.createDeliveryOptions("get-page-archive"),
                        connectionResult -> routingContext.response()
                                .putHeader("Cache-Control", "no-store, no-cache")
                                .putHeader("Content-Type", "application/json")
                                .end(getPayLoad(connectionResult, routingContext).encode()))).orElseDo(() -> routingContext.response()
                .setStatusCode(400)
                .end("No _id Provided, bruv."));
    }

    private JsonObject getPayLoad(AsyncResult<Message<JsonObject>> connectionResult, RoutingContext routingContext) {
        if (connectionResult.succeeded()) {
            JsonObject message = connectionResult.result().body();
            routingContext.response().setStatusCode(200);
            String content = message.getString("content");
            return new JsonObject()
                    .put("success", true)
                    .put("markdown", content)
                    .put("lastModified", APIPageHandler.getLastModified(message))
                    .put("name", message.getString("name"));
        } else {
            routingContext.response().setStatusCode(ChainableOptional.ofNullable(connectionResult.cause())
                    .filter(throwable -> throwable instanceof ReplyException)
                    .map(throwable -> (ReplyException) throwable)
                    .map(ReplyException::failureCode)
                    .orElse(500));
            return getFailure();
        }
    }

    @Override
    public APIGetArchivePageHandler applyConfiguration(Config config) {
        this.config = config;
        return this;
    }
}
