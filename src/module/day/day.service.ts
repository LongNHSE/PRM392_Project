import { Injectable } from '@nestjs/common';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Day } from './schema/day.schema';
import mongoose, { Model } from 'mongoose';
import { Preference } from '../preference/schema/preference.schema';
import { Diet } from '../diet/schema/diet.schema';

@Injectable()
export class DayService {
  constructor(
    @InjectModel(Day.name) private dayModel: Model<Day>,
    @InjectModel(Preference.name) private preferenceModel: Model<Preference>,
  ) {}
  create(createDayDto: CreateDayDto) {
    return this.dayModel.create(createDayDto);
  }

  findAll() {
    return this.dayModel.find();
  }

  findOne(id: string) {
    return this.dayModel.findById(id);
  }

  update(id: string, updateDayDto: UpdateDayDto) {
    return this.dayModel.findByIdAndUpdate(id, updateDayDto, { new: true });
  }

  remove(id: string) {
    return this.dayModel.findByIdAndUpdate(id, { isActive: false });
  }

  //Function to create day based on Diet
  async createDayBasedOnDiet(diet: Diet) {
    const days = [];
    //Caculate total calories
    const currentYear = new Date().getFullYear();
    const totalCalories = this.totalCaloricNeed(
      diet.users.gender,
      diet.weight,
      diet.height,
      currentYear - diet.users.dob.getFullYear(),
      diet.activity_levels.level,
      diet.goals.sign,
      diet.amountOfChange,
      diet.duration,
    );
    try {
      for (let i = 0; i < diet.duration * 7; i++) {
        const day = new CreateDayDto();
        day.totalCalstd = totalCalories;
        day.carbohydratedstd = parseFloat(
          ((totalCalories * diet.preferences.carbohydrate) / 100).toFixed(2),
        );
        day.fiberstd = parseFloat(
          ((totalCalories * diet.preferences.fiber) / 100).toFixed(2),
        );
        day.proteinstd = parseFloat(
          ((totalCalories * diet.preferences.protein) / 100).toFixed(2),
        );
        day.fatstd = parseFloat(
          ((totalCalories * diet.preferences.fat) / 100).toFixed(2),
        );
        day.waterstd = parseFloat(diet.preferences.water.toFixed(2));

        day.index = i + 1;
        day.dietId = diet._id;

        const dayResult = await this.create(day);
        days.push(dayResult);
      }
      return days;
    } catch (error) {
      console.error(error);
    }
  }

  totalCaloricNeed(
    gender: string,
    weight: number,
    height: number,
    age: number,
    activity_level: number,
    goal: number,
    amount: number,
    week: number,
  ): number {
    // Calculating BMR
    let bmr = 0;
    if (gender.toLowerCase() === 'male') {
      // MALE
      bmr = 66.5 + 13.75 * weight + 5.003 * height - 6.775 * age;
    } else if (gender.toLowerCase() === 'female') {
      // FEMALE
      bmr = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
    } else {
      // DEFAULT
      bmr = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
    }

    // Calculating AMR
    let amr = 0;

    amr = bmr * activity_level;

    const CALORIES_PER_KG = 7700; // Assuming a constant value, adjust as necessary
    const total = amr + (goal * amount * CALORIES_PER_KG) / (week * 7);
    return Math.round(total);
  }
}
