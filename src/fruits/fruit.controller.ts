import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  ForbiddenException,
} from '@nestjs/common';
import { FruitsService } from './fruit.service';
import { FruitDataType, UserInputType } from './create-fruit.dto';
import { Fruit } from './fruit.entity';
import { FruitRole } from './fruit.role-enum';

@Controller('fruits')
export class FruitsController {
  UserRole = [FruitRole.FRUIT_JOHN, FruitRole.VEGETARIAN_MARY];
  constructor(private fruitsService: FruitsService) {}

  @Post('/login')
  loginUser(@Body() user: UserInputType) {
    if (user.password === FruitRole.ADMIN) {
      return { user, msg: `This is an ADMIN User!` };
    } else if (this.UserRole.includes(user.password)) {
      return { user, msg: `${user.password} is a Fruity & Vegetable User!` };
    }
    return new ForbiddenException(`Something went wrong, verify your credentials`);
  }

  @Get('/all')
  getFruits(): Promise<Fruit[]> {
    return this.fruitsService.getFruits();
  }

  @Get('/:id')
  getFruitsById(@Param('id', ParseIntPipe) id: number): Promise<Fruit> {
    return this.fruitsService.getFruitById(id);
  }

  @Post()
  createFruit(@Body() createFruitDto: FruitDataType): Promise<Fruit> {
    console.log(createFruitDto);
    return this.fruitsService.createFruits(createFruitDto);
  }

  @Delete('/:id')
  deleteFruit(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.fruitsService.deleteFruits(id);
  }

  @Patch('/:id/role')
  updateFruitStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() createFruitDto: FruitDataType,
  ): Promise<Fruit> {
    return this.fruitsService.updateFruit(createFruitDto, id);
  }
}
