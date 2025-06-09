/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity('livros')
export class Livro {
    @ApiProperty({ description: 'ID do livro'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'titulo do livro'})
    @Column()
    title: string

    @ApiProperty({ description: 'Data de publicação'})
    @Column()
    anoPublicado: number;

    @ApiProperty({ description: 'Preço do livro'})
    @Column('decimal', { precision: 10, scale: 2})
    price: number;
}