import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../api/user/user.entity';
import { DATABASE_CONFIG } from '../constant.config';
import { databaseProviders } from './database.providers';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mongodb',
        host: DATABASE_CONFIG.host,
        port: DATABASE_CONFIG.port,
        username: DATABASE_CONFIG.username,
        password: DATABASE_CONFIG.password,
        database: DATABASE_CONFIG.database,
        entities: [
          UserEntity
        ],
        migrations: [__dirname + '/../../migrations/*.ts'],
        autoLoadEntities: true,
        synchronize: true,
        logging: DATABASE_CONFIG.logging,
      }),
    }),
  ],
  // providers: [...databaseProviders],
  // exports: [...databaseProviders],
})
export class DatabaseModule {}
