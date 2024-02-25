import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_CONFIG } from '../../configs/constant.config';
import { UserService } from './user.service';
import { User, UserDocument } from './user.model';
import { GetListUserDto } from './dto/get-list-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller({
  version: [API_CONFIG.VERSION_V1],
  path: 'users',
})
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Get(':id')
  public async getUser(@Param('id') id: string): Promise<UserDocument> {
    const res = await this.userService.getUser(id);
    return res
  }

}
