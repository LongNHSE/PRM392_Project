import { IsNotEmpty } from 'class-validator';

export class CreateActivityLevelDto {
  @IsNotEmpty()
  levelName: string;
}
