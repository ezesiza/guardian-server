import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');
console.log(dbConfig);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Corinthians14_',
  database: 'guardian',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
