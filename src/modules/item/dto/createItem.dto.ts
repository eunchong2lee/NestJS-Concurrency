import { IsNumber, IsString } from 'class-validator';

export class createItemDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;
}
