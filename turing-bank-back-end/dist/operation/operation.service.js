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
var _a;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const users_service_1 = require("../users/users.service");
let OperationsService = class OperationsService {
    constructor(operationModel, userService) {
        this.operationModel = operationModel;
        this.userService = userService;
    }
    findByClient(idClient) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.operationModel.findOne({
                $or: [{ origin: idClient }, { destin: idClient }],
            });
        });
    }
    create(createOperationDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOperation = new this.operationModel(createOperationDto);
            let findUserDestination, findUserOrigin;
            switch (createOperationDto.type) {
                case 0:
                    findUserDestination = yield this.userService.findOne(createOperationDto.destination);
                    yield this.userService.update({
                        _id: findUserDestination._id,
                        balance: findUserDestination.balance + createOperationDto.value,
                    }, createOperationDto.destination);
                    break;
                case 1:
                    const checkOriginBalance = yield this.userService.findOne(createOperationDto.origin);
                    if (!checkOriginBalance ||
                        checkOriginBalance.balance < createOperationDto.value) {
                        return new Promise((resolve, reject) => reject({ error: 'Insuficient balance' }));
                    }
                    findUserDestination = yield this.userService.findOne(createOperationDto.destination);
                    yield this.userService.update({
                        _id: findUserDestination._id,
                        balance: findUserDestination.balance + createOperationDto.value,
                    }, createOperationDto.destination);
                    findUserOrigin = yield this.userService.findOne(createOperationDto.origin);
                    yield this.userService.update({
                        _id: findUserOrigin._id,
                        balance: findUserOrigin.balance - createOperationDto.value,
                    }, createOperationDto.origin);
                    break;
                case 2:
                    let checkOriginBalanceWithDraw = yield this.userService.findOne(createOperationDto.origin);
                    if (!checkOriginBalanceWithDraw ||
                        checkOriginBalanceWithDraw.balance < createOperationDto.value) {
                        return new Promise((resolve, reject) => reject({ error: 'Insuficient balance' }));
                    }
                    findUserOrigin = yield this.userService.findOne(createOperationDto.origin);
                    yield this.userService.update({
                        _id: findUserOrigin._id,
                        balance: findUserOrigin.balance - createOperationDto.value,
                    }, createOperationDto.origin);
                    break;
                default:
                    return new Promise((resolve, reject) => reject({ error: 'Invalid Operation' }));
            }
            return yield newOperation.save();
        });
    }
};
OperationsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Operation')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, users_service_1.UsersService])
], OperationsService);
exports.OperationsService = OperationsService;
//# sourceMappingURL=operation.service.js.map