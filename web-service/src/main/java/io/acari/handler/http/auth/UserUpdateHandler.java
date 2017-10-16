package io.acari.handler.http.auth;

import com.google.inject.Inject;
import io.acari.handler.Config;
import io.acari.handler.Configurable;
import io.acari.util.ChainableOptional;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.DeliveryOptions;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.auth.AuthProvider;
import io.vertx.ext.auth.User;
import io.vertx.ext.auth.jwt.JWTAuth;
import io.vertx.ext.web.RoutingContext;
import io.vertx.rx.java.ObservableFuture;
import io.vertx.rx.java.RxHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import rx.Observable;

public class UserUpdateHandler implements Handler<RoutingContext>, Configurable<Config, UserUpdateHandler> {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserUpdateHandler.class);
    private final Vertx vertx;
    private final PrincipalGenerator principalGenerator;
    private Config config;
    private TokenGenerator tokenGenerator;
    private AuthProvider authProvider;

    @Inject
    public UserUpdateHandler(Vertx vertx, PrincipalGenerator principalGenerator) {
        this.vertx = vertx;
        this.principalGenerator = principalGenerator;
    }

    public void handle(RoutingContext routingContext) {
        ChainableOptional.ofNullable(routingContext.user().principal().getBoolean("canView", false))
                .filter(b -> b)
                .ifPresent(canView -> {
                    JsonObject body = routingContext.getBodyAsJson();
                    ChainableOptional.ofNullable(body.getString("password"))
                            .ifPresent(password -> {
                                JsonObject credentials = new JsonObject()
                                        .put("username", routingContext.user().principal().getString("username"))
                                        .put("password", password);
                                authProvider.authenticate(credentials,
                                        authRes -> ChainableOptional.of(authRes)
                                                .filter(AsyncResult::succeeded)
                                                .map(AsyncResult::result)
                                                .ifPresent(user -> ChainableOptional.ofNullable(body.getString("role"))
                                                        .ifPresent(role -> {
                                                            DeliveryOptions deliveryOptions = Config.createDeliveryOptions("user-update");
                                                            JsonObject params = new JsonObject()
                                                                    .put("username", routingContext.user().principal().getString("username"))
                                                                    .put("role", role);
                                                            handle(routingContext, params, deliveryOptions, credentials);
                                                        }).orElseDo(() -> fourHundred(routingContext, "role")))
                                                .orElseDo(() -> {
                                                    LOGGER.warn("Thing Broke in Token Handler -> ", authRes.cause());
                                                    routingContext.response().setStatusCode(401).end();
                                                }));
                            }).orElseDo(()->fourHundred(routingContext, "password"));
                })
                .orElseDo(() -> routingContext
                        .response()
                        .setStatusCode(401)
                        .end());
    }


    public void handle(RoutingContext routingContext, JsonObject params, DeliveryOptions deliveryOptions, JsonObject credentials) {
        vertx.eventBus().<JsonObject>send(config.getDbQueueName(),
                params,
                deliveryOptions,
                connectionResult -> getPayLoad(connectionResult, routingContext, credentials)
                        .subscribe(princ -> routingContext.response()
                                .putHeader("Content-Type", "application/json")
                                .end(princ.encode())));
    }

    private Observable<JsonObject> getPayLoad(AsyncResult<Message<JsonObject>> connectionResult, RoutingContext routingContext, JsonObject credentials) {
        if (connectionResult.succeeded()) {
            routingContext.response().setStatusCode(201);
            ObservableFuture<User> newUserAuth = RxHelper.observableFuture();
            authProvider.authenticate(credentials, newUserAuth.toHandler());
            return newUserAuth.flatMap(user -> principalGenerator.generate(user)
                    .map(princ -> new JsonObject()
                            .put("token", tokenGenerator.generate(princ))
                            .put("principal", princ)
                            .put("success", true)));
        } else {
            LOGGER.warn("Awwww Snap!", connectionResult.cause());
            routingContext.response().setStatusCode(500);
            return Observable.fromCallable(() -> new JsonObject().put("success", false));
        }
    }

    private void fourHundred(RoutingContext routingContext, String name) {
        routingContext.response()
                .setStatusCode(400)
                .end("No " + name + " Provided, bruv.");
    }

    @Override
    public UserUpdateHandler applyConfiguration(Config config) {
        this.config = config;
        return this;
    }

    public UserUpdateHandler applyConfiguration(JWTAuth jwtAuth) {
        this.tokenGenerator = new TokenGenerator(jwtAuth);
        return this;
    }

    public UserUpdateHandler applyConfiguration(AuthProvider authProvider) {
        this.authProvider = authProvider;
        return this;
    }
}
