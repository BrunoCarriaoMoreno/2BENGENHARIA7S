/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { isEmail, IsEmail, isNotEmpty, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ description: 'Nome do usuário '})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'email do usuário' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'senha do usuário'})
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}

export class LoginDto {
    @ApiProperty({ description: 'email do usuário' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'senha do usuário'})
    @IsNotEmpty()
    password: string;
}
