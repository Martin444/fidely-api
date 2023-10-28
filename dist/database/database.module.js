"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../config");
const typeorm_1 = require("@nestjs/typeorm");
const pg_1 = require("pg");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.default.KEY],
                useFactory: (configService) => {
                    try {
                        if (process.env.DYNO == 'web.1') {
                            return {
                                type: 'postgres',
                                url: configService.postgresUrl,
                                synchronize: true,
                                autoLoadEntities: true,
                                ssl: { rejectUnauthorized: false },
                            };
                        }
                        else {
                            return {
                                type: 'postgres',
                                database: configService.postgres.dbName,
                                port: configService.postgres.port,
                                password: configService.postgres.password,
                                user: configService.postgres.user,
                                host: configService.postgres.host,
                                synchronize: true,
                                autoLoadEntities: true,
                                ssl: false,
                            };
                        }
                    }
                    catch (e) {
                        throw new common_1.UnauthorizedException({
                            message: 'Hubo un error de integración de datos',
                        });
                    }
                },
            }),
        ],
        providers: [
            {
                provide: 'DATABASE_CONNECTION',
                useFactory: (configService) => {
                    try {
                        if (process.env.DYNO == 'web.1') {
                            const client = new pg_1.Client({
                                connectionString: configService.postgresUrl,
                                ssl: { rejectUnauthorized: false },
                            });
                            client.connect();
                            return client;
                        }
                        else {
                            const client = new pg_1.Client({
                                database: configService.postgres.dbName,
                                port: configService.postgres.port,
                                password: configService.postgres.password,
                                user: configService.postgres.user,
                                host: configService.postgres.host,
                                ssl: false,
                            });
                            client.connect();
                            return client;
                        }
                    }
                    catch (e) {
                        console.error(`Falló ${e}`);
                        throw new common_1.UnauthorizedException({
                            message: 'DB config error',
                        });
                    }
                },
                inject: [config_1.default.KEY],
            },
        ],
        exports: ['DATABASE_CONNECTION', typeorm_1.TypeOrmModule],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map