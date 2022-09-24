export default class BookNotBorrowedException extends Error {
  constructor() {
    super();
    this.message = 'book_not_borrowed';
  }
}
