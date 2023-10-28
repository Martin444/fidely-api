"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('config', () => {
    return {
        database: {
            name: process.env.DATABASE_NAME,
            port: process.env.DATABASE_PORT,
        },
        postgresUrl: process.env.DATABASE_URL,
        postgres: {
            dbName: process.env.POSTGRES_DB,
            port: parseInt(process.env.POSTGRES_PORT, 10),
            password: process.env.POSTGRES_PASSWORD,
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
        },
        typeorm: {
            entity_dir: process.env.TYPEORM_ENTITIES,
            migrations: process.env.TYPEORM_MIGRATIONS,
            migrations_dir: process.env.TYPEORM_MIGRATIONS_DIR,
        },
        apiKey: process.env.API_KEY,
        jwtsecret: process.env.JWT_SECRET,
    };
});
//# sourceMappingURL=config.js.map