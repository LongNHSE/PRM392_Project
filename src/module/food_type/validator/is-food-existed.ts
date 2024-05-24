import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { FoodType } from '../schema/food_type.schema';
import { Model } from 'mongoose';
@Injectable()
@ValidatorConstraint({ async: true })
export class IsFoodTypeExistedConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectModel(FoodType.name) private readonly foodTypeModel: Model<FoodType>,
  ) {}
  async validate(foodtypeId: string): Promise<boolean> {
    const foodType = await this.foodTypeModel.findById(foodtypeId);
    return !!foodType;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Food type with this id does not exist';
  }
}
export function IsFoodTypeExisted(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFoodTypeExistedConstraint,
    });
  };
}
