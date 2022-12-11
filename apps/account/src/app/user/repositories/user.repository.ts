import { IUser } from '@finlab/interfaces';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { UserEntity } from '../entities/user.entity';
import { User } from '../models/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async createUser(user: UserEntity): Promise<IUser> {
    // eslint-disable-next-line new-cap
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async updateUser({ _id, ...rest }: UserEntity): Promise<UpdateWriteOpResult> {
    return await this.userModel.updateOne({ _id }, { $set: { ...rest } }).exec();
  }

  async findUser(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email }).exec() as IUser;
  }

  async findUserById(id: string): Promise<IUser> {
    return await this.userModel.findById(id).exec() as IUser;
  }

  async deleteUser(email: string): Promise<void> {
    await this.userModel.deleteOne({ email }).exec();
  }
}
