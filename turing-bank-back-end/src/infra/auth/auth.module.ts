import { UsersModule } from './../../users/users.module';
import { SharedModule } from '../shared/shared.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    SharedModule,
    UsersModule
  ],
  providers: [AuthService, JwtStrategy],
  exports: [ AuthService],
  controllers: [AuthController],
})
export class AuthModule {}