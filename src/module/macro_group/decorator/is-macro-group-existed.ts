import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { MacroGroup } from '../schema/macro_group.schema'; // Adjusted import
import { Model } from 'mongoose';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsMacroGroupExistedConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectModel(MacroGroup.name)
    private readonly macroGroupModel: Model<MacroGroup>, // Adjusted model
  ) {}
  async validate(macroGroupId: string): Promise<boolean> {
    const macroGroup = await this.macroGroupModel.findById(macroGroupId); // Adjusted variable
    return !!macroGroup;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Macro group with this id does not exist'; // Adjusted message
  }
}

export function IsMacroGroupExisted(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMacroGroupExistedConstraint, // Adjusted validator
    });
  };
}
