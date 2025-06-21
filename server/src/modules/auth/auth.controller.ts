import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuthService } from "@/modules/auth/auth.service";

import { RegisterDto, LoginDto } from "@/modules/auth/dto"

@Controller("auth")
export class AuthController {
  constructor(private readonly auth_service: AuthService) {}

  @Post('register')
  public async register(@Body() register_data: RegisterDto) {
    return this.auth_service.register(register_data);
  }

  @Post('login')
  public async login(@Body() login_data: LoginDto) {
    return this.auth_service.login(login_data);
  }
}
