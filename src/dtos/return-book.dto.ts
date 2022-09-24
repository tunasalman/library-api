import { IsNotEmpty, Max, Min } from 'class-validator';

export class ReturnBookDto {
  @IsNotEmpty()
  @Min(1)
  @Max(10)
  score!: number;
}
