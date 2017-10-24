export class LastModified {
    constructor(response: any) {
        this._userName = response.userName;
        this._timeStamp = new Date(response.timeStamp);
    }

    private _userName: string;

    get userName(): string {
        return this._userName;
    }

    private _timeStamp: Date;

    get timeStamp(): Date {
        return this._timeStamp;
    }
}
