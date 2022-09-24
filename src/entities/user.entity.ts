import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'users',
})
export class User extends AbstractEntity<User> {
  @Column()
  name: string;
}
