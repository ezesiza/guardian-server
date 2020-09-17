import { FruitRole } from 'src/fruits/fruit.role-enum';
import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
  } from 'typeorm';

  
  @Entity()
  @Unique(['username'])
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    username: string;
  
    @Column()
    password: string;
  
  
    @Column()
    role: FruitRole;
 
  
    async validatePassword(password: string): Promise<void> {
    //   const hash = await Crypto.hash(password, this.salt);
    //   return hash === this.password;
    }
  }
  