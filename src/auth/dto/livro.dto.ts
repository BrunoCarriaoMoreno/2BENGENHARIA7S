/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */ 
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateLivroDto {
    @ApiProperty({ description: 'titulo do livro' })
    @IsString()
    title: string

    @ApiProperty({ description: 'data de publicação do livro'})
    @IsNotEmpty()
    @IsNumber()
    @Min(1000)
    anoPublicado: number;

    @ApiProperty({ description: 'preço do livro'})
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;
}

export class UpdateLivroDto extends PartialType(CreateLivroDto) {}
