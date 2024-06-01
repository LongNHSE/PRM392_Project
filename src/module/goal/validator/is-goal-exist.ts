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
import { Goal } from '../schema/goal.schema'; // Import the Goal schema

@Injectable()
@ValidatorConstraint({ async: true })
export class IsGoalExistsConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Goal.name)
    private goalModel: Model<Goal>, // Use the Goal model
  ) {}

  async validate(goalId: string) {
    try {
      const goal = await this.goalModel.findById(goalId); //
      return !!goal;
    } catch (e) {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'Goal with this id does not exist'; // Change the error message
  }
}

export function IsGoalExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsGoalExistsConstraint, // Use the IsGoalExistsConstraint
    });
  };
}
