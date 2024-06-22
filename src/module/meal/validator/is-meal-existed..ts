import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Meal } from 'src/module/meal/schema/meal.schema'; // Import Meal instead of FoodType
import { Model } from 'mongoose';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsMealExistedConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Meal.name) private readonly mealModel: Model<Meal>, // Inject Meal model
  ) {}

  async validate(mealId: string): Promise<boolean> {
    const meal = await this.mealModel.findById(mealId); // Use Meal model to find meal
    return !!meal;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Meal with this id does not exist'; // Change error message
  }
}

export function IsMealExisted(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMealExistedConstraint, // Use IsMealExistedConstraint
    });
  };
}
