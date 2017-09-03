package io.acari.handler.data;

import io.acari.handler.Action;
import io.acari.util.ChainableOptional;
import io.vertx.core.Handler;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DataMessageConsumer implements Handler<Message<JsonObject>> {
  private static final Logger LOGGER = LoggerFactory.getLogger(DataMessageConsumer.class);

  public DataMessageConsumer() {

  }

  @Override
  public void handle(Message<JsonObject> message) {
    ChainableOptional.ofNullable(message.headers().get("action"))
      .ifPresent(action -> {
        switch (Action.of(action)) {
          case UNKNOWN:
          default:
            message.fail(ErrorCodes.BAD_ACTION.ordinal(), "Bad Action: " + action);
          case GET_PAGE:
            break;
          case ALL_PAGES:
            break;
          case SAVE_PAGE:
            break;
          case CREATE_PAGE:
            break;
          case DELETE_PAGE:
            break;
        }
      })
      .orElseDo(() -> {
        LOGGER.error("Dummy set no action headers -> {},\n so I do not know what to do.");
        message.fail(ErrorCodes.NO_ACTION_SPECIFIED.ordinal(), "No Action Header Provided");
      });
  }
}
