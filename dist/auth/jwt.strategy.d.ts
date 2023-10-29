import { Strategy } from 'passport-jwt';
import config from '../config';
import { ConfigType } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigType<typeof config>);
    validate(payload: any): Promise<{
        userId: any;
        username: any;
    }>;
}
export {};
