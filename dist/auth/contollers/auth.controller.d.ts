import { Request } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(payload: Request): Promise<{
        access_token: string;
    }>;
    register(payload: CreateUserDto): Promise<{
        access_token: string;
    }>;
    loginSocial(payload: CreateUserDto): Promise<{
        access_token: string;
    } | {
        access_token: string;
    }>;
}
