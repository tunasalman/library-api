import { AbstractEntity } from 'src/common/entity/abstract.entity';
import BookAlreadyOccupiedException from 'src/exceptions/book_already_occupied.exception';
import BookNotBorrowedException from 'src/exceptions/book_not_borrowed.exception';
import { Column, Entity } from 'typeorm';
import { User } from './user.entity';
import { UserBookHistory } from './userbookhistory.entity';

@Entity({
  name: 'books',
})
export class Book extends AbstractEntity<Book> {
  @Column()
  name!: string;

  @Column({ type: 'float', default: -1 })
  score!: number;

  @Column({ default: 0 })
  totalBorrowCount?: number;

  @Column({ nullable: true })
  lastBorrowedBy?: number | null;

  @Column({ default: false })
  isOccupied!: boolean;

  borrow(user: User) {
    if (this.isOccupied) {
      throw new BookAlreadyOccupiedException();
    }
    this.isOccupied = true;
    this.lastBorrowedBy = user.id;
  }

  private calculateAvgScore(score: number) {
    let newScore = score;
    if (this.score > -1) {
      newScore = (this.score + score) / this.totalBorrowCount;
    }
    this.score = newScore;
  }

  return(user: User, score: number) {
    if (this.lastBorrowedBy != user.id || !this.isOccupied) {
      throw new BookNotBorrowedException();
    }
    this.isOccupied = false;
    this.lastBorrowedBy = user.id;
    this.totalBorrowCount = this.totalBorrowCount + 1;
    this.calculateAvgScore(score);
    return new UserBookHistory({
      userId: user.id,
      userScore: score,
      bookId: this.id,
      name: this.name,
    });
  }
}
