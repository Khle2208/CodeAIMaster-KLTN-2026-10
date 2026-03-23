import { Module } from '@nestjs/common';
import { CodeAssignmentsService } from './code-assignments.service';
import { CodeAssignmentsController } from './code-assignments.controller';

@Module({
  controllers: [CodeAssignmentsController],
  providers: [CodeAssignmentsService],
})
export class CodeAssignmentsModule {}
