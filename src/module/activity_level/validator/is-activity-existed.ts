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
import { ActivityLevel } from '../schema/activity_level.schema';

@Injectable()
//Use the @ValidatorConstraint decorator to define a complex validation rule, in here it need InjectModel and async.
@ValidatorConstraint({ async: true })
export class IsActivityLevelExistsContstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectModel(ActivityLevel.name)
    private activityModel: Model<ActivityLevel>,
  ) {}

  async validate(activityId: string) {
    try {
      const activity = await this.activityModel.findById(activityId);
      return !!activity;
    } catch (e) {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'Activity Level with this id does not exist';
  }
}

export function IsActivityLevelExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsActivityLevelExistsContstraint,
    });
  };
}
