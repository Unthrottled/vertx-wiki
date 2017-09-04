package io.acari.handler;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public enum Action {
  ALL_PAGES("all-pages"),
  GET_PAGE("get-page"),
  CREATE_PAGE("create-page"),
  SAVE_PAGE("save-page"),
  DELETE_PAGE("delete-page"),
  UNKNOWN("WE-AINT-FOUND-SHIT");

  private static Map<String, Action> ref;
  private String getAction(){
    return action;
  }
  public static Action of(String guy){
    return ref.getOrDefault(guy, UNKNOWN);
  }

  static {
    ref = Arrays.stream(Action.values())
      .collect(Collectors.toMap(Action::getAction, Function.identity()));
  }
  private String action;

  Action(String s) {
    action = s;
  }
}
