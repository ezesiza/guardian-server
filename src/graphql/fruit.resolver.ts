import { GetUser as CurrentUser, GetUser } from '../auth/get-user.decorator';
import { Args,  Context,  Mutation, Query, Resolver } from '@nestjs/graphql';
import { FruitDataType, FruitInputType, UserInputType as UserType } from 'src/fruits/create-fruit.dto';
import { Fruit } from 'src/fruits/fruit.entity';
import { FruitRole, FruitType } from 'src/fruits/fruit.role-enum';
import { FruitsService } from 'src/fruits/fruit.service';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';


@Resolver(() => Fruit)
export class FruitResolver {
  constructor(private readonly fruitService: FruitsService) {}

  @Query(() => FruitDataType)
  async oneFruit(@Args('id') id: number) {
    return await this.fruitService.getFruitById(id);
  }

  @Query(() => [FruitDataType])
  async getFruits(): Promise<Fruit[]> {
    return this.fruitService.getFruits();
  }


  @Query(() => [FruitDataType])
  async getFruitsByType(@Args('fruit') fruit: FruitType): Promise<Fruit[]> {
    return this.fruitService.getFruitsByType(fruit);
  }

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Mutation(() => FruitDataType)
  async createFruit(@Args('fruit') fruit: FruitInputType) {
    return this.fruitService.createFruits(fruit);
  }

  @Mutation(() => FruitDataType)
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['FRUITJOHN', 'VEGETARIANMARY'])
  async updateFruit(
    @Context()
    @Args('id') id: number,
    @Args('fruit') fruit: FruitInputType,
  ) {
    return this.fruitService.updateFruit(fruit, id);
  }

  @Mutation(() => String)
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['FRUITJOHN', 'VEGETARIANMARY'])
  async deleteFruit(
    @GetUser()
    @Args('id') id: number) {
    return this.fruitService.deleteFruits(id);
  }
}
