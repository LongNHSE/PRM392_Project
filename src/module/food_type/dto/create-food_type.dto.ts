import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { IsMacroGroupExisted } from 'src/module/macro_group/decorator/is-macro-group-existed';

export class CreateFoodTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsMongoId()
  @IsMacroGroupExisted()
  macroGroupId: string;
}
