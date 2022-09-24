import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractEntity<T> extends BaseEntity {
  constructor(partial: Partial<T>) {
    super();
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('increment')
  id: number;
}
