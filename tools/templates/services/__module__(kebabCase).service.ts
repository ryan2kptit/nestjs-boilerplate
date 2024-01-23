import { Injectable } from '@nestjs/common';
import { CRUDBaseService } from 'kt-nestjs-base';
import { __module__(pascalCase) } from '../entities/__module__(kebabCase).entity';
import { __module__(pascalCase)Repository } from '../repositories/__module__(kebabCase).repository';

@Injectable()
export class __module__(pascalCase)Service extends CRUDBaseService<__module__(pascalCase)>(__module__(pascalCase)Repository) {}
