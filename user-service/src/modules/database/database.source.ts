import { DataSource } from 'typeorm';
import '../../core/configs/env.config';
import * as process from 'process';
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    // migrations: [`${__dirname}/../**/*.migration{.ts,.js}`],
    synchronize: true,
});