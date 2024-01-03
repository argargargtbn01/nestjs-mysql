import { Controller, Post, UseGuards, Req, Get, Body } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { SignupDto } from './dto/sign-up.dto';
import { FirebaseAuthGuard } from './guard/firebase-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signup(@Body() signupDto: SignupDto): Promise<any> {
    return this.authService.signup(signupDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<any> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req): Promise<any> {
    return req.user;
  }
  @UseGuards(FirebaseAuthGuard)
  @Get('authenticate')
  async authenticate(@Req() request: Request): Promise<any> {
    const user = request['user'];
    return this.authService.authenticate(user);
  }

  @Post('')
  async createRoleUser(@Body() obj): Promise<any> {
    return this.authService.createRoleUser(obj);
  }
}
