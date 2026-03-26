import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post('submit')
  @UseGuards(JwtAuthGuard) // Bắt buộc user phải đăng nhập
  async submitCode(
    @Req() req,
    @Body('assignmentId') assignmentId: string,
    @Body('language') language: string, // Gửi tên ngôn ngữ: "python", "cpp", "javascript"
    @Body('sourceCode') sourceCode: string,
  ){
    const userId = req.user._id;
    return this.submissionsService.submitCode(
      userId,
      assignmentId,
      language,
      sourceCode,
    );
  }

  // @Post()
  // create(@Body() createSubmissionDto: CreateSubmissionDto) {
  //   return this.submissionsService.create(createSubmissionDto);
  // }

  // @Get()
  // findAll() {
  //   return this.submissionsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.submissionsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSubmissionDto: UpdateSubmissionDto) {
  //   return this.submissionsService.update(+id, updateSubmissionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.submissionsService.remove(+id);
  // }
}
