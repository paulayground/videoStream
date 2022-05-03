import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/model/user.schema';
export declare class UserController {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    Signup(response: any, user: User): Promise<any>;
    SignIn(response: any, user: User): Promise<any>;
}
