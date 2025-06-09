import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivrosController } from './livros.controller';
import { LivrosService } from './livros.service';
import { Livro } from 'src/entities/livro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Livro])],
  controllers: [LivrosController],
  providers: [LivrosService],
})
export class LivrosModule {}
