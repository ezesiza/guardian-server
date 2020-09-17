import { ObjectType } from '@nestjs/graphql';
import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column
  } from 'typeorm';
  import {FruitRole, FruitType} from './fruit.role-enum'
  
  @Entity()
  @ObjectType()
  export class Fruit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({nullable:true})
    name: string;
 
    @Column({nullable:true})
    fruittype: FruitType;

    @Column({nullable:true})
    role: FruitRole;
  
    @Column({nullable:true})
    description: string;
  
    @Column({nullable:true})
    userId: number;
  }
  