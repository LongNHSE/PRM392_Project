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
import { Exercise } from 'src/module/exercise/schema/exercise.schema'; // Import Exercise instead of ActivityLevel

@Injectable()
@ValidatorConstraint({ async: true })
export class IsExerciseExistsConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectModel(Exercise.name) // Inject Exercise model
    private exerciseModel: Model<Exercise>, // Use Exercise model
  ) {}

  async validate(exerciseId: string) {
    try {
      const exercise = await this.exerciseModel.findById(exerciseId); // Use Exercise model to find exercise
      return !!exercise;
    } catch (e) {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'Exercise with this id does not exist'; // Change error message
  }
}

export function IsExerciseExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsExerciseExistsConstraint, // Use IsExerciseExistsConstraint
    });
  };
}
