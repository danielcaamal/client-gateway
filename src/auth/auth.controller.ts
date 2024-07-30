import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from 'src/config';
import { LoginDto, RegisterDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { Token } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.client.send(
      { cmd: 'login' },
      {
        ...loginDto,
      },
    );
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.client.send(
      { cmd: 'register_user' },
      {
        ...registerDto,
      },
    );
  }

  @UseGuards(AuthGuard)
  @Post('verify-user')
  async verifyUser(@Token() token: string) {
    return this.client.send(
      { cmd: 'verify_user' },
      {
        token,
      },
    );
  }
}
