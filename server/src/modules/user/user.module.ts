import { Module } from "@nestjs/common";
import { UserRepository } from "@/modules/user/user.repository";
import { UserService } from "@/modules/user/user.service";
import { UserController } from "@/modules/user/user.controller";

@Module({
    controllers: [UserController],
    providers: [UserRepository, UserService],
    exports: [UserService]
})
export class UserModule {};