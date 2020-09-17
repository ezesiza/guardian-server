import {Extensions, Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import { FruitRole, FruitType } from './fruit.role-enum';

@ObjectType()
export class FruitDataType {
  @Field(
    ()=>ID)
  id:string;

  @Field()

  readonly name: string;

  @Field()
  readonly role: FruitRole;

  @Field()
  readonly fruittype: FruitType;

  @Field()
  readonly description: string;
   
  @Field({nullable:true})
  readonly userId: number;
}

@InputType()
export class FruitInputType {

  @Field({nullable:true})
  id:string;

  @Field()
  readonly name: string;

  @Field()
  readonly role: FruitRole;

  @Field()
  readonly fruittype: FruitType;

  @Field()
  readonly description: string;
   
  @Field({nullable:true})
  readonly userId: number;
}

@ObjectType()
export class UserInputType {

  @Field()
  readonly username: string;

  @Field()
  @Extensions({ role: FruitRole })
  readonly password: FruitRole;

}
