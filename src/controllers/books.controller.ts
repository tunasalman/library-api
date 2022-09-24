import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDParam } from 'src/common/decorators/id.decorator';
import { Repository } from 'typeorm';

import { CreateBookDto } from '../dtos/create-book.dto';
import { Book } from '../entities/book.entity';

@Controller('books')
export class BooksController {
  constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBookDto: CreateBookDto) {
    const newBook = new Book({ ...createBookDto });
    await this.bookRepo.save(newBook);
  }

  @Get()
  findAll() {
    return this.bookRepo.find({ select: ['id', 'name'] });
  }

  @Get(':id')
  findOne(@IDParam('id') id: number) {
    return this.bookRepo.findOne({
      where: [{ id }],
      select: ['id', 'name', 'score'],
    });
  }
}
