import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: Request): Promise<{
        id: string;
        photoURL: string;
        name: string;
        email: string;
        phone: string;
        role: string;
        createAt: Date;
        updateAt: Date;
    }>;
    getAdminUseremail(email: string): Promise<{
        message: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    deleteall(): Promise<void>;
}
