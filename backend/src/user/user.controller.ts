import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/model/user.schema';

@Controller('/api/v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/signUp')
  async Signup(@Res() response, @Body() user: User) {
    const newUser = await this.userService.signUp(user);

    return response.status(HttpStatus.CREATED).json({ newUser });
  }

  @Post('/signIn')
  async SignIn(@Res() response, @Body() user: User) {
    const token = await this.userService.signIn(user, this.jwtService);

    return response.status(HttpStatus.OK).json({ token });
  }
}
