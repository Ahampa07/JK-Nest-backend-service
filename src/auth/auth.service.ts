import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto/register.dto';
import * as winston from 'winston';
import { IResponse, success } from 'src/utils/response';
import { JwtService } from '@nestjs/jwt'
import { Message } from 'src/utils/message';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<IResponse> {
    const savedUser = await this.usersService.findOne({ email: dto.email });

    winston.info('savedUser---------- %O', savedUser);

    if (savedUser) {
      throw new HttpException(
        JSON.stringify({
          message: Message.USER.USER_EXIST,
        }),
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (
      dto.password.length < 8 ||
      !dto.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      )
    ) {
      return success({}, Message.USER.WEAK_PASSWORD, HttpStatus.CREATED);
    }
    const user = await this.usersService.create({
      ...dto,
    });
    return success({ user }, Message.USER.CREATED, HttpStatus.CREATED);
  }

  async validateLogin(
    loginDto: LoginDto,
    req: Request,
    head: any,
  ): Promise<IResponse> {
    const user = await this.usersService.findOne({
      email: loginDto.email,
    });

    if (!user) {
      throw new HttpException(
        Message.USER.LOGIN_FAILED,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isValidPassword = await bcrypt.compare(
      loginDto?.password,
      user?.password,
    );
    if (isValidPassword) {
      const token = await this.jwtService.sign({
        id: user.id,
        role: user.role,
      });
      
      return success(
        {
          token: token,
          user: user,
        },
        Message.USER.LOGIN_SUCCESS,
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        Message.USER.LOGIN_FAILED,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async logout(user: User) {
    const savedUser = await this.usersService.findOne({ id: user.id });
    if (!savedUser) throw new ForbiddenException('User not found');
    return success(
      {},
      Message.USER.LOGOUT_SUCCESS,
      HttpStatus.OK,
    );
  }
}
