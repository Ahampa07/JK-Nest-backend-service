import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, Headers, UseGuards, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto/register.dto';
import { LoginDto } from './dto/login.dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity/user.entity';
import { CurrentUser } from './decorator/current-user.decorator';
import { RolesGuard } from 'src/roles/guard/roles.guard';
import { Roles } from 'src/roles/decorator/roles.decorator';
import { RoleEnum } from 'src/roles/enum/roles.enum';


@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(public service: AuthService) {}

  @Post('email/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerUserDto: RegisterDto) {
    return this.service.register(registerUserDto);
  }

  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res() res,
    @Headers() head,
  ) {
    const resData = await this.service.validateLogin(loginDto, req, head);
    const jwtCookie = resData?.data?.token || null;
    res.cookie('jwt', jwtCookie, { httpOnly: true });
    res.send(resData);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.admin, RoleEnum.editor, RoleEnum.viewer)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Patch('user/logout')
  @HttpCode(HttpStatus.OK)
  public async logout(
    @CurrentUser() user: User,
    @Res() res,
  ) {
    const respData = await this.service.logout(user);
    res.clearCookie('jwt');
    res.send(respData);
  }
}
