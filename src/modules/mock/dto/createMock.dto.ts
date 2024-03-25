import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class createMockDto {
  @ApiProperty({ example: 20, description: 'this is value' })
  @IsNumber()
  value: number;
}
