package io.acari.handler;

public interface Configurable<T> {

  T applyConfiguration(Config config);
}
