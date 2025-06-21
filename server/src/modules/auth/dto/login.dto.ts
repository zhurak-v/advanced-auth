import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsString({ message: "Email повинен бути рядком." })
  @IsEmail({}, { message: "Некоректний формат email." })
  @IsNotEmpty({ message: "Email обов’язковий для заповнення." })
  public email: string;

  @IsString({ message: "Пароль повинен бути рядком." })
  @IsNotEmpty({ message: "Пароль обов’язковий для заповнення." })
  @MinLength(6, {
    message: "Пароль повинен містити щонайменше 6 символів.",
  })
  public password: string;
}
