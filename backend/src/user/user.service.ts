import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/model/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signUp(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);

    const requestBody = {
      fullName: user.fullName,
      email: user.email,
      password: hash,
    };
    const newUser = new this.userModel(requestBody);

    return newUser.save();
  }

  async signIn(user: User, jwt: JwtService): Promise<any> {
    const foundUser = await this.userModel
      .findOne({ email: user.email })
      .exec();

    if (!foundUser) {
      return new HttpException(
        '유저이름과 패스워드가 일치하지 않습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { password } = foundUser;
    if (!bcrypt.compare(user.password, password)) {
      return new HttpException(
        '유저이름과 패스워드가 일치하지 않습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { email: user.email };

    return { token: jwt.sign(payload) };
  }

  async getOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
}
