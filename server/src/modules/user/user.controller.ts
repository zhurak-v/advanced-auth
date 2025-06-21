import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly user_service: UserService) {}

  @Get(':email')
  async getUser(@Param('email') email: string) {
    return this.user_service.findByEmail(email);
  }

  @Get()
  async getAll() {
    return this.user_service.getAllUsers();
  }
}