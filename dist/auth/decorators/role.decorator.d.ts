import { Role } from '../models/roles.model';
export declare const ROLES_KEY = "isPublic";
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
