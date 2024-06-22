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
import { Day } from 'src/module/day/schema/day.schema'; // Import Day instead of ActivityLevel

@Injectable()
@ValidatorConstraint({ async: true })
export class IsDayExistsConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Day.name) // Inject Day model
    private dayModel: Model<Day>, // Use Day model
  ) {}

  async validate(dayId: string) {
    try {
      const day = await this.dayModel.findById(dayId); // Use Day model to find day
      return !!day;
    } catch (e) {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'Day with this id does not exist'; // Change error message
  }
}

export function IsDayExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDayExistsConstraint, // Use IsDayExistsConstraint
    });
  };
}
