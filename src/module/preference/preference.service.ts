import { Injectable } from '@nestjs/common';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Preference } from './schema/preference.schema';
import { Model } from 'mongoose';

@Injectable()
export class PreferenceService {
  constructor(
    @InjectModel(Preference.name)
    private readonly preferenceModel: Model<Preference>,
  ) {}

  create(createPreferenceDto: CreatePreferenceDto) {
    return this.preferenceModel.create(createPreferenceDto);
  }

  findAll() {
    return this.preferenceModel.find();
  }

  findOne(id: string) {
    return this.preferenceModel.findById(id);
  }

  update(id: string, updatePreferenceDto: UpdatePreferenceDto) {
    return this.preferenceModel.findByIdAndUpdate(id, updatePreferenceDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.preferenceModel.findByIdAndUpdate(
      id,
      { isActive: false },
      {
        new: true,
      },
    );
  }
}
