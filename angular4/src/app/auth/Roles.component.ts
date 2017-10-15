import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import './roles.template.htm'

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

    private _selectedRole: string = 'reader';

    @Input()
    get selectedRole(): string {
        return this._selectedRole;
    }

    set selectedRole(value: string) {
        this._selectedRole = value;
    }

    private roleMap = {
        "admin": "view create delete update".split(' '),
        "editor": "view create delete update".split(' '),
        "writer": "view create".split(' '),
        "reader": "view".split(' '),
    };
    roles: String[] = ["admin", "editor", "writer", "reader"];

    get permissions(): String[] {
        return this.roleMap[this.model.role];
    }

    model: any = {
        role: 'reader'
    };

    setRole(role: String){
        this.selectedRole = role;
        this.ngOnInit();
    }

}