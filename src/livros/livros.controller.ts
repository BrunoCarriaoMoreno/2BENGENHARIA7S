/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LivrosService } from './livros.service';
import { CreateLivroDto, UpdateLivroDto } from 'src/auth/dto/livro.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Livro } from 'src/entities/livro.entity';

@Controller('livros')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo livro' })
  @ApiResponse({
    status: 201,
    description: 'livro criado com sucesso',
    type: Livro,
  })
  @ApiResponse({ status: 409, description: 'Nome ja está em uso' })
  create(@Body() createLivroDto: CreateLivroDto) {
    return this.livrosService.create(createLivroDto);
  }

  @Get()
  @ApiOperation({ summary: 'listar todos os livros' })
  @ApiResponse({
    status: 200,
    description: 'Listar todos os livros',
    type: [Livro],
  })
  findAll() {
    return this.livrosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar livro por Id' })
  @ApiResponse({ status: 200, description: 'Livro encontrado', type: Livro })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.livrosService.findOne(id);
  }
  @Get('title/:title')
  @ApiOperation({ summary: 'Buscar livro pelo titulo' })
  @ApiResponse({ status: 200, description: 'Livro encontrado', type: Livro })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  findByTitle(@Param('title') title: string) {
    return this.livrosService.findByTitle(title);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar livro' })
  @ApiResponse({ status: 200, description: 'Livro atualizado com sucesso', type: Livro })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLivroDto: UpdateLivroDto,
  ) {
    return this.livrosService.update(id, updateLivroDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar Livro' })
  @ApiResponse({ status: 200, description: 'Livro deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.livrosService.remove(id);
  }
}
