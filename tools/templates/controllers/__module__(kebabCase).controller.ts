import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CRUDBaseController } from 'kt-nestjs-base';
import { __module__(pascalCase)Service } from '../services/__module__(kebabCase).service';
import { Create__module__(pascalCase)Dto, Update__module__(pascalCase)Dto, __module__(pascalCase)ViewDto } from '../dtos';
import { __module__(pascalCase) } from '../entities/__module__(kebabCase).entity';

@Controller('__module__(kebabCase)s')
@ApiTags('__module__(pascalCase)')
export class __module__(pascalCase)Controller extends CRUDBaseController<__module__(pascalCase)>(Create__module__(pascalCase)Dto, Update__module__(pascalCase)Dto, __module__(pascalCase)ViewDto, __module__(pascalCase)) {
  constructor(private readonly service: __module__(pascalCase)Service) {
    super(service);
  }
}
