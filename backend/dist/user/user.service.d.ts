import { Model } from 'mongoose';
import { User, UserDocument } from 'src/model/user.schema';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    signUp(user: User): Promise<User>;
    signIn(user: User, jwt: JwtService): Promise<any>;
    getOne(email: string): Promise<User>;
}
