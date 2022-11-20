import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../entities/user.entity';
import { User } from '../models/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>
  ) {}

  async createUser(user: UserEntity): Promise<User> {
    const newUser = new this.UserModel(user);
    return await newUser.save();
  }

  async findUser(email: string): Promise<User> {
    return await this.UserModel.findOne({ email }).exec();
  }

  async deleteUser(email: string): Promise<void> {
    await this.UserModel.deleteOne({ email }).exec();
  }
}
