import { ForbiddenException } from '@nestjs/common';
import { ProgressService } from '../progress/progress.service';
import { UserLessonProgressService } from './user-lesson-progress.service';
import { ActivityProgressStatus } from './entities/user-lesson-progress.entity';

describe('UserLessonProgressService', () => {
  let service: UserLessonProgressService;

  beforeEach(() => {
    service = new UserLessonProgressService(
      {} as any,
      {} as any,
      {
        recalculateCourseProgress: jest.fn().mockResolvedValue({
          courseId: 'course-1',
          totalActivities: 6,
          completedActivities: 1,
          progressPercent: 16.67,
        }),
      } as unknown as ProgressService,
    );
  });

  it('does not decrease watchPercent when video progress is submitted again', async () => {
    const progress = {
      video: {
        status: ActivityProgressStatus.IN_PROGRESS,
        watchPercent: 80,
        completedAt: null,
      },
      save: jest.fn().mockResolvedValue(undefined),
    };

    jest
      .spyOn(service as any, 'findLessonOrThrow')
      .mockResolvedValue({ _id: 'lesson-1', course_id: 'course-1', lesson_order: 1 });
    jest
      .spyOn(service as any, 'ensureProgressDocument')
      .mockResolvedValue(progress);
    jest
      .spyOn(service as any, 'synchronizeCourseProgress')
      .mockResolvedValue({});
    jest.spyOn(service, 'computeLessonAccess').mockResolvedValue({
      video: { unlocked: true },
    } as any);
    jest.spyOn(service, 'recalculateCourseProgress').mockResolvedValue({} as any);

    await service.markVideoProgress('user-1', 'course-1', 'lesson-1', 20);

    expect(progress.video.watchPercent).toBe(80);
    expect(progress.save).toHaveBeenCalled();
  });

  it('completes video when watchPercent reaches 100', async () => {
    const progress = {
      video: {
        status: ActivityProgressStatus.IN_PROGRESS,
        watchPercent: 20,
        completedAt: null,
      },
      save: jest.fn().mockResolvedValue(undefined),
    };

    jest
      .spyOn(service as any, 'findLessonOrThrow')
      .mockResolvedValue({ _id: 'lesson-1', course_id: 'course-1', lesson_order: 1 });
    jest
      .spyOn(service as any, 'ensureProgressDocument')
      .mockResolvedValue(progress);
    jest
      .spyOn(service as any, 'synchronizeCourseProgress')
      .mockResolvedValue({});
    jest.spyOn(service, 'computeLessonAccess').mockResolvedValue({
      video: { unlocked: true },
    } as any);
    jest.spyOn(service, 'recalculateCourseProgress').mockResolvedValue({} as any);

    await service.markVideoProgress('user-1', 'course-1', 'lesson-1', 100);

    expect(progress.video.status).toBe(ActivityProgressStatus.COMPLETED);
    expect(progress.video.watchPercent).toBe(100);
    expect(progress.video.completedAt).toBeInstanceOf(Date);
  });

  it('rejects quiz submission when video is not completed', async () => {
    const progress = {
      video: { status: ActivityProgressStatus.IN_PROGRESS },
      quiz: { attemptsCount: 0, status: ActivityProgressStatus.LOCKED },
    };

    jest
      .spyOn(service as any, 'findLessonOrThrow')
      .mockResolvedValue({ _id: 'lesson-1', course_id: 'course-1', lesson_order: 1 });
    jest
      .spyOn(service as any, 'ensureProgressDocument')
      .mockResolvedValue(progress);
    jest
      .spyOn(service as any, 'synchronizeCourseProgress')
      .mockResolvedValue({});

    await expect(
      service.recordQuizSubmissionResult('user-1', 'course-1', 'lesson-1', {
        score: 5,
        passed: false,
      }),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('rejects assignment submission when quiz has not passed', async () => {
    const progress = {
      quiz: {
        status: ActivityProgressStatus.IN_PROGRESS,
        passed: false,
      },
      assignment: { attemptsCount: 0, status: ActivityProgressStatus.LOCKED },
    };

    jest
      .spyOn(service as any, 'findLessonOrThrow')
      .mockResolvedValue({ _id: 'lesson-1', course_id: 'course-1', lesson_order: 1 });
    jest
      .spyOn(service as any, 'ensureProgressDocument')
      .mockResolvedValue(progress);
    jest
      .spyOn(service as any, 'synchronizeCourseProgress')
      .mockResolvedValue({});

    await expect(
      service.recordAssignmentSubmissionResult(
        'user-1',
        'course-1',
        'lesson-1',
        {
          score: 10,
          passed: true,
        },
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('calculates course progress by activity count', async () => {
    jest.spyOn(service as any, 'synchronizeCourseProgress').mockResolvedValue({
      lessons: [{ _id: 'l1', title: 'Lesson 1', lesson_order: 1 }],
      progresses: [
        {
          video: { status: ActivityProgressStatus.COMPLETED, watchPercent: 100 },
          quiz: { status: ActivityProgressStatus.IN_PROGRESS, passed: false },
          assignment: { status: ActivityProgressStatus.LOCKED, passed: null },
          lessonStatus: ActivityProgressStatus.IN_PROGRESS,
          fullyCompleted: false,
        },
      ],
    });

    const detail = await service.getCourseProgressDetail('user-1', 'course-1');

    expect(detail.totalActivities).toBe(3);
    expect(detail.completedActivities).toBe(1);
    expect(detail.progressPercent).toBe(33.33);
  });
});
