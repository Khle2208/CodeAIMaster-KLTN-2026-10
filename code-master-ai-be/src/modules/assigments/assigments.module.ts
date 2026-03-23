import { Module } from '@nestjs/common';
import { AssigmentsService } from './assigments.service';
import { AssigmentsController } from './assigments.controller';

@Module({
  controllers: [AssigmentsController],
  providers: [AssigmentsService],
})
export class AssigmentsModule {}
