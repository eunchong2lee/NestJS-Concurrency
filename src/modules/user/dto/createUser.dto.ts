import { IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  username: string;
}
