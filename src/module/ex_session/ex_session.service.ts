import { Injectable } from '@nestjs/common';
import { CreateExSessionDto } from './dto/create-ex_session.dto';
import { UpdateExSessionDto } from './dto/update-ex_session.dto';

@Injectable()
export class ExSessionService {
  create(createExSessionDto: CreateExSessionDto) {
    return 'This action adds a new exSession';
  }

  findAll() {
    return `This action returns all exSession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exSession`;
  }

  update(id: number, updateExSessionDto: UpdateExSessionDto) {
    return `This action updates a #${id} exSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} exSession`;
  }
}
