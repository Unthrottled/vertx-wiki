package io.acari.handler.data;

import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.mongo.MongoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Objects;

public class UserExistsHandler implements Handler<Message<JsonObject>> {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserExistsHandler.class);
    private final MongoClient mongoClient;

    public UserExistsHandler(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    @Override
    public void handle(Message<JsonObject> message) {
        ChainableOptional.ofNullable(message.body().getString("page"))//it's page cuz I'm a slob
                .ifPresent(pago -> {
                    JsonObject username = new JsonObject()
                            .put("username", pago);
                    mongoClient.findOne("user", username, username,
                            asyncResultHandler -> {
                                ChainableOptional.of(asyncResultHandler)
                                        .filter(AsyncResult::succeeded)
                                        .map(AsyncResult::result)
                                        .ifPresent(result -> ChainableOptional.ofNullable(result)
                                                .filter(Objects::nonNull)
                                                .ifPresent(res -> message.reply(getExists(true)))
                                                .orElseDo(() -> lulNup(message)))
                                        .orElseDo(() -> lulNup(message));
                            });
                }).orElseDo(() -> message.fail(400, "No Path Provided, bruv."));
    }

    private void lulNup(Message<JsonObject> message) {
        message.reply(getExists(false));
    }

    private JsonObject getExists(boolean value) {
        return new JsonObject()
                .put("exists", value);
    }
}
