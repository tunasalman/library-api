export default class BookAlreadyOccupiedException extends Error {
  constructor() {
    super();
    this.message = 'book_already_occupied';
  }
}
