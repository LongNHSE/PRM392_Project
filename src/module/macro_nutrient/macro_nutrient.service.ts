import { Injectable } from '@nestjs/common';
import { CreateMacroNutrientDto } from './dto/create-macro_nutrient.dto';
import { UpdateMacroNutrientDto } from './dto/update-macro_nutrient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MacroNutrient } from './schema/macro_nutrient.schema';
import { Model } from 'mongoose';

@Injectable()
export class MacroNutrientService {
  constructor(
    @InjectModel(MacroNutrient.name)
    private readonly macroNutrientModel: Model<MacroNutrient>,
  ) {}

  create(createMacroNutrientDto: CreateMacroNutrientDto) {
    return this.macroNutrientModel.create(createMacroNutrientDto);
  }

  findAll() {
    return this.macroNutrientModel.find();
  }

  findOne(id: string) {
    return this.macroNutrientModel.findById(id);
  }
}
