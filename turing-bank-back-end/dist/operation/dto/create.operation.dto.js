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
const swagger_1 = require("@nestjs/swagger");
class CreateOperationDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CreateOperationDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CreateOperationDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CreateOperationDto.prototype, "value", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Date)
], CreateOperationDto.prototype, "createAt", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateOperationDto.prototype, "origin", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateOperationDto.prototype, "destination", void 0);
exports.CreateOperationDto = CreateOperationDto;
//# sourceMappingURL=create.operation.dto.js.map