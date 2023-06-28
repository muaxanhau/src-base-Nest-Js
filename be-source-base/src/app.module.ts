import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { modules } from './modules';

@Module({
  imports: [
    ...modules,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'test_mysql_firsttime',
      entities,
      synchronize: true
    }),
  ],
})
export class AppModule { }
