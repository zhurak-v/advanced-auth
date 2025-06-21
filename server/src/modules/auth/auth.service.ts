import * as argon2 from 'argon2';

import { UserService } from "@/modules/user/user.service";
import { ConflictException, NotFoundException, Injectable } from "@nestjs/common";

import { RegisterDto, LoginDto } from "@/modules/auth/dto";

@Injectable()
export class AuthService {
  constructor(private readonly user_service: UserService) {}

  public async register(register_data: RegisterDto) {
    const user = await this.user_service.findByEmail(register_data.email);

    if (user) {
      throw new ConflictException(
        "Реєстрація не вдалася. Користувач з таким email вже існує. Будь ласка, використовуйте інший email або увійдіть у систему."
      );
    }

    const password = await argon2.hash(register_data.password);

    const data = {
      full_name: register_data.full_name,
      email: register_data.email,
      password,
    };

    return this.user_service.createUser(data);
  }

  public async login(login_data: LoginDto) {
    const user = await this.user_service.findByEmail(login_data.email);

    if (!user) {
      throw new NotFoundException(`Користувача з email "${login_data.email}" не знайдено.`);
    }

    const is_match = await argon2.verify(user.password, login_data.password);

    if (is_match) {
      return {message: "true"}
    }
    return {message: "false"}
    
  }
}
