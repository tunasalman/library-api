import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDParam } from 'src/common/decorators/id.decorator';
import { ReturnBookDto } from 'src/dtos/return-book.dto';
import { Book } from 'src/entities/book.entity';
import { UserBookHistory } from 'src/entities/userbookhistory.entity';
import BookNotFoundException from 'src/exceptions/book_not_found.exception';
import UserNotFoundException from 'src/exceptions/user_not_found.exception';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
    @InjectRepository(UserBookHistory)
    private historyRepo: Repository<UserBookHistory>,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    const newUser = new User({ ...createUserDto });
    return this.userRepo.save(newUser);
  }

  @Get()
  findAll() {
    return this.userRepo.find();
  }

  @Get(':id')
  async findOne(@IDParam('id') id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new UserNotFoundException();
    }
    const present = await this.bookRepo.find({
      where: [{ isOccupied: true, lastBorrowedBy: user.id }],
      select: ['name'],
    });

    const past = await this.historyRepo.find({
      where: [{ userId: user.id }],
      select: ['name', 'userScore'],
    });
    return {
      ...user,
      books: {
        present,
        past,
      },
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':id/borrow/:bookId')
  async borrowBook(
    @IDParam('id') id: number,
    @IDParam('bookId') bookId: number,
  ) {
    const book = await this.bookRepo.findOneBy({ id: bookId });
    if (!book) {
      throw new NotFoundException('book_not_exists');
    }
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new UserNotFoundException();
    }

    book.borrow(user);
    await this.bookRepo.save(book);
  }

  @Post(':id/return/:bookId')
  async returnBook(
    @IDParam('id') id: number,
    @IDParam('bookId') bookId: number,
    @Body() returnBookDto: ReturnBookDto,
  ) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new UserNotFoundException();
    }
    const book = await this.bookRepo.findOneBy({ id: bookId });
    if (!book) {
      throw new BookNotFoundException();
    }
    const userBookHistory = book.return(user, returnBookDto.score);

    await this.bookRepo.save(book, { transaction: true });
    await this.historyRepo.save(userBookHistory, { transaction: true });
  }
}
