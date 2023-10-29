import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    create(data: CreateUserDto): Promise<User>;
    createOfSocial(data: CreateUserDto): Promise<User>;
    findOne(id: string): Promise<{
        id: string;
        photoURL: string;
        name: string;
        email: string;
        phone: string;
        role: string;
        createAt: Date;
        updateAt: Date;
    }>;
    findByEmail(email: string): Promise<User>;
    update(id: string, changes: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    getadminUser(email: string): Promise<{
        message: string;
    }>;
    deleteAllusers(): Promise<void>;
}
