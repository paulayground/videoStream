import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UserService } from './user/user.service';

interface UserRequest extends Request {
  user: any;
}

@Injectable()
export class isAuthenticated implements NestMiddleware {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: UserRequest, res: Response, next: NextFunction) {
    try {
      if (
        !(
          req.headers.authorization &&
          req.headers.authorization.startsWith('Bearer')
        )
      ) {
        throw new HttpException('No token found', HttpStatus.NOT_FOUND);
      }

      console.log(req.headers)
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await this.jwt.verify(token);

      const user = await this.userService.getOne(decoded.email);
      if (!user) {
        throw new HttpException('권한 없음', HttpStatus.UNAUTHORIZED);
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
