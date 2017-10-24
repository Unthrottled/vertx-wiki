/**
 * Created by alex on 9/20/17.
 */
import {EventEmitter, Input, NgZone, Output} from "@angular/core";
import "./validation-field.htm";
import {Observable} from "rxjs/Observable";

export abstract class ValidationComponent {
    @Output()
    private onValidate = new EventEmitter();
    @Output()
    private onChange = new EventEmitter();

    constructor(private zone: NgZone) {
    }

    private _content: string;

    @Input()
    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
        this.onChange.emit(this._content);
    }

    private _validTitle: boolean = false;

    get validTitle(): boolean {
        return this._validTitle;
    }

    set validTitle(value: boolean) {
        this._validTitle = value;
        this.onValidate.emit(this._validTitle);
    }

    private _hideContent: boolean = false;

    get hideContent(): boolean {
        return this._hideContent;
    }

    set hideContent(value: boolean) {
        this._hideContent = value;
    }

    private _placeHolder: string;

    get placeHolder(): string {
        return this._placeHolder;
    }

    set placeHolder(value: string) {
        this._placeHolder = value;
    }

    validate(title: string): void {
        let self = this;
        this.validateContent(title)
            .subscribe((valid: boolean) => self.zone.run(() => self.validTitle = valid),
                error => console.warn('OOHHHHH SHIT ' + error))
    }

    abstract validateContent(content: string): Observable<boolean>;
}
