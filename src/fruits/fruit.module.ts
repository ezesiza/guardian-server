import { Module } from '@nestjs/common';
import { FruitsController } from './fruit.controller';
import { FruitsService } from './fruit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FruitRepository } from './fruit.repository';
import { FruitResolver } from 'src/graphql/fruit.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FruitRepository,
    ]),
  ],
  controllers: [FruitsController],
  providers: [FruitResolver, FruitsService],
})
export class FruitsModule {}
