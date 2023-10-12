import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,}),UsersModule,JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '60s' },
  }),],
  providers: [AuthService],
  controllers: [AuthController],
})


export class AuthModule {}

