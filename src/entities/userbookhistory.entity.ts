import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'user_book_history',
})
export class UserBookHistory extends AbstractEntity<UserBookHistory> {
  @Column()
  userId: number;
  @Column()
  bookId: number;
  @Column()
  name: string;
  @Column()
  userScore: number;
}
