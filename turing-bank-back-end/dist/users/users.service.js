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
const bcrypt = require("bcrypt");
const mongoose_2 = require("@nestjs/mongoose");
const SALT_WORK_FACTOR = 10;
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    sanitizeUser(user) {
        const sanitized = user;
        delete sanitized['password'];
        return sanitized;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.find();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ _id: id });
        });
    }
    findByAccount(account) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ account });
        });
    }
    checkUser(cpf, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt.genSalt(SALT_WORK_FACTOR);
            const encryptedpwd = yield bcrypt.hash(password, salt);
            return yield this.userModel.findOne({ cpf, password: encryptedpwd });
        });
    }
    findByPayload(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cpf } = payload;
            return yield this.userModel.findOne({ cpf });
        });
    }
    findByLogin(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cpf, password } = userDTO;
            const user = yield this.userModel
                .findOne({ cpf })
                .select('cpf password agency account preferredName name');
            if (!user) {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
            }
            if (yield bcrypt.compare(password, user.password)) {
                return this.sanitizeUser(user);
            }
            else {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
    create(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cpf } = userDTO;
            const user = yield this.userModel.findOne({ cpf });
            if (user) {
                throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
            }
            const createdUser = new this.userModel(userDTO);
            yield createdUser.save();
            return this.sanitizeUser(createdUser);
        });
    }
    update(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOneAndUpdate({ _id: id }, user);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findByIdAndRemove(id);
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('User')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map