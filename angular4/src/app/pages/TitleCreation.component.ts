/**
 * Created by alex on 9/20/17.
 */
import {Component, EventEmitter, Input, NgZone, Output} from "@angular/core";
import "./titleCreation.htm";
import {TitleValidationService} from "./TitleValidation.service";
@Component({
  selector: 'title-creation',
  templateUrl: './templates/titleCreation.htm'
})
export class TitleCreationComponent {
  private _content: string;
  private _validTitle: boolean = false;

  @Output()
  private onValidate = new EventEmitter();
  @Output()
  private onChange = new EventEmitter();

  constructor(private titleValidationService: TitleValidationService, private zone: NgZone) {
  }

  set content(value: string) {
    this._content = value;
    this.onChange.emit(this._content);
  }

  @Input()
  get content(): string {
    return this._content;
  }

  validate(title: String): void {
    let self = this;
    this.titleValidationService
      .isValid(title)
      .subscribe((valid: boolean) => self.zone.run(() => self.validTitle = valid),
        error => console.warn('OOHHHHH SHIT ' + error))
  }

  get validTitle(): boolean {
    return this._validTitle;
  }


  set validTitle(value: boolean) {
    this._validTitle = value;
    this.onValidate.emit(this._validTitle);
  }
}
