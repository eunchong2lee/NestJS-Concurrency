import { IsNumber } from 'class-validator';

export class createResevationDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  item_id: number;
}
