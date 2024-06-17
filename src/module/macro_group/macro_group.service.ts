import { Injectable } from '@nestjs/common';
import { CreateMacroGroupDto } from './dto/create-macro_group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MacroGroup } from './schema/macro_group.schema';
import { Model } from 'mongoose';

@Injectable()
export class MacroGroupService {
  constructor(
    @InjectModel(MacroGroup.name)
    private readonly macroGroupModel: Model<MacroGroup>,
  ) {}
  create(createMacroGroupDto: CreateMacroGroupDto) {
    return this.macroGroupModel.create(createMacroGroupDto);
  }

  findAll() {
    return this.macroGroupModel.find().populate('macronutrient');
  }

  findOne(id: string) {
    return this.macroGroupModel.findById(id).populate('macronutrient');
  }
}
