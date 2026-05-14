import mongoose from 'mongoose';

type LegacyUserLessonProgress = {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | string;
  courseId: mongoose.Types.ObjectId | string;
  lessonId: mongoose.Types.ObjectId | string;
  watchPercent?: number;
  isCompleted?: boolean;
  completedAt?: Date | null;
  schemaVersion?: number;
};

async function main() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI is required');
  }

  await mongoose.connect(mongoUri);
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('Mongo database connection is not ready');
  }

  const progressCollection = db.collection('userlessonprogresses');
  const submissionCollection = db.collection('submissions');
  const codeAssignmentCollection = db.collection('codeassignments');
  const assignmentCollection = db.collection('assignments');
  const lessonCollection = db.collection('lessons');

  const legacyDocs = (await progressCollection
    .find({
      $or: [{ schemaVersion: { $exists: false } }, { schemaVersion: { $lt: 2 } }],
    })
    .toArray()) as LegacyUserLessonProgress[];

  for (const legacy of legacyDocs) {
    const userId = new mongoose.Types.ObjectId(String(legacy.userId));
    const courseId = new mongoose.Types.ObjectId(String(legacy.courseId));
    const lessonId = new mongoose.Types.ObjectId(String(legacy.lessonId));

    const watchPercent = Math.max(
      0,
      Math.min(100, Math.round(legacy.watchPercent ?? 0)),
    );
    const videoCompleted = watchPercent >= 100 || legacy.isCompleted === true;

    const acceptedSubmission = await submissionCollection.findOne({
      user_id: userId,
      status: 'ACCEPTED',
    });

    let assignmentCompleted = false;
    if (acceptedSubmission?.codeAssignment_id) {
      const codeAssignment = await codeAssignmentCollection.findOne({
        _id: acceptedSubmission.codeAssignment_id,
      });
      if (codeAssignment?.assignment_id) {
        const assignment = await assignmentCollection.findOne({
          _id: codeAssignment.assignment_id,
        });
        assignmentCompleted = String(assignment?.lesson_id) === String(lessonId);
      }
    }

    const lesson = await lessonCollection.findOne({ _id: lessonId });
    const lessonOrder = lesson?.lesson_order ?? 0;

    await progressCollection.updateOne(
      { _id: legacy._id, schemaVersion: { $ne: 2 } },
      {
        $set: {
          userId,
          courseId,
          lessonId,
          lessonOrder,
          video: {
            status: videoCompleted ? 'COMPLETED' : 'IN_PROGRESS',
            watchPercent,
            unlockedAt: lessonOrder === 1 ? legacy.completedAt ?? new Date() : null,
            completedAt: videoCompleted ? legacy.completedAt ?? new Date() : null,
          },
          quiz: {
            status: 'LOCKED',
            score: null,
            passed: null,
            attemptsCount: 0,
            lastSubmissionId: null,
            submittedAt: null,
            completedAt: null,
          },
          assignment: {
            status: assignmentCompleted ? 'COMPLETED' : 'LOCKED',
            score: null,
            passed: assignmentCompleted ? true : null,
            attemptsCount: 0,
            lastSubmissionId: null,
            submittedAt: null,
            completedAt: assignmentCompleted ? legacy.completedAt ?? new Date() : null,
          },
          lessonStatus: assignmentCompleted && videoCompleted ? 'IN_PROGRESS' : 'IN_PROGRESS',
          fullyCompleted: false,
          unlockedAt: lessonOrder === 1 ? legacy.completedAt ?? new Date() : null,
          completedAt: null,
          schemaVersion: 2,
        },
        $unset: {
          status: '',
          watchPercent: '',
          isCompleted: '',
        },
      },
    );
  }

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error('[migrate-user-lesson-progress-v2] failed', error);
  process.exitCode = 1;
});
