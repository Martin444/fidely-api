"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const user_service_1 = require("../../user/user.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        console.log(email);
        const user = await this.usersService.findByEmail(email);
        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password);
            if (isMatch) {
                const { password } = user, result = __rest(user, ["password"]);
                return result;
            }
            else {
                throw new common_1.UnauthorizedException('Contraseña no válida');
            }
        }
        else {
            throw new common_1.UnauthorizedException('No se encontró un usuario con este email');
        }
    }
    async login(user) {
        console.log(user['user']);
        const payload = { username: user['user']['role'], sub: user['user']['id'] };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async registerUser(userData) {
        try {
            const userRegister = await this.usersService.create(userData);
            const payload = {
                username: userRegister.role,
                sub: userRegister.id,
            };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async loginSocial(userData) {
        return this.usersService
            .findOne(userData.id)
            .then((user) => {
            if (user) {
                const payload = { username: user.role, sub: user.id };
                return {
                    access_token: this.jwtService.sign(payload),
                };
            }
            else {
                return this.registerUserSocial(userData);
            }
        })
            .catch((err) => {
            if (err.status === 404) {
                return this.registerUserSocial(userData);
            }
            console.log('coltala', err.status);
        });
    }
    async registerUserSocial(userData) {
        const userRegister = await this.usersService.createOfSocial(userData);
        const payload = { username: userRegister.role, sub: userRegister.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map