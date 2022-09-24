import { NotFoundException } from '@nestjs/common';

export default class UserNotFoundException extends NotFoundException {
  constructor() {
    super();
    this.message = 'user_not_exists';
  }
}
