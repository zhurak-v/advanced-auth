import { Injectable } from "@nestjs/common";
import { UserRepository } from "@/modules/user/user.repository";
import { UserCreateInput } from "@/modules/user/interfaces";

@Injectable()
export class UserService {
  constructor(private readonly user_repository: UserRepository) {}

  public async findByEmail(email: string) {
    return this.user_repository.findByEmail(email);
  }

  async createUser(data: UserCreateInput) {
    return this.user_repository.create({ data });
  }

  async getUserById(id: string) {
    return this.user_repository.findByUniqueKeys({ id });
  }

  async getAllUsers() {
    return this.user_repository.findAll();
  }
}
