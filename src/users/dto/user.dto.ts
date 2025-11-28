import { IsNotEmpty, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    passwordConfirmation: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }