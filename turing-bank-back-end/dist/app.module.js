"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const mongoose_1 = require("@nestjs/mongoose");
const operation_module_1 = require("./operation/operation.module");
const auth_module_1 = require("./infra/auth/auth.module");
const shared_module_1 = require("./infra/shared/shared.module");
const keys_1 = require("./config/keys");
const keysprod_1 = require("./config/keysprod");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [users_module_1.UsersModule, mongoose_1.MongooseModule.forRoot(process.env.NODE_ENV === 'PROD' ? keysprod_1.default.mongoURI : keys_1.default.mongoURI), operation_module_1.OperationModule, auth_module_1.AuthModule, shared_module_1.SharedModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map