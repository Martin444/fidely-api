import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    registerUser(userData: CreateUserDto): Promise<{
        access_token: string;
    }>;
    loginSocial(userData: CreateUserDto): Promise<{
        access_token: string;
    } | {
        access_token: string;
    }>;
    registerUserSocial(userData: CreateUserDto): Promise<{
        access_token: string;
    }>;
}
