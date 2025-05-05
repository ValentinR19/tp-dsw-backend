import appConfig from '@config-module/app.config';
import databaseConfig from '@config-module/database.config';
import { validationSchema } from '@config-module/validation.schema';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('127.0.0.1'),
        port: configService.get<number>('3306'),
        username: configService.get<string>('root'),
        password: configService.get<string>('root'),
        database: configService.get<string>('dsw-db'),
        entities: ['dist/**/models/*/*{.entity.ts,.entity.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
        extra: {
          timezone: 'local',
        },
      }),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
