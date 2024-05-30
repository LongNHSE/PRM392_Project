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
import { User } from '../schema/user.schema';

@Injectable()
//Use the @ValidatorConstraint decorator to define a complex validation rule, in here it need InjectModel and async.
@ValidatorConstraint({ async: true })
export class IsUserExistsConstraint implements ValidatorConstraintInterface {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async validate(userId: string) {
    const user = await this.userModel.findById(userId);
    return !!user;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'User with this id does not exist';
  }
}

export function IsUserExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserExistsConstraint,
    });
  };
}
