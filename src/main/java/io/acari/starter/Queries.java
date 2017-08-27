package io.acari.starter;

public interface Queries {
  String SQL_CREATE_PAGES_TABLE = "create table if not exists Pages (Id integer identity primary key, Name varchar(255) unique, Content clob)";
  String SQL_GET_PAGE = "select Id, Content from Pages where Name = ?";
  String SQL_CREATE_PAGE = "insert into Pages values (NULL, ?, ?)";
  String SQL_SAVE_PAGE = "update Pages set Content = ? where Id = ?";
  String SQL_ALL_PAGES = "select Name from Pages";
  String SQL_DELETE_PAGE = "delete from Pages where Id = ?";
}
