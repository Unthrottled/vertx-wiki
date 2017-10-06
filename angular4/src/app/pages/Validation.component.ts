/**
 * Created by alex on 9/20/17.
 */
import {EventEmitter, Input, NgZone, Output} from "@angular/core";
import "./titleCreation.htm";
import {Observable} from "rxjs/Observable";

export abstract class ValidationComponent {
  private _content: string;
  private _validTitle: boolean = false;

  @Output()
  private onValidate = new EventEmitter();
  @Output()
  private onChange = new EventEmitter();

  constructor(private zone: NgZone) {
  }

  set content(value: string) {
    this._content = value;
    this.onChange.emit(this._content);
  }

  @Input()
  get content(): string {
    return this._content;
  }

  validate(title: string): void {
    let self = this;
    this.validateContent(title)
      .subscribe((valid: boolean) => self.zone.run(() => self.validTitle = valid),
        error => console.warn('OOHHHHH SHIT ' + error))
  }

  abstract validateContent(content: string): Observable<boolean>;

  get validTitle(): boolean {
    return this._validTitle;
  }


  set validTitle(value: boolean) {
    this._validTitle = value;
    this.onValidate.emit(this._validTitle);
  }
}
