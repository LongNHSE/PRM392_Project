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
import { Diet } from 'src/module/diet/schema/diet.schema'; // Import Diet instead of ActivityLevel

@Injectable()
@ValidatorConstraint({ async: true })
export class IsDietExistsConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Diet.name) // Inject Diet model
    private dietModel: Model<Diet>, // Use Diet model
  ) {}

  async validate(dietId: string) {
    try {
      const diet = await this.dietModel.findById(dietId); // Use Diet model to find diet
      return !!diet;
    } catch (e) {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'Diet with this id does not exist'; // Change error message
  }
}

export function IsDietExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDietExistsConstraint, // Use IsDietExistsConstraint
    });
  };
}
