/**
 * Created by alex on 9/17/17.
 */
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Router} from "@angular/router";
import "./edit.htm";
import {EditOptions} from "./EditOptions.model";

@Component({
    selector: 'edit-page',
    template: require('./edit.htm')
})
export class EditComponent {
    @Output()
    private contentChange = new EventEmitter();
    @Output()
    private onReset = new EventEmitter();
    @Output()
    private onSave = new EventEmitter();
    @Output()
    private onDelete = new EventEmitter();

    constructor(private router: Router) {
        this.options = {
            hideDelete: false
        }
    }

    private _enabled: boolean;

    @Input()
    get enabled(): boolean {
        return this._enabled;
    }

    set enabled(value: boolean) {
        this._enabled = value;
    }

    private _id: string;

    @Input()
    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    private _content: string;

    @Input()
    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
        this.contentChange.emit(this._content);
    }

    private _options: EditOptions;

    @Input()
    get options(): EditOptions {
        return this._options;
    }

    set options(value: EditOptions) {
        this._options = value;
    }

    save() {
        this.onSave.emit(true);
    }

    reset() {
        this.onReset.emit(true);
    }

    deleted() {
        this.onDelete.emit(true);
    }

}
