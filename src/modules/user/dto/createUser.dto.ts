import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class createUserDto {
  @ApiProperty({ example: 'eunchong', description: 'username' })
  @IsString()
  username: string;
}
