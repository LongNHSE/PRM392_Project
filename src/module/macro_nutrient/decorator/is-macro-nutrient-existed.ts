import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { MacroNutrient } from '../schema/macro_nutrient.schema'; // Adjusted import
import { Model } from 'mongoose';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsMacroNutrientExistedConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectModel(MacroNutrient.name)
    private readonly macroNutrientModel: Model<MacroNutrient>, // Adjusted model
  ) {}
  async validate(macroNutrientId: string): Promise<boolean> {
    try {
      const macroNutrient =
        await this.macroNutrientModel.findById(macroNutrientId); // Adjusted variable
      return !!macroNutrient;
    } catch (e) {
      return false;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Macro nutrient with this id does not exist'; // Adjusted message
  }
}

export function IsMacroNutrientExisted(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMacroNutrientExistedConstraint, // Adjusted validator
    });
  };
}
