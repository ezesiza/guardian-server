 
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IRoleStorage } from 'src/auth/RoleStorage';
 
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
 
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler()); // The role group information obtained from the controller annotation.
    if (!roles) {
      return true;
    }
    const permission = IRoleStorage.grants;
    if(roles.includes('ADMIN')){
        
    }


    // const request = context.switchToHttp().getRequest();
    //      const hasRole = () => user.roles.some((role) => roles.includes(role)); // Whether to match the role
    // return user && user.roles && hasRole();
    return true;
  }
}