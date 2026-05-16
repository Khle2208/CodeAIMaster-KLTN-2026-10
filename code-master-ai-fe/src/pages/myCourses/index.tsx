import { useNavigate } from "react-router-dom";
import {
  getMyCourses,
  getCourseProgress,
  ICourseWithProgress,
} from "../../api/enrollment";
import React, { useEffect, useState } from "react";
import {
  ArrowRightOutlined,
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

type CourseFilter = "all" | "learning" | "completed";

const MyEnrollment: React.FC = () => {
  const [coursesData, setCourses] = useState<ICourseWithProgress[]>([]);
  const [activeFilter, setActiveFilter] = useState<CourseFilter>("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const courses = await getMyCourses();

        const coursesWithProgress = await Promise.all(
          courses.map(async (course: ICourseWithProgress) => {
            try {
              const progress = await getCourseProgress(course._id);

              return {
                ...course,
                progress,
              };
            } catch (error) {
              return {
                ...course,
                progress: {
                  courseId: course._id,
                  totalLessons: 0,
                  completedLessons: 0,
                  progressPercent: 0,
                },
              };
            }
          }),
        );

        setCourses(coursesWithProgress);
      } catch (error) {
        console.error("Lỗi:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCourses = coursesData.filter((course) => {
    const progressPercent = Number(course.progress?.progressPercent || 0);

    if (activeFilter === "completed") return progressPercent >= 100;
    if (activeFilter === "learning") return progressPercent < 100;

    return true;
  });

  const filterOptions: { label: string; value: CourseFilter }[] = [
    { label: "Tất cả", value: "all" },
    { label: "Đang học", value: "learning" },
    { label: "Hoàn thành", value: "completed" },
  ];

  const totalCourses = coursesData.length;
  const completedCourses = coursesData.filter(
    (course) => Number(course.progress?.progressPercent || 0) >= 100,
  ).length;
  const learningCourses = coursesData.filter(
    (course) => Number(course.progress?.progressPercent || 0) < 100,
  ).length;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f3f2ef_0%,#f8faf4_45%,#edf5eb_100%)] px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-brand-700/10 bg-brand-900 px-6 py-8 shadow-[0_24px_70px_rgba(31,45,39,0.20)] sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(163,177,138,0.26),transparent_32%),radial-gradient(circle_at_84%_12%,rgba(88,129,87,0.22),transparent_30%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-brand-25/15 bg-brand-25/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-100">
                <BookOutlined />
                Learning dashboard
              </div>
              <h1 className="text-3xl font-black tracking-tight text-brand-25 sm:text-4xl">
                Khóa học của tôi
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-100/80 sm:text-base">
                Tiếp tục học từ các khóa đã đăng ký, theo dõi tiến độ và quay lại bài học chỉ với một lần bấm.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="rounded-2xl border border-brand-25/15 bg-brand-25/10 px-4 py-3 text-brand-25">
                <div className="text-xl font-black">{totalCourses}</div>
                <div className="text-xs font-bold text-brand-100">Tổng khóa</div>
              </div>
              <div className="rounded-2xl border border-brand-25/15 bg-brand-25/10 px-4 py-3 text-brand-25">
                <div className="text-xl font-black">{learningCourses}</div>
                <div className="text-xs font-bold text-brand-100">Đang học</div>
              </div>
              <div className="rounded-2xl border border-brand-25/15 bg-brand-25/10 px-4 py-3 text-brand-25">
                <div className="text-xl font-black">{completedCourses}</div>
                <div className="text-xs font-bold text-brand-100">Hoàn thành</div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-brand-700/10 bg-white/85 p-4 shadow-[0_18px_44px_rgba(31,45,39,0.08)] sm:p-5">
          <div className="flex flex-col gap-4 border-b border-brand-700/10 pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-black text-brand-900">
                Danh sách khóa học
              </h2>
              <p className="mt-1 text-sm leading-6 text-brand-800/65">
                Lọc nhanh theo trạng thái học tập hiện tại của bạn.
              </p>
            </div>

            <div className="flex w-full gap-2 overflow-x-auto rounded-2xl bg-brand-25 p-1 md:w-auto md:overflow-visible">
              {filterOptions.map((option) => {
                const isActive = activeFilter === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => setActiveFilter(option.value)}
                    className={`shrink-0 rounded-xl px-5 py-2 text-sm font-bold transition ${
                      isActive
                        ? "bg-brand-800 text-brand-25 shadow-[0_12px_26px_rgba(52,78,65,0.24)]"
                        : "text-brand-800/65 hover:bg-white hover:text-brand-900"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {loading ? (
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-[1.75rem] border border-brand-700/10 bg-white shadow-[0_14px_34px_rgba(31,45,39,0.07)]"
                >
                  <div className="aspect-video bg-brand-100" />
                  <div className="space-y-3 p-5">
                    <div className="h-5 w-4/5 rounded-full bg-brand-100" />
                    <div className="h-4 w-full rounded-full bg-brand-100" />
                    <div className="h-4 w-2/3 rounded-full bg-brand-100" />
                    <div className="h-2 w-full rounded-full bg-brand-100" />
                    <div className="h-11 w-full rounded-2xl bg-brand-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="mt-6 rounded-[1.5rem] border border-dashed border-brand-700/20 bg-brand-25/70 px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-2xl text-brand-700">
                <BookOutlined />
              </div>
              <h3 className="mt-4 text-lg font-black text-brand-900">
                Bạn chưa có khóa học nào
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-brand-800/65">
                Khám phá thư viện khóa học để bắt đầu lộ trình học lập trình cùng CodeMaster AI.
              </p>
              <button
                type="button"
                onClick={() => navigate("/course")}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brand-700 px-5 py-3 text-sm font-bold text-brand-25 shadow-[0_14px_30px_rgba(52,78,65,0.24)] transition hover:-translate-y-0.5 hover:bg-brand-600"
              >
                Khám phá khóa học <ArrowRightOutlined />
              </button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course) => {
                const progressPercent = course.progress?.progressPercent || 0;
                const completedLessons = course.progress?.completedLessons || 0;
                const totalLessons = course.progress?.totalLessons || 0;
                const isCompleted = Number(progressPercent) >= 100;

                return (
                  <div
                    key={course._id}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-brand-700/10 bg-white shadow-[0_14px_34px_rgba(31,45,39,0.07)] transition duration-300 hover:-translate-y-1 hover:border-brand-500/25 hover:shadow-[0_24px_60px_rgba(31,45,39,0.13)]"
                  >
                    <div className="relative aspect-video overflow-hidden bg-brand-100">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/65 via-transparent to-transparent opacity-80" />
                      <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-brand-800 shadow-sm">
                        {course.category?.category_name || "Chưa phân loại"}
                      </div>
                      <div className={`absolute bottom-4 right-4 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] shadow-sm ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : "bg-brand-800 text-brand-25"
                      }`}>
                        {isCompleted ? "Hoàn thành" : "Đang học"}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-black leading-7 text-brand-900">
                        {course.title}
                      </h3>

                      <div className="mt-4 rounded-2xl border border-brand-700/10 bg-brand-25 p-4">
                        <div className="mb-2 flex items-center justify-between gap-3 text-xs font-bold text-brand-800/70">
                          <span className="flex items-center gap-1">
                            <ClockCircleOutlined />
                            Tiến độ {Math.round(Number(progressPercent))}%
                          </span>
                          <span>
                            {completedLessons}/{totalLessons} bài học
                          </span>
                        </div>

                        <div className="h-2 w-full overflow-hidden rounded-full bg-brand-100">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isCompleted ? "bg-emerald-500" : "bg-brand-700"
                            }`}
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3 text-sm font-bold text-brand-800/65">
                        <span className="flex items-center gap-2">
                          <CheckCircleOutlined className="text-brand-600" />
                          Đã mua
                        </span>
                        <span>{course.level}</span>
                      </div>

                      <button
                        onClick={() => navigate(`/learn/${course._id}`)}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-700 px-5 py-3 text-sm font-bold text-brand-25 shadow-[0_14px_30px_rgba(52,78,65,0.24)] transition hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-[0_18px_38px_rgba(52,78,65,0.30)]"
                      >
                        <PlayCircleOutlined />
                        Vào học ngay
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default MyEnrollment;
