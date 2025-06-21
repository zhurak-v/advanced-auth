import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString({ message: "Ім’я повинно бути рядком." })
  @IsNotEmpty({ message: "Ім’я обов’язкове для заповнення." })
  public full_name: string;

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
