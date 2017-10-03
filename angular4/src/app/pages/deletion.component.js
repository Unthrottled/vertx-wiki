"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", {value: true});
/**
 * Created by alex on 6/7/17.
 */
var core_1 = require("@angular/core");
var UserPrincipal_model_1 = require("../auth/UserPrincipal.model");
var Permissions_component_1 = require("../auth/Permissions.component");
require("./deletion.component.htm");
var DeletionComponent = (function () {
  function DeletionComponent(token) {
    this.token = token;
    this.onClick = new core_1.EventEmitter();
  }

  Object.defineProperty(DeletionComponent.prototype, "cantDelete", {
    get: function () {
      return Permissions_component_1.Permissions.canActivate(this.token, 'delete')
        .map(function (canDo) {
          return !canDo;
        });
    },
    enumerable: true,
    configurable: true
  });
  DeletionComponent.prototype.clickyClick = function (value) {
    this.onClick.emit(value);
  };
  return DeletionComponent;
}());
__decorate([
  core_1.Output(),
  __metadata("design:type", Object)
], DeletionComponent.prototype, "onClick", void 0);
DeletionComponent = __decorate([
  core_1.Component({
    selector: 'deletion-component',
    templateUrl: "./templates/deletion.component.htm",
    styleUrls: []
  }),
  __metadata("design:paramtypes", [UserPrincipal_model_1.UserPrincipal])
], DeletionComponent);
exports.DeletionComponent = DeletionComponent;
//# sourceMappingURL=deletion.component.js.map
