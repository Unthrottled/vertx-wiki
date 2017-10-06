/**
 * Created by alex on 9/20/17.
 */
import {Component, EventEmitter, Input, NgZone, Output} from "@angular/core";
import "./titleCreation.htm";
import {TitleValidationService} from "./TitleValidation.service";
import {ValidationComponent} from "./Validation.component";
import {Observable} from "rxjs/Observable";
@Component({
  selector: 'title-creation',
  templateUrl: './templates/titleCreation.htm'
})
export class TitleCreationComponent extends ValidationComponent {

  validateContent(content: string): Observable<boolean> {
    return this.titleValidationService.isValid(content);
  }
  constructor(private titleValidationService: TitleValidationService, private ngZone: NgZone) {
    super(ngZone);
  }

}
