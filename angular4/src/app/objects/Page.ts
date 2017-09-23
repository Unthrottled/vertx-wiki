/**
 * Created by alex on 6/13/17.
 */
export class Page {
    private message: String;
    private success: Boolean = false;

    private static didSucced(msg: String): Boolean {
        return msg.indexOf('Succeeded') >= 0;
    }

    constructor(private msg: String) {
        this.message = msg;
        this.success = Page.didSucced(this.message);
    }

    public getMessage(): String {
        return this.message;
    }

    public isSuccess(): Boolean {
        return this.success;
    }
}
