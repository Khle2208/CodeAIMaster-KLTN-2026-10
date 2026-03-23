import { Test, TestingModule } from '@nestjs/testing';
import { AssigmentsController } from './assigments.controller';
import { AssigmentsService } from './assigments.service';

describe('AssigmentsController', () => {
  let controller: AssigmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssigmentsController],
      providers: [AssigmentsService],
    }).compile();

    controller = module.get<AssigmentsController>(AssigmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
