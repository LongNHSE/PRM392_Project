import { Test, TestingModule } from '@nestjs/testing';
import { FoodTypeController } from './food_type.controller';
import { FoodTypeService } from './food_type.service';

describe('FoodTypeController', () => {
  let controller: FoodTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodTypeController],
      providers: [FoodTypeService],
    }).compile();

    controller = module.get<FoodTypeController>(FoodTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
