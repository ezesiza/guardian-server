import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { FruitsModule } from './fruits/fruit.module';

@Module({
  imports: [
    FruitsModule,
    TypeOrmModule.forRoot(typeOrmConfig), 
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
