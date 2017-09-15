/**
 * Created by alex on 9/15/17.
 */
export class User {
  private _username: String;
  private _password: String;


  constructor(private usrNm: String, private pswd: String) {
    this._username = usrNm;
    this._password = pswd;
  }

  get username(): String {
    return this._username;
  }

  get password(): String {
    return this._password;
  }
}
