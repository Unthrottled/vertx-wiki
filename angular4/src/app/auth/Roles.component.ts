import {Component, EventEmitter, OnInit, Output} from "@angular/core";

@Component({
    selector: 'roles-input',
    templateUrl: 'templates/roles.template.htm'
})
export class RolesComponent implements OnInit {
    @Output()
    private permission = new EventEmitter<String[]>();

    ngOnInit(): void {
        this.permission.emit(this.permissions);
    }

    private roleMap = {
        "admin": "view create delete update".split(' '),
        "editor": "view create delete update".split(' '),
        "writer": "view create".split(' '),
        "reader": "view".split(' '),
    };
    roles: string[] = ["admin", "editor", "writer", "reader"];

    get permissions(): string[] {
        return this.roleMap[this.model.options];
    }

    model: any = {
        options: 'reader'
    };

}