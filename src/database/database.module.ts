import { Module, Global, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from 'pg';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        try {
          console.info(`Se conecta a ${process.env.DYNO}`);
          if (process.env.DYNO == 'web.1') {
            return {
              type: 'postgres',
              url: configService.postgresUrl,
              synchronize: true,
              autoLoadEntities: true,
              ssl: { rejectUnauthorized: false },
            };
          } else {
            console.info(`IMPORT`);
            console.info(`DBNAME: ${configService.postgres.dbName}`);
            console.info(`USER: ${configService.postgres.user}`);
            console.info(`PASS: ${configService.postgres.password}`);
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
        } catch (e) {
          throw new UnauthorizedException({
            message: 'Hubo un error de integración de datos',
          });
        }
      },
    }),
  ],
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: (configService: ConfigType<typeof config>) => {
        try {
          if (process.env.DYNO == 'web.1') {
            const client = new Client({
              connectionString: configService.postgresUrl,
              // database: configService.postgres.dbName,
              // port: configService.postgres.port,
              // password: configService.postgres.password,
              // user: configService.postgres.user,
              // host: configService.postgres.host,
              ssl: { rejectUnauthorized: false },
            });
            client.connect();
            return client;
          } else {
            console.info(`PROVIDERS`);
            console.info(`DBNAME: ${configService.postgres.dbName}`);
            console.info(`USER: ${configService.postgres.user}`);
            console.info(`PASS: ${configService.postgres.password}`);
            const client = new Client({
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
        } catch (e) {
          console.error(`Falló ${e}`);
          throw new UnauthorizedException({
            message: 'DB config error',
          });
        }
      },
      inject: [config.KEY],
    },
  ],
  exports: ['DATABASE_CONNECTION', TypeOrmModule],
})
export class DatabaseModule {}
