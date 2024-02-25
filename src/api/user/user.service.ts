import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.model';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(data: CreateUserDto): Promise<UserDocument> {
    const user = await this.userModel.create(data);
    return user.save()
  }


  async getUser(id: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({_id: id});
    return user;
  }
}
