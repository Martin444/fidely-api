declare const _default: (() => {
    database: {
        name: string;
        port: string;
    };
    postgresUrl: string;
    postgres: {
        dbName: string;
        port: number;
        password: string;
        user: string;
        host: string;
    };
    typeorm: {
        entity_dir: string;
        migrations: string;
        migrations_dir: string;
    };
    apiKey: string;
    jwtsecret: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    database: {
        name: string;
        port: string;
    };
    postgresUrl: string;
    postgres: {
        dbName: string;
        port: number;
        password: string;
        user: string;
        host: string;
    };
    typeorm: {
        entity_dir: string;
        migrations: string;
        migrations_dir: string;
    };
    apiKey: string;
    jwtsecret: string;
}>;
export default _default;
