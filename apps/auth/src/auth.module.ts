import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from '@app/common';

@Module({
  imports: [UsersModule, 
  LoggerModule,
  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      MONGODB_URI: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION: Joi.string().required(),
      PORT: Joi.number().required(),
    })
  }),
  JwtModule.registerAsync({ //to async configure the JwtModule
    useFactory: (configService: ConfigService) => ({
      //retreiving configuration values from .env file
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`
      }
    }),
    inject: [ConfigService], //injecting ConfigService to useFactory
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
