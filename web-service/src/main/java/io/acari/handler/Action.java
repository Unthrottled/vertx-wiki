package io.acari.handler;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public enum Action {
  ALL_PAGES("all-pages"),
  ALL_PAGES_ARCHIVE("all-pages-archive"),
  ALL_PAGES_DATA("all-pages-data"),
  GET_PAGE("get-page"),
  GET_PAGE_ARCHIVE("get-page-archive"),
  PAGE_EXISTS("page-exists"),
  USER_EXISTS("user-exists"),
  USER_UPDATE("user-update"),
  CREATE_PAGE("create-page"),
  SAVE_PAGE("save-page"),
  DELETE_PAGE("delete-page"),
  UNKNOWN("WE-AINT-FOUND-SHIT");

  private static Map<String, Action> ref;

  static {
    ref = Arrays.stream(Action.values())
      .collect(Collectors.toMap(Action::getAction, Function.identity()));
  }

  private String action;

  Action(String s) {
    action = s;
  }

  public static Action of(String guy) {
    return ref.getOrDefault(guy, UNKNOWN);
  }

  private String getAction() {
    return action;
  }
}
