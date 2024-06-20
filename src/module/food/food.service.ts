import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Food } from './schema/food.schema';
import mongoose, { Model } from 'mongoose';
import { MealItem } from '../meal_item/schema/meal_item.schema';
import { FoodTypeService } from '../food_type/food_type.service';

@Injectable()
export class FoodService {
  async updateImage(_id: string, resultUrl: unknown) {
    return await this.foodModel.findByIdAndUpdate(_id, { icon: resultUrl });
  }
  constructor(
    @InjectModel(Food.name) private readonly foodModel: Model<Food>,
    private readonly foodTypeService: FoodTypeService,
  ) {}
  async create(createFoodDto: CreateFoodDto) {
    try {
      const result = await this.foodModel.create(createFoodDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.foodModel.aggregate([
      {
        $lookup: {
          from: 'foodtypes',
          localField: 'typeId',
          foreignField: '_id',
          as: 'foodType',
        },
      },
    ]);
  }

  async findOne(id: string) {
    return await this.foodModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'foodtypes',
          localField: 'typeId',
          foreignField: '_id',
          as: 'foodType',
        },
      },
    ]);
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    return await this.foodModel.findByIdAndUpdate(id, updateFoodDto, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }

  async findFoodByType(typeId: string) {
    return await this.foodModel.find({ typeId });
  }

  async findFoodByCaterory(FoodDataset: Food[], mealItem: MealItem) {
    const foodList: Food[] = [];
    const foodType = await this.foodTypeService.findByMacroGroupId(
      mealItem.macroGroupId as string,
    );

    FoodDataset.forEach((food) => {
      for (let i = 0; i < foodType.length; i++) {
        if (food.typeId.toString() === foodType[i]._id.toString()) {
          foodList.push(food);
        }
      }
    });
    return foodList;
  }
}
