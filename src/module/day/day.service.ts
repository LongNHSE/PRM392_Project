import { Injectable } from '@nestjs/common';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Day } from './schema/day.schema';
import { Model } from 'mongoose';

@Injectable()
export class DayService {
  constructor(@InjectModel(Day.name) private dayModel: Model<Day>) {}
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
}
