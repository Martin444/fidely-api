export declare class CreateUserDto {
    readonly id: string;
    readonly photoURL: string;
    readonly email: string;
    readonly name: string;
    readonly phone: string;
    readonly password: string;
    readonly role: string;
    readonly customerId: number;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
