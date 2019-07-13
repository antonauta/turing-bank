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
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../infra/shared/user.decorator");
const update_user_dto_1 = require("./dto/update.user.dto");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.findAll();
        });
    }
    findUserByAccount(account) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.findByAccount(account);
        });
    }
    update(user, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.update(updateUserDto, user._id);
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiImplicitParam({ name: 'account' }),
    common_1.Get('/account/:account'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Param('account')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUserByAccount", null);
__decorate([
    common_1.Put('user'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, user_decorator_1.User()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
UsersController = __decorate([
    swagger_1.ApiUseTags('main'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map