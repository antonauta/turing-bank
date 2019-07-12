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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../infra/shared/user.decorator");
const create_operation_dto_1 = require("./dto/create.operation.dto");
const operation_service_1 = require("./operation.service");
const passport_1 = require("@nestjs/passport");
let OperationController = class OperationController {
    constructor(operationService) {
        this.operationService = operationService;
    }
    find(user, queryDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = user;
            return yield this.operationService.findByClient(_id, queryDate.initDate, queryDate.lastDate);
        });
    }
    create(user, createOperationDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.operationService.create(user._id, createOperationDto);
        });
    }
};
__decorate([
    common_1.Get('by_user'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiImplicitParam({ name: 'initDate' }),
    swagger_1.ApiImplicitParam({ name: 'lastDate' }),
    __param(0, user_decorator_1.User()), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "find", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, user_decorator_1.User()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_operation_dto_1.CreateOperationDto]),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "create", null);
OperationController = __decorate([
    swagger_1.ApiUseTags('main'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('operation'),
    __metadata("design:paramtypes", [operation_service_1.OperationsService])
], OperationController);
exports.OperationController = OperationController;
//# sourceMappingURL=operation.controller.js.map