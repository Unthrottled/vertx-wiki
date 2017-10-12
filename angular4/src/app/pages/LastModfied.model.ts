
export class LastModified {
  private _userName: string;
  private _timeStamp: Date;


  constructor(response: any) {
    this._userName = response.userName;
    this._timeStamp = new Date(response.timeStamp);
  }


  get userName(): string {
    return this._userName;
  }

  get timeStamp(): Date {
    return this._timeStamp;
  }
}
