import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class createItemDto {
  @ApiProperty({ example: 'k-pop pe', description: 'item name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 5, description: 'quantity' })
  @IsNumber()
  quantity: number;
}
