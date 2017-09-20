/**
 * Created by alex on 9/17/17.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import "./edit.htm";
@Component({
  selector: 'edit-page',
  templateUrl: './templates/edit.htm'
})
export class EditComponent {
  private _enabled: boolean;
  private _id: string;
  private _content: string;

  @Output()
  private contentChange = new EventEmitter();

  @Output()
  private onReset = new EventEmitter();

  @Output()
  private onSave = new EventEmitter();

  constructor(private router: Router, private notificationService: NotificationsService) {
  }

  @Input()
  get id(): string {
    return this._id;
  }


  set id(value: string) {
    this._id = value;
  }

  @Input()
  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
  }

  set content(value: string) {
    this._content = value;
    this.contentChange.emit(this._content);
  }

  @Input()
  get content(): string {
    return this._content;
  }

  save(){
    this.onSave.emit(true);
  }

  reset(){
    this.onReset.emit(true);
  }

}
