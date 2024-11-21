import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import  { User }  from 'src/users/entities/user.entity/user.entity'

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    return user;
  },
);
