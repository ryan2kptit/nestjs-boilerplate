import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { IPaginateParams, IResponseList } from '@/share/common/app.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(data: CreateUserDto): Promise<UserDocument> {
    const user = await this.userModel.create(data);
    return user.save();
  }

  async getUser(id: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ _id: id });
    if(!user) { 
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getListUser(params: IPaginateParams): Promise<IResponseList<UserDocument>> {
    const page = params.page && params.page > 0 ? Number(params.page) : 1;
    const pageSize = params.pageSize && params.pageSize > 0 ? Number(params.pageSize) : 10;
    const conditions: any = {};
    let sortOption: any = {};
    if (params.search) {
      conditions.name = { $regex: new RegExp(params.search, 'i') };
    }
    if (params.status) {
      conditions.status = Number(params.status);
    }

    if (params?.sortBy) {
      sortOption = {
        [params.sortBy]: params.sortOrder == 'desc' ? -1 : 1,
      };
    }

    const results = await this.userModel.aggregate([
      {
        $facet: {
          documents: [{ $match: conditions }, { $skip: (page - 1) * pageSize }, { $limit: pageSize }, { $sort: sortOption  }],
          totalCount: [{ $count: 'count' }],
        },
      },
    ]);

    const data = results[0].documents;
    const total = results[0].totalCount.length > 0 ? results[0].totalCount[0].count : 0;
    const totalPage = total % pageSize === 0 ? total / pageSize : Math.floor(total / pageSize) + 1;
    return {
      data,
      total,
      page,
      pageSize,
      totalPage,
    };
  }
}
