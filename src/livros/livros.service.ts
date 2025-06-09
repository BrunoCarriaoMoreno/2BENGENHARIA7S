import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livro } from 'src/entities/livro.entity';
import { CreateLivroDto, UpdateLivroDto } from 'src/auth/dto/livro.dto';

@Injectable()
export class LivrosService {
  constructor(
    @InjectRepository(Livro)
    private livrosRepository: Repository<Livro>,
  ) {}

  async create(createLivroDto: CreateLivroDto): Promise<Livro> {
    const existingLivro = await this.livrosRepository.findOne({
      where: { title: createLivroDto.title },
    });

    if (existingLivro) {
      throw new ConflictException('livro ja cadastrado');
    }
    const livro = this.livrosRepository.create(createLivroDto);
    return this.livrosRepository.save(livro);
  }

  async findAll(): Promise<Livro[]> {
    return this.livrosRepository.find({
      order: { anoPublicado: 'DESC' },
    });
  }

  async findByTitle(title: string): Promise<Livro> {
    const livro = await this.livrosRepository.findOne({ where: { title } });
    if (!livro) {
      throw new NotFoundException('Livro não encontrado');
    }
    return livro;
  }

  async findOne(id: number): Promise<Livro> {
    const livro = await this.livrosRepository.findOne({ where: { id } });
    if (!livro) {
      throw new NotFoundException('Livro não encontrado');
    }
    return livro;
  }

  async update(id: number, updateLivroDto: UpdateLivroDto): Promise<Livro> {
    const livro = await this.findOne(id);

    if (updateLivroDto.title && updateLivroDto.title !== livro.title) {
      const existingLivro = await this.livrosRepository.findOne({
        where: { title: updateLivroDto.title },
      });
      if (existingLivro) {
        throw new ConflictException('Titulo do livro ja em uso');
      }
    }
    Object.assign(livro, updateLivroDto);
    return this.livrosRepository.save(livro);
  }

  async remove(id: number): Promise<void> {
    const livro = await this.findOne(id);
    await this.livrosRepository.remove(livro);
  }
}
