"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by alex on 9/17/17.
 */
var core_1 = require("@angular/core");
var backend_service_1 = require("../../util/backend.service");
var TitleValidationService = /** @class */ (function () {
    function TitleValidationService(backendService) {
        this.backendService = backendService;
    }
    TitleValidationService.prototype.isValid = function (pageName) {
        return this.backendService
            .pageExists(pageName)
            .map(function (statusPayload) { return !statusPayload.exists; });
    };
    TitleValidationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [backend_service_1.BackendService])
    ], TitleValidationService);
    return TitleValidationService;
}());
exports.TitleValidationService = TitleValidationService;
//# sourceMappingURL=TitleValidation.service.js.map