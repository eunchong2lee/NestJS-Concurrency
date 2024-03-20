import { IsNumber } from 'class-validator';

export class createMockDto {
  @IsNumber()
  value: number;
}
