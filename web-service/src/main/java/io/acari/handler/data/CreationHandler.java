package io.acari.handler.data;

import com.mongodb.MongoWriteException;
import com.mongodb.WriteError;
import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.mongo.MongoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;

public class CreationHandler implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(CreationHandler.class);

  private final MongoClient mongoClient;

  public CreationHandler(MongoClient mongoClient) {
    this.mongoClient = mongoClient;
  }

  @Override
  public void handle(Message<JsonObject> message) {
    JsonObject request = message.body();
    ChainableOptional.ofNullable(request.getString("name"))
        .ifPresent(name -> ChainableOptional.ofNullable(request.getString("content"))
            .ifPresent(content ->
                ChainableOptional.ofNullable(request.getString("userName"))
                    .ifPresent(userName -> mongoClient.save("pages", new JsonObject()
                            .put("name", name)
                            .put("content", content)
                            .put("lastModified", new JsonObject()
                                .put("userName", userName)
                                .put("timeStamp", Instant.now().toEpochMilli())),
                        aConn -> {
                          ChainableOptional.of(aConn)
                              .filter(AsyncResult::succeeded)
                              .ifPresent(ares -> message.reply(new JsonObject().put("status", "gewd")))
                              .orElseDo(() -> ChainableOptional.of(aConn.cause())
                                  .filter(e -> e instanceof MongoWriteException)
                                  .map(e -> (MongoWriteException) e)
                                  .map(MongoWriteException::getError)
                                  .map(WriteError::getCode)
                                  .filter(code -> code == 11000)
                                  .ifPresent(code -> message.fail(400, "Dup Key!"))
                                  .orElseDo(() -> {
                                    LOGGER.warn("aww snap", aConn.cause());
                                    message.fail(500, aConn.cause().getMessage());
                                  }));
                        }))
                    .orElseDo(() -> fourHundred(message, "No User Name Provided, Bruv.")))
            .orElseDo(() -> fourHundred(message, "No Title Provided, Bruv.")))
        .orElseDo(() -> fourHundred(message, "No Id Provided, Bruv."));
  }

  private void fourHundred(Message routingContext, String errorMessage) {
    routingContext.fail(400, errorMessage);
  }
}
