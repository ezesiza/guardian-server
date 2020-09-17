import {
  Body,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { FruitDataType, UserInputType } from './create-fruit.dto';
import { FruitRepository } from './fruit.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Fruit } from './fruit.entity';
import { FruitRole, FruitType } from './fruit.role-enum';

@Injectable()
export class FruitsService {
  UserRole = [FruitRole.FRUIT_JOHN, FruitRole.VEGETARIAN_MARY];

  constructor(
    @InjectRepository(FruitRepository)
    private fruitRepository: FruitRepository,
  ) {}

  async getFruits(): 
  Promise<Fruit[]> {
    return this.fruitRepository.getFruits();
  }

  async getFruitsByType(fruit:FruitType):Promise<Fruit[]>{
    return this.fruitRepository.getFruitByType(fruit)
  }

  async getFruitById(
    id: number,
  ): Promise<Fruit> {
    const found = await this.fruitRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Fruit with ID "${id}" not found`);
    }

    return found;
  }

  async createFruits(createFruitDto: FruitDataType): Promise<Fruit> {
    return this.fruitRepository.createFruit(createFruitDto);
  }

  async deleteFruits(id: number): Promise<any> {
    const result = await this.fruitRepository.delete({
      id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Fruit with ID "${id}" not found`);
    } 
    return result
    // return "fruit deleted"
  }

  async updateFruit(
    createFruitDto: FruitDataType,
    id: number,
  ): Promise<Fruit> {
    const fruit = await this.getFruitById(id);

    const { name, description, fruittype, role, userId } = createFruitDto;

    fruit.name = name;
    fruit.description = description;
    fruit.role = role;
    fruit.fruittype = fruittype;
    fruit.userId = userId;

    try {
      await this.fruitRepository.update(id, fruit);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return fruit;
  }

  @Post('/login')
  loginUser(@Body() user: UserInputType) {
    if (user.password === FruitRole.ADMIN) {
      return { user, msg: `This is an ADMIN User!` };
    } else if (this.UserRole.includes(user.password)) {
      return { user, msg: `${user.password} is a Fruity & Vegetable User!` };
    }
    return new ForbiddenException(`Something went wrong, verify your credentials`);
  }
}
