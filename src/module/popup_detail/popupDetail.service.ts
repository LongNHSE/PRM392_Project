import { Injectable } from '@nestjs/common';
import { CreatePopupDetailDto } from './dto/create-popupDetail.dto';
import { UpdatePopupDetailDto } from './dto/update-popupDetail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PopupDetail } from './schema/popupDetail.schema';
import { Model } from 'mongoose';

@Injectable()
export class PopupDetailService {
  // async updateImage(_id: string, resultUrl: unknown) {
  //   return await this.productModel.findByIdAndUpdate(_id, { icon: resultUrl });
  // }
  constructor(
    @InjectModel(PopupDetail.name)
    private readonly popupDetailModel: Model<PopupDetail>,
  ) {}
  async create(createPopupDetailDto: CreatePopupDetailDto) {
    try {
      const result = await this.popupDetailModel.create(createPopupDetailDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.popupDetailModel.find();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOne(id: string) {
    return await this.popupDetailModel.findById(id);
  }

  async update(id: string, updatePopupDetailDto: UpdatePopupDetailDto) {
    return await this.popupDetailModel.findByIdAndUpdate(
      id,
      updatePopupDetailDto,
      {
        new: true,
      },
    );
  }

  remove(id: number) {
    return `This action removes a #${id}`;
  }
}
