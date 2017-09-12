package io.acari.handler;

public interface Configurable<T, R> {

  R applyConfiguration(T config);
}
