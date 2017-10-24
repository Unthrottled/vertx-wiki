/**
 * Created by alex on 9/20/17.
 */
import {Component, EventEmitter, Input, NgZone, Output} from "@angular/core";
import "../../common/validation-field.htm";
import {TitleValidationService} from "./TitleValidation.service";
import {ValidationComponent} from "../../common/Validation.component";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'title-creation',
    template: require('../../common/validation-field.htm')
})
export class TitleCreationComponent extends ValidationComponent {

    constructor(private titleValidationService: TitleValidationService, private ngZone: NgZone) {
        super(ngZone);
        this.placeHolder = "Enter Page Title";
    }

    validateContent(content: string): Observable<boolean> {
        return this.titleValidationService.isValid(content);
    }

}
