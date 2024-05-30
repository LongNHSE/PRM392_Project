import { Injectable } from '@nestjs/common';
import { CreatePopupDto } from './dto/create-popup.dto';
import { UpdatePopupDto } from './dto/update-popup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Popup } from './schema/popup.schema';
import { Model } from 'mongoose';

@Injectable()
export class PopupService {
  // async updateImage(_id: string, resultUrl: unknown) {
  //   return await this.productModel.findByIdAndUpdate(_id, { icon: resultUrl });
  // }
  constructor(
    @InjectModel(Popup.name) private readonly popupModel: Model<Popup>,
  ) {}
  async create(createPopupDto: CreatePopupDto) {
    try {
      const result = await this.popupModel.create(createPopupDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.popupModel.find();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOne(id: string) {
    return await this.popupModel.findById(id);
  }

  async update(id: string, updatePopupDto: UpdatePopupDto) {
    return await this.popupModel.findByIdAndUpdate(id, updatePopupDto, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id}`;
  }
}
