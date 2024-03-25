import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class createResevationDto {
  @ApiProperty({ example: 1, description: 'user_id' })
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 1, description: 'item_id' })
  @IsNumber()
  item_id: number;
}
