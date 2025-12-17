import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createUser(registerUserDto: RegisterDto) {
    try {
      return await this.userModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictException('Email is already in use');
      }
      throw error;
    }
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  // user.service.ts
  async getUserById(id: string) {
    return await this.userModel.findOne({ _id: id });
  }
}
