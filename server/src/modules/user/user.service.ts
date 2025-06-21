import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/modules/user/user.repository';
import { User } from '@/modules/user/interfaces';

@Injectable()
export class UserService {
  constructor(private readonly user_repository: UserRepository) {}

  public async findByEmail(email: string) {
        const user = this.user_repository.findByEmail(email);
        return user;
    }

  async createUser(data: User) {
    return this.user_repository.create({ data });
  }

  async getUserById(id: string){
    return this.user_repository.findById({ id });
  }

  async getAllUsers() {
    return this.user_repository.findAll();
  }

}
