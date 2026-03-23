import { Injectable } from '@nestjs/common';
import { CreateCodeAssignmentDto } from './dto/create-code-assignment.dto';
import { UpdateCodeAssignmentDto } from './dto/update-code-assignment.dto';

@Injectable()
export class CodeAssignmentsService {
  create(createCodeAssignmentDto: CreateCodeAssignmentDto) {
    return 'This action adds a new codeAssignment';
  }

  findAll() {
    return `This action returns all codeAssignments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} codeAssignment`;
  }

  update(id: number, updateCodeAssignmentDto: UpdateCodeAssignmentDto) {
    return `This action updates a #${id} codeAssignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} codeAssignment`;
  }
}
