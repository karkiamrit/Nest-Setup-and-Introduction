import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JWTAuthGuard } from './jwt-auth.guard';

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,}),UsersModule,PassportModule,JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '60s' },
  }),PassportModule],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: JWTAuthGuard,
  },LocalStrategy],
  controllers: [AuthController],
})


export class AuthModule {}

