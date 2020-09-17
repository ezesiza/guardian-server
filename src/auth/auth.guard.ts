import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserInputType } from '../fruits/create-fruit.dto';
import { FruitRole } from '../fruits/fruit.role-enum';

@Injectable()
export class AuthGuard implements CanActivate {
  UserRole = [FruitRole.ADMIN, FruitRole.FRUIT_JOHN, FruitRole.VEGETARIAN_MARY];
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    // console.log('Context****************************', ctx);
    if (!ctx.headers) {
      return false;
    }
    ctx.user = this.validateToken(ctx.headers);
    console.log(ctx)
    return true;
  }

  validateToken(user: UserInputType) {
    if (this.UserRole.includes(user.password) ) {
      return { user, msg: `This is an ADMIN User!` };
    } else if (this.UserRole.includes(user.password)) {
      return { user, msg: `${user.password} is a Fruity & Vegetable User!` };
    }
    return new ForbiddenException(
      `Something went wrong, verify your credentials`,
    );
  }
}
