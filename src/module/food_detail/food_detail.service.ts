import { Injectable } from '@nestjs/common';
import { CreateFoodDetailDto } from './dto/create-food_detail.dto';
import { UpdateFoodDetailDto } from './dto/update-food_detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FoodDetail } from './schema/food_detail.schema';
import { Model } from 'mongoose';
import { Food } from '../food/schema/food.schema';
import { Meal } from '../meal/schema/meal.schema';
import { MacroGroup } from '../macro_group/schema/macro_group.schema';
import { MacroNutrient } from '../macro_nutrient/schema/macro_nutrient.schema';
import { MealItem } from '../meal_item/schema/meal_item.schema';
import { MealFrame } from '../meal_frame/schema/meal_frame.schema';
import { MealStandard } from '../meal_standard/schema/meal_standard.schema';
import { FoodService } from '../food/food.service';
import { Day } from '../day/schema/day.schema';
import { printTable, transpose } from 'src/util/util';

@Injectable()
export class FoodDetailService {
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
    private readonly foodService: FoodService,
  ) {}
  create(createFoodDetailDto: CreateFoodDetailDto) {
    return this.foodDetailModel.create(createFoodDetailDto);
  }

  findAll() {
    return this.foodDetailModel.find();
  }

  findOne(id: string) {
    return this.foodDetailModel.findById(id);
  }

  update(id: string, updateFoodDetailDto: UpdateFoodDetailDto) {
    return this.foodDetailModel.findByIdAndUpdate(id, updateFoodDetailDto, {
      new: true,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} foodDetail`;
  }

  // public generateLoadsOfFoodDetail(
  //   allApplicableFood: Food[],
  //   meal: Meal,
  //   numDay: number,
  // ): FoodDetail[][] {
  //   const listOfFoodDetail: string[] = Constants.FOOD_DETAIL_BY_MEAL.get(
  //     meal.getMealIndex(),
  //   );
  //   const details: FoodDetail[][] = []; // MEALS-DAYS-DETAILS

  //   let foodOfCategory: Food[];
  //   let foodDetailByDay: FoodDetail[] = [];
  //   for (let j = 0; j < numDay; j++) {
  //     // DAYS
  //     for (let i = 0; i < listOfFoodDetail.length; i++) {
  //       // DETAILS
  //       foodOfCategory = this.listFoodByCategory(
  //         allApplicableFood,
  //         listOfFoodDetail[i],
  //       );
  //       foodDetailByDay.push(
  //         this.generateFoodDetail(meal, foodOfCategory, listOfFoodDetail[i]),
  //       );
  //     }
  //     details.push(foodDetailByDay);

  //     // RESET foodDetailByDay
  //     foodDetailByDay = [];
  //   }
  //   return details;
  // }

  private listFoodByCategory(
    allApplicableFood: Food[],
    category: string,
  ): Food[] {
    // Implementation of listFoodByCategory
    // This is a placeholder. You need to implement this method based on your application's logic.
    return [];
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
        console.log('fiber', nutrient, baseNutrient);
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
        console.log('default', nutrient, baseNutrient);
        break;
    }
    const calories = parseFloat(
      (nutrient * macroGroup.ratio * macroGroup.relativeEst).toFixed(3),
    );
    const ratio = parseFloat(
      (calories / (baseNutrient * macroNutrient.caloricValue)).toFixed(3),
    );
    if (food._id.toString() === '6672b200e220b5db05a1c55c') {
      console.log(calories / (baseNutrient * macroNutrient.caloricValue));
      console.log(
        Math.floor(calories / (baseNutrient * macroNutrient.caloricValue)),
      );

      console.log({
        calories,
        baseNutrient,
        caloricValue: macroNutrient.caloricValue,
        ratio,
        size: food.size,
        caloricIntake: food.caloricintake,
        carbohydrate: food.carbohydrate,
        fiber: food.fiber,
        protein: food.protein,
        fat: food.fat,
        water: food.water,
        icon: food.icon,
        description: food.description,
        mealId: meal._id,
      });
    }
    foodDetail.foodId = food._id;
    foodDetail.amount = Math.floor(ratio * food.size);
    foodDetail.totalCal = Math.floor(ratio * food.caloricintake);
    foodDetail.carborhydrated = Math.floor(ratio * food.carbohydrate);
    foodDetail.fiber = Math.floor(ratio * food.fiber);
    foodDetail.protein = Math.floor(ratio * food.protein);
    foodDetail.fat = Math.floor(ratio * food.fat);
    foodDetail.water = Math.floor(ratio * food.water);
    foodDetail.icon = food.icon;
    foodDetail.description = food.description;
    foodDetail.mealId = meal._id;
    if (food._id.toString() === '6672b200e220b5db05a1c55c') {
      console.log(foodDetail);
    }
    return foodDetail;
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
          meals[i],
          numOfDay,
        ),
      );
    }
    for (let j = 0; j < numOfMeal; j++) {
      const mealFrame: MealFrame = await this.mealFrameModel.findById(
        meals[j].mealFrameId,
      );
      const mealStandard: MealStandard = await this.mealStandardModel.findById(
        mealFrame.mealStandardId,
      );

      const mealItems: MealItem[] = await this.mealItemModel.find({
        mealStandardId: mealStandard._id,
      });

      for (let i = 0; i < numOfDay; i++) {
        for (let k = 0; k < mealItems.length; k++) {
          const mealId = meals[j]._id;
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

        meals[i].totalCal = totalCaloriesMeal;
        meals[i].carbohydrated = totalCarbohydratesMeal;
        meals[i].fiber = totalFiberMeal;
        meals[i].protein = totalProteinMeal;
        meals[i].fat = totalFatMeal;
        meals[i].water = totalWaterMeal;

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
      days[i].totalCal = totalCaloriesDay;
      days[i].carbohydrated = totalCarbohydratesDay;
      days[i].fiber = totalFiberDay;
      days[i].protein = totalProteinDay;
      days[i].fat = totalFatDay;
      days[i].water = totalWaterDay;

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
