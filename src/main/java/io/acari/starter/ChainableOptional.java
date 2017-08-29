package io.acari.starter;

import java.util.Optional;
import java.util.function.Consumer;

public class ChainableOptional<T> {
  private Optional<T> optional;

  private ChainableOptional(Optional<T> optional) {
    this.optional = optional;
  }

  public static <T> ChainableOptional<T> of(T optional) {
    return new ChainableOptional<>(Optional.of(optional));
  }

  public static <T> ChainableOptional<T> ofNullable(T optional) {
    return new ChainableOptional<>(Optional.ofNullable(optional));
  }

  public ChainableOptional<T> ifPresent(Consumer<T> c) {
    optional.ifPresent(c);
    return this;
  }

  public ChainableOptional<T> ifNotPresent(Runnable r) {
    if (!optional.isPresent())
      r.run();
    return this;
  }
}
