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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
let UserService = class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async create(data) {
        const newUser = this.userRepo.create(data);
        const userCreate = await this.userRepo.findOne({
            where: { email: newUser.email },
        });
        if (userCreate) {
            throw new common_1.HttpException('Este usario ya se registró', 301);
        }
        const passhash = await bcrypt.hash(newUser.password, 10);
        newUser.password = passhash;
        newUser.id = (0, uuid_1.v4)();
        return this.userRepo.save(newUser);
    }
    async createOfSocial(data) {
        const newUser = this.userRepo.create(data);
        console.log(newUser);
        return this.userRepo.save(newUser);
    }
    async findOne(id) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User #${id} not found`);
        }
        const { password } = user, result = __rest(user, ["password"]);
        return result;
    }
    async findByEmail(email) {
        return await this.userRepo.findOne({ where: { email: email } });
    }
    async update(id, changes) {
        const user = await this.userRepo.findOne({ where: { id } });
        this.userRepo.merge(user, changes);
        return this.userRepo.save(user);
    }
    remove(id) {
        return this.userRepo.delete(id);
    }
    async getadminUser(email) {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new common_1.HttpException('Users not found', 302);
        }
        user.role = 'admin';
        await this.userRepo.save(user);
        return {
            message: 'User Admin success',
        };
    }
    async deleteAllusers() {
        const users = await this.userRepo.clear();
        return users;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map