"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_module_1 = require("./infra/auth/auth.module");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const compression = require("compression");
const helmet = require("helmet");
const users_module_1 = require("./users/users.module");
const operation_module_1 = require("./operation/operation.module");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.setGlobalPrefix("/api/v1");
        app.use(compression());
        app.use(helmet());
        app.enableCors();
        const optionsUser = new swagger_1.DocumentBuilder()
            .setTitle('Endpoint da API com exemplos')
            .setBasePath('api/v1')
            .setDescription('API para cadastro de usuarios,autenticao,criacao e regras de negocios que envolvam o usuario e operacoes')
            .setVersion('1.0')
            .addBearerAuth()
            .addTag('main')
            .build();
        const documentUser = swagger_1.SwaggerModule.createDocument(app, optionsUser, { include: [users_module_1.UsersModule, operation_module_1.OperationModule, auth_module_1.AuthModule] });
        swagger_1.SwaggerModule.setup('docs/swagger', app, documentUser);
        yield app.listen(process.env.PORT || 3000);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map