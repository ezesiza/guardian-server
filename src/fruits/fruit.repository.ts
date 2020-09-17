import { Fruit } from './fruit.entity';
import { EntityRepository, Repository } from 'typeorm';
import { FruitDataType } from './create-fruit.dto';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { FruitType } from './fruit.role-enum';

@EntityRepository(Fruit)
export class FruitRepository extends Repository<Fruit> {
  private logger = new Logger('FruitRepository');

  async getFruits(): Promise<Fruit[]> {
    const query = this.createQueryBuilder('fruit');

    try {
      const fruits = await query.getMany();
      return fruits;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getFruitByType(category: FruitType): Promise<Fruit[]> {
    const query = this.createQueryBuilder('fruit');
    query.where('fruit.fruittype=:type', { type: category });
    try {
      const types = await query.getMany();
      return types;
    } catch (error) {
      this.logger.error(
        `Failed to get type for category "${query}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createFruit(createFruitDto: FruitDataType): Promise<Fruit> {
    const { name, description, fruittype, role, userId } = createFruitDto;

    const fruit = new Fruit();
    fruit.name = name;
    fruit.description = description;
    fruit.role = role;
    fruit.fruittype = fruittype;
    fruit.userId = userId;

    try {
      await fruit.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return fruit;
  }
}
