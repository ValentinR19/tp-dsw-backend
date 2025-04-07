import appConfig from '@config-module/app.config';
import databaseConfig from '@config-module/database.config';
import { validationSchema } from '@config-module/validation.schema';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        host: configService.get<string>('host'),
        port: configService.get<number>('port'),
        username: configService.get<string>('username'),
        password: configService.get<string>('password'),
        database: configService.get<string>('database'),
        entities: ['dist/**/models/*/*{.entity.ts,.entity.js}'],
        synchronize: false,
        autoLoadEntities: true,
        logging: false,
        extra: {
          timezone: 'local',
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
