import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { __module__(pascalCase)Controller } from './controllers/__module__(kebabCase).controller';
import { __module__(pascalCase)Service } from './services/__module__(kebabCase).service';
import { __module__(pascalCase) } from './entities/__module__(kebabCase).entity';
import { __module__(pascalCase)Repository } from './repositories/__module__(kebabCase).repository';

@Module({
  imports: [TypeOrmModule.forFeature([__module__(pascalCase)])],
  controllers: [__module__(pascalCase)Controller],
  providers: [__module__(pascalCase)Service, __module__(pascalCase)Repository],
  exports: [__module__(pascalCase)Service],
})
export class __module__(pascalCase)Module {}
