import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Submission } from './entities/submission.entity';
import { Model, Types } from 'mongoose';
import { TestCase } from '../testcases/entities/testcase.entity';
import { CodeAssignment } from '../code-assignments/entities/code-assignment.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SubmissionsService {
  private readonly JUDGE0_URL = 'http://localhost:2358';

  constructor(
    @InjectModel(Submission.name) private readonly submissionModel: Model<Submission>,
    @InjectModel(TestCase.name) private readonly testCaseModel: Model<TestCase>,
    @InjectModel(CodeAssignment.name) private readonly codeAssignmentModel: Model<CodeAssignment>,
    private readonly httpService: HttpService,
  ) {}

  async submitCode(
    userId: string,
    assignmentId: string,
    language: string,
    sourceCode: string,
  ) {
    try {
      //  Kiểm tra bài tập có tồn tại không
      const assignment = await this.codeAssignmentModel.findById(assignmentId);
      if (!assignment) {
        throw new BadRequestException('Không tìm thấy bài tập này.');
      }

      //  Ép kiểu assignmentId sang ObjectId để tìm kiếm chính xác
      const objectId = new Types.ObjectId(assignmentId);

      //  Tìm Test Case - CHÚ Ý: Phải dùng code_assignment_id (giống trong Entity/DB)
      const testCases = await this.testCaseModel
        .find({ code_assignment_id: objectId }) 
        .lean()
        .exec();

      console.log('Số lượng Test Case tìm được:', testCases.length);

      if (!testCases || testCases.length === 0) {
        throw new BadRequestException('Bài tập này chưa có Test Case nào để chấm điểm.');
      }

      //  Map ID ngôn ngữ cho Judge0
      const languageMap = { python: 71, cpp: 54, java: 62, javascript: 63 };
      const languageId = languageMap[language.toLowerCase()];
      if (!languageId) {
        throw new BadRequestException(`Hệ thống chưa hỗ trợ ngôn ngữ: ${language}`);
      }

      let passedCases = 0;
      let maxTime = 0;
      let maxMemory = 0;
      let finalStatus = 'ACCEPTED';
      let errorDetail = null;

      //  Gửi lên Judge0
      const judgePromises = testCases.map(async (testCase: any) => {
        const payload = {
          source_code: sourceCode,
          language_id: languageId,
          stdin: testCase.input_data, 
          expected_output: testCase.expected_output,
          cpu_time_limit: assignment.time_limit || 2.0,
          memory_limit: assignment.memory_limit || 128000,
        };
        const response = await firstValueFrom(
          this.httpService.post(
            `${this.JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
            payload,
            { headers: { 'Content-Type': 'application/json' } },
          ),
        );
        return response.data;
      });

      const judgeResults = await Promise.all(judgePromises);

      // Phân tích kết quả
      for (const result of judgeResults) {
        if (result.status.id === 3) {
          passedCases++;
        } else {
          if (result.status.id === 6) {
            finalStatus = 'COMPILATION_ERROR';
            errorDetail = result.compile_output;
            break;
          }
          if (finalStatus === 'ACCEPTED') {
            finalStatus = result.status.description.toUpperCase().replace(/ /g, '_');
          }
        }
        if (result.time && parseFloat(result.time) > maxTime) maxTime = parseFloat(result.time);
        if (result.memory && result.memory > maxMemory) maxMemory = result.memory;
      }

      //  Lưu Submission 
      const newSubmission = await this.submissionModel.create({
        user_id: userId,        
        assignment_id: assignmentId, 
        language: language,
        code: sourceCode,       
        status: finalStatus,
        score: (passedCases / testCases.length) * 10, 
      });

      return {
        message: 'Chấm bài hoàn tất',
        submission: newSubmission,
        passedCases,
        totalCases: testCases.length,
        compileError: errorDetail,
      };

    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.error(error);
      throw new InternalServerErrorException('Lỗi hệ thống chấm bài.');
    }
  }
}