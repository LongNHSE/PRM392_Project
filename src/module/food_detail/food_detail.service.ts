import { Injectable } from '@nestjs/common';
import { CreateFoodDetailDto } from './dto/create-food_detail.dto';
import { UpdateFoodDetailDto } from './dto/update-food_detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FoodDetail } from './schema/food_detail.schema';
import mongoose, { Model } from 'mongoose';
import { Food } from '../food/schema/food.schema';
import { Meal } from '../meal/schema/meal.schema';
import { MacroGroup } from '../macro_group/schema/macro_group.schema';
import { MacroNutrient } from '../macro_nutrient/schema/macro_nutrient.schema';
import { MealItem } from '../meal_item/schema/meal_item.schema';
import { MealFrame } from '../meal_frame/schema/meal_frame.schema';
import { MealStandard } from '../meal_standard/schema/meal_standard.schema';
import { FoodService } from '../food/food.service';
import { Day } from '../day/schema/day.schema';
import { transpose } from 'src/util/util';

@Injectable()
export class FoodDetailService {
  async findSubstitudeFood(id: string) {
    const foodDetail = await this.findOne(id);
    const food = await this.foodService.findOne(foodDetail[0].foodId);
    console.log(food[0]._id);
    if (food) {
      let result = await this.foodService.findSubstitudeFood(
        food[0].foodType.macroGroupId.toString(),
      );
      result = result.filter((el) => {
        return el._id.toString() !== food[0]._id.toString();
      });
      return result;
    }
    return null;
  }
  findAllFoodDetailsBasedOnMealId(mealId: string) {
    return this.foodDetailModel.aggregate([
      { $match: { mealId: new mongoose.Types.ObjectId(mealId) } },
      {
        $lookup: {
          from: 'foods',
          localField: 'foodId',
          foreignField: '_id',
          as: 'food',
        },
      },
      {
        $unwind: '$food',
      },
      {
        $lookup: {
          from: 'foodtypes',
          localField: 'food.typeId',
          foreignField: '_id',
          as: 'foodType',
        },
      },
      {
        $unwind: '$foodType',
      },
      {
        $lookup: {
          from: 'macrogroups',
          localField: 'foodType.macroGroupId',
          foreignField: '_id',
          as: 'macroGroup',
        },
      },
      {
        $unwind: {
          path: '$macroGroup',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'macronutrients',
          localField: 'macroGroup.macronutrientId',
          foreignField: '_id',
          as: 'macroNutrient',
        },
      },
      {
        $unwind: {
          path: '$macroNutrient',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
  }
  readonly CARBOHYDRATE_TO_KCAL = 4;
  readonly PROTEIN_TO_KCAL = 4;
  readonly FAT_TO_KCAL = 9;
  constructor(
    @InjectModel(FoodDetail.name) private foodDetailModel: Model<FoodDetail>,
    @InjectModel(MacroGroup.name) private macroGroupModel: Model<MacroGroup>,
    @InjectModel(MacroNutrient.name)
    private macroNutrientModel: Model<MacroNutrient>,
    @InjectModel(MealFrame.name) private mealFrameModel: Model<MealFrame>,
    @InjectModel(MealStandard.name)
    private mealStandardModel: Model<MealStandard>,
    @InjectModel(MealItem.name) private mealItemModel: Model<MealItem>,
    @InjectModel(Day.name) private dayModel: Model<Day>,
    @InjectModel(Meal.name) private mealModel: Model<Meal>,
    private readonly foodService: FoodService,
  ) {}
  create(createFoodDetailDto: CreateFoodDetailDto) {
    return this.foodDetailModel.create(createFoodDetailDto);
  }

  findAll() {
    return this.foodDetailModel.find();
  }

  findOne(id: string) {
    return this.foodDetailModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'foods',
          localField: 'foodId',
          foreignField: '_id',
          as: 'food',
        },
      },
      {
        $unwind: '$food',
      },
      {
        $lookup: {
          from: 'foodtypes',
          localField: 'food.typeId',
          foreignField: '_id',
          as: 'foodType',
        },
      },
      {
        $unwind: '$foodType',
      },
      {
        $lookup: {
          from: 'macrogroups',
          localField: 'foodType.macroGroupId',
          foreignField: '_id',
          as: 'macroGroup',
        },
      },
      {
        $unwind: {
          path: '$macroGroup',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'macronutrients',
          localField: 'macroGroup.macronutrientId',
          foreignField: '_id',
          as: 'macroNutrient',
        },
      },
      {
        $unwind: {
          path: '$macroNutrient',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
  }

  async update(id: string, updateFoodDetailDto: UpdateFoodDetailDto) {
    const food = await this.foodService.findOne(
      updateFoodDetailDto.foodId as string,
    );
    const foodResult = food[0];
    return this.foodDetailModel.findByIdAndUpdate(
      id,
      {
        foodId: updateFoodDetailDto.foodId,
        icon: foodResult.icon,
        description: foodResult.description,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return `This action removes a #${id} foodDetail`;
  }

  async generateFoodDetail(
    meal: Meal,
    foodDataset: Food[],
    mealItem: MealItem,
  ): Promise<FoodDetail> {
    const foodDetail = new FoodDetail();

    const idx = Math.floor(Math.random() * foodDataset.length);

    // Implementation of generateFoodDetail

    const food: Food = foodDataset[idx];
    const macroGroup = await this.macroGroupModel.findById(
      mealItem.macroGroupId,
    );
    const macroNutrient = await this.macroNutrientModel.findById(
      macroGroup.macronutrientId,
    );
    let nutrient = 0;

    let baseNutrient = 1;
    switch (macroNutrient.name.toLowerCase()) {
      case 'carbohydrate':
        nutrient = meal.carbohydratedstd;
        baseNutrient = food.carbohydrate;
        break;

      case 'fiber':
        nutrient = meal.fiberstd;
        baseNutrient = food.fiber;
        break;

      case 'protein':
        nutrient = meal.proteinstd;
        baseNutrient = food.protein;
        break;

      case 'fat':
        nutrient = meal.fatstd;
        baseNutrient = food.fat;
        break;

      case 'water':
        nutrient = meal.waterstd;
        baseNutrient = food.water;
        break;

      default:
        break;
    }
    const calories = parseFloat(
      (nutrient * macroGroup.ratio * macroGroup.relativeEst).toFixed(3),
    );
    let caloricValue = macroNutrient.caloricValue;
    if (caloricValue === 0) {
      caloricValue = 1;
    }
    console.log('calories', caloricValue);
    let ratio = parseFloat(
      (calories / (baseNutrient * caloricValue)).toFixed(3),
    );
    if (isNaN(ratio)) {
      ratio = 1;
      console.log('ratio is NaN', ratio);
    }
    function ensureValidNumber(value, defaultValue = 0) {
      const number = parseFloat(value);
      return isNaN(number) ? defaultValue : number;
    }

    foodDetail.foodId = food._id;
    foodDetail.amount = ensureValidNumber((ratio * food.size).toFixed(2));
    foodDetail.totalCal = ensureValidNumber(
      (ratio * food.caloricintake).toFixed(2),
    );
    foodDetail.carborhydrated = ensureValidNumber(
      (ratio * food.carbohydrate).toFixed(2),
    );
    foodDetail.fiber = ensureValidNumber((ratio * food.fiber).toFixed(2));
    foodDetail.protein = ensureValidNumber((ratio * food.protein).toFixed(2));
    foodDetail.fat = ensureValidNumber((ratio * food.fat).toFixed(2));
    foodDetail.water = ensureValidNumber((ratio * food.water).toFixed(2));
    foodDetail.icon = food.icon;
    foodDetail.description = food.description;
    foodDetail.mealId = meal._id;
    console.log(parseFloat((0).toFixed(2)));
    return foodDetail;
  }

  async generateFoodDetailSubstituteByMacroFood(
    meal: Meal,
    mealItem: MealItem,
  ): Promise<any[]> {
    const foodDetail = new FoodDetail();
    const foodDataset = await this.foodService.findAll();
    const foodResult = [];
    const foodOfCategory = await this.foodService.findFoodByCaterory(
      foodDataset,
      mealItem,
    );

    // Implementation of generateFoodDetail

    for (let idx = 0; idx < foodOfCategory.length; idx++) {
      const food = foodOfCategory[idx];
      const macroGroup = await this.macroGroupModel.findById(
        mealItem.macroGroupId,
      );
      const macroNutrient = await this.macroNutrientModel.findById(
        macroGroup.macronutrientId,
      );
      let nutrient = 0;

      let baseNutrient = 1;
      switch (macroNutrient.name.toLowerCase()) {
        case 'carbohydrate':
          nutrient = meal.carbohydratedstd;
          baseNutrient = food.carbohydrate;
          break;

        case 'fiber':
          nutrient = meal.fiberstd;
          baseNutrient = food.fiber;
          break;

        case 'protein':
          nutrient = meal.proteinstd;
          baseNutrient = food.protein;
          break;

        case 'fat':
          nutrient = meal.fatstd;
          baseNutrient = food.fat;
          break;

        case 'water':
          nutrient = meal.waterstd;
          baseNutrient = food.water;
          break;

        default:
          break;
      }
      const calories = parseFloat(
        (nutrient * macroGroup.ratio * macroGroup.relativeEst).toFixed(3),
      );
      let caloricValue = macroNutrient.caloricValue;
      if (caloricValue === 0) {
        caloricValue = 1;
      }
      console.log('calories', caloricValue);
      let ratio = parseFloat(
        (calories / (baseNutrient * caloricValue)).toFixed(3),
      );
      if (isNaN(ratio)) {
        ratio = 1;
        console.log('ratio is NaN', ratio);
      }
      function ensureValidNumber(value, defaultValue = 1) {
        const number = parseFloat(value);
        return isNaN(number) ? defaultValue : number;
      }
      foodDetail.foodId = food._id;
      foodDetail.amount = ensureValidNumber((ratio * food.size).toFixed(2));
      foodDetail.totalCal = ensureValidNumber(
        (ratio * food.caloricintake).toFixed(2),
      );
      foodDetail.carborhydrated = ensureValidNumber(
        (ratio * food.carbohydrate).toFixed(2),
      );
      foodDetail.fiber = ensureValidNumber((ratio * food.fiber).toFixed(2));
      foodDetail.protein = ensureValidNumber((ratio * food.protein).toFixed(2));
      foodDetail.fat = ensureValidNumber((ratio * food.fat).toFixed(2));
      foodDetail.water = ensureValidNumber((ratio * food.water).toFixed(2));
      foodDetail.icon = food.icon;
      foodDetail.description = food.description;
      foodDetail.mealId = meal._id;
      console.log(parseFloat((0).toFixed(2)));
      foodResult.push(foodDetail);
    }
    foodResult.shift();
    return foodResult;
  }

  async generateLoadsOfFoodDetail(
    allApplicableFood: Food[],
    meal: Meal,
    numDay: number,
  ) {
    const mealFrame: MealFrame = await this.mealFrameModel.findById(
      meal.mealFrameId,
    );
    const mealStandard: MealStandard = await this.mealStandardModel.findById(
      mealFrame.mealStandardId,
    );

    const mealItems: MealItem[] = await this.mealItemModel.find({
      mealStandardId: mealStandard._id,
    });

    let details: FoodDetail[][] = []; // MEALS-DAYS-DETAILS

    let foodOfCategory: Food[] = [];

    let foodDetailByItem: FoodDetail[] = [];

    for (let i = 0; i < mealItems.length; i++) {
      foodOfCategory = await this.foodService.findFoodByCaterory(
        allApplicableFood,
        mealItems[i],
      );
      for (let j = 0; j < numDay; j++) {
        foodDetailByItem.push(
          await this.generateFoodDetail(meal, foodOfCategory, mealItems[i]),
        );
      }
      details.push(foodDetailByItem);

      foodDetailByItem = [];
    }

    details = transpose(details);

    return details;
  }

  async generateFoodDetail_2(
    allApplicableFood: Food[],
    meals: Meal[],
    days: Day[],
  ) {
    const numOfDay = days.length;
    const numOfMeal = meals.length;
    const foodDetails: FoodDetail[][][] = [];
    for (let i = 0; i < numOfMeal; i++) {
      foodDetails.push(
        await this.generateLoadsOfFoodDetail(
          allApplicableFood,
          meals[i][0],
          numOfDay,
        ),
      );
    }
    for (let j = 0; j < numOfMeal; j++) {
      const mealFrame: MealFrame = await this.mealFrameModel.findById(
        meals[j][0].mealFrameId,
      );
      const mealStandard: MealStandard = await this.mealStandardModel.findById(
        mealFrame.mealStandardId,
      );

      const mealItems: MealItem[] = await this.mealItemModel.find({
        mealStandardId: mealStandard._id,
      });

      for (let i = 0; i < numOfDay; i++) {
        for (let k = 0; k < mealItems.length; k++) {
          const mealId = meals[j][i]._id;
          foodDetails[j][i][k].mealId = mealId;
        }
      }
    }

    let totalCaloriesMeal = 0;
    let totalCarbohydratesMeal = 0;
    let totalFiberMeal = 0;
    let totalProteinMeal = 0;
    let totalFatMeal = 0;
    let totalWaterMeal = 0;

    for (let i = 0; i < numOfMeal; i++) {
      for (let j = 0; j < numOfDay; j++) {
        for (let k = 0; k < foodDetails[i][j].length; k++) {
          totalCaloriesMeal += foodDetails[i][j][k].totalCal;
          totalCarbohydratesMeal +=
            foodDetails[i][j][k].carborhydrated * this.CARBOHYDRATE_TO_KCAL;
          totalFiberMeal +=
            foodDetails[i][j][k].fiber * this.CARBOHYDRATE_TO_KCAL;
          totalProteinMeal +=
            foodDetails[i][j][k].protein * this.PROTEIN_TO_KCAL;
          totalFatMeal += foodDetails[i][j][k].fat * this.FAT_TO_KCAL;
          totalWaterMeal += foodDetails[i][j][k].water;
        }
        meals[i][j].totalCal = parseFloat(totalCaloriesMeal.toFixed(2));
        meals[i][j].carbohydrated = parseFloat(
          totalCarbohydratesMeal.toFixed(2),
        );
        meals[i][j].fiber = parseFloat(totalFiberMeal.toFixed(2));
        meals[i][j].protein = parseFloat(totalProteinMeal.toFixed(2));
        meals[i][j].fat = parseFloat(totalFatMeal.toFixed(2));
        meals[i][j].water = parseFloat(totalWaterMeal.toFixed(2));
        await this.mealModel.findByIdAndUpdate(meals[i][j]._id, {
          ...meals[i][j],
        });

        totalCaloriesMeal = 0;
        totalCarbohydratesMeal = 0;
        totalFiberMeal = 0;
        totalProteinMeal = 0;
        totalFatMeal = 0;
        totalWaterMeal = 0;
      }
    }

    let totalCaloriesDay = 0;
    let totalCarbohydratesDay = 0;
    let totalFiberDay = 0;
    let totalProteinDay = 0;
    let totalFatDay = 0;
    let totalWaterDay = 0;

    for (let i = 0; i < numOfDay; i++) {
      for (let j = 0; j < numOfMeal; j++) {
        totalCaloriesDay += meals[j].totalCal;
        totalCarbohydratesDay += meals[j].carbohydrated;
        totalFiberDay += meals[j].fiber;
        totalProteinDay += meals[j].protein;
        totalFatDay += meals[j].fat;
        totalWaterDay += meals[j].water;
      }
      days[i].totalCal = parseFloat(totalCaloriesDay.toFixed(2));
      days[i].carbohydrated = parseFloat(totalCarbohydratesDay.toFixed(2));
      days[i].fiber = parseFloat(totalFiberDay.toFixed(2));
      days[i].protein = parseFloat(totalProteinDay.toFixed(2));
      days[i].fat = parseFloat(totalFatDay.toFixed(2));
      days[i].water = parseFloat(totalWaterDay.toFixed(2));

      await this.dayModel.findByIdAndUpdate(days[i]._id, { ...days[i] });

      totalCaloriesDay = 0;
      totalCarbohydratesDay = 0;
      totalFiberDay = 0;
      totalProteinDay = 0;
      totalFatDay = 0;
      totalWaterDay = 0;
    }
    foodDetails.forEach((el) =>
      el.forEach((el) =>
        el.forEach(async (el) => {
          await this.foodDetailModel.create(el);
        }),
      ),
    );
    return foodDetails;
  }
}
