package io.acari.handler.http.auth;

import io.vertx.core.json.JsonObject;
import io.vertx.ext.auth.jwt.JWTAuth;
import io.vertx.ext.auth.jwt.JWTOptions;

public class TokenGenerator {
  private final JWTAuth jwtAuth;

  public TokenGenerator(JWTAuth jwtAuth) {
    this.jwtAuth = jwtAuth;
  }

  public String generate(JsonObject principal){
    return jwtAuth.generateToken(
        principal,
        new JWTOptions()
            .setSubject("Wiki API")
            .setIssuer("Vert.x"));
  }
}
