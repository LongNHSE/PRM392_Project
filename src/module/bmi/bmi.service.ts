import { Injectable } from '@nestjs/common';
import { CreateBmiDto } from './dto/create-bmi.dto';
import { UpdateBmiDto } from './dto/update-bmi.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bmi } from './schema/bmi.schema';
import { Model } from 'mongoose';

@Injectable()
export class BmiService {
  findMyBMI(userId: string) {
    return this.bmiModel.find({ userId });
  }
  constructor(@InjectModel(Bmi.name) private readonly bmiModel: Model<Bmi>) {}

  create(createBmiDto: CreateBmiDto, userId: string) {
    createBmiDto.userId = userId;
    return this.bmiModel.create(createBmiDto);
  }

  findAll() {
    return this.bmiModel.find();
  }

  findOne(id: string) {
    return this.bmiModel.findById(id);
  }

  update(id: string, updateBmiDto: UpdateBmiDto) {
    return this.bmiModel.findByIdAndUpdate(id, updateBmiDto, { new: true });
  }

  remove(id: string) {
    return this.bmiModel.findByIdAndDelete(id);
  }
}
