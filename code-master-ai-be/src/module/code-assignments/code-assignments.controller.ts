import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CodeAssignmentsService } from './code-assignments.service';
import { CreateCodeAssignmentDto } from './dto/create-code-assignment.dto';
import { UpdateCodeAssignmentDto } from './dto/update-code-assignment.dto';

@Controller('code-assignments')
export class CodeAssignmentsController {
  constructor(private readonly codeAssignmentsService: CodeAssignmentsService) {}

  @Post()
  create(@Body() createCodeAssignmentDto: CreateCodeAssignmentDto) {
    return this.codeAssignmentsService.create(createCodeAssignmentDto);
  }

  @Get()
  findAll() {
    return this.codeAssignmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codeAssignmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCodeAssignmentDto: UpdateCodeAssignmentDto) {
    return this.codeAssignmentsService.update(+id, updateCodeAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codeAssignmentsService.remove(+id);
  }
}
