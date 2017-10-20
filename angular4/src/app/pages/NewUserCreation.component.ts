/**
 * Created by alex on 9/20/17.
 */
import {Component, NgZone} from "@angular/core";
import "./validation-field.htm";
import {ValidationComponent} from "./Validation.component";
import {Observable} from "rxjs/Observable";
import {NewUserValidationService} from "./NewUserValidation.service";
@Component({
  selector: 'user-name-creation',
  template: require('./validation-field.htm')
})
export class NewUserCreationComponent extends ValidationComponent {

  validateContent(content: string): Observable<boolean> {
    return this.newUserValidationService.isValid(content);
  }

  constructor(private newUserValidationService: NewUserValidationService, private ngZone: NgZone) {
    super(ngZone);
    this.hideContent = true;
    this.placeHolder = "Username"
  }

}
