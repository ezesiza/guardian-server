import { createParamDecorator } from '@nestjs/common';
import { UserInputType } from '../fruits/create-fruit.dto';

export const GetUser = createParamDecorator((data, req): UserInputType => {
  console.log('data: ', req.args)
  return req.user;
});
