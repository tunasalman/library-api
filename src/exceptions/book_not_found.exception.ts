import { NotFoundException } from '@nestjs/common';

export default class BookNotFoundException extends NotFoundException {
  constructor() {
    super();
    this.message = 'book_not_exists';
  }
}
