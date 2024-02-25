import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONFIG } from '../constant.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: DATABASE_CONFIG.uri,
        connectTimeoutMS: 10000 
      })
    })
  ],
})
export class DatabaseModule {}
