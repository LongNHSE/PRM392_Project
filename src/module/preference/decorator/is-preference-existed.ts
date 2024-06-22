import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Preference } from '../schema/preference.schema'; // Adjusted import to use Preference model

@Injectable()
@ValidatorConstraint({ async: true })
export class IsPreferenceExistsConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectModel(Preference.name) private preferenceModel: Model<Preference>,
  ) {} // Using Preference model

  async validate(preferenceId: string) {
    try {
      const preference = await this.preferenceModel.findById(preferenceId);
      return !!preference;
    } catch (e) {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'Preference with this id does not exist';
  }
}

export function IsPreferenceExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPreferenceExistsConstraint,
    });
  };
}
