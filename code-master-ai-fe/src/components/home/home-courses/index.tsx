import React, { useEffect } from "react";
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { GetCategoryNames } from "../../../data/course";
import { GetCourses } from "../../../api/course";
import { ICourse } from "../../../pages/course";
import AnimateOnScroll from "../../../utils/animateOnScroll";
import { useCourseStore } from "../../../store/course";
import { Empty } from "antd";
import { useNavigate } from "react-router-dom";

const HomeCourses = () => {
  const [selectedCategory, setSelectedCategory] =
    React.useState<string>("Tất cả");
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const [categories, setCategories] = React.useState<string[]>(["Tất cả"]);
  const { setGlobalCourses } = useCourseStore();
  const [loading, setLoading] = React.useState<boolean>(true);
  const navigate = useNavigate();
  const filteredCourses =
    selectedCategory === "Tất cả"
      ? courses.slice(0, 2)
      : courses
          .filter(
            (course) => course.category.category_name === selectedCategory,
          )
          .slice(0, 2);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const [coursesRes, categoryNames] = await Promise.all([
          GetCourses(),
          GetCategoryNames(),
        ]);
        setCourses(coursesRes.data);
        setGlobalCourses(coursesRes.data);
        setCategories(["Tất cả", ...categoryNames]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [setGlobalCourses]);

  return (
    <AnimateOnScroll>
      <div className="w-full bg-brand-25 px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        {/* Title */}
        <div className="flex flex-col gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div className="max-w-2xl">
            <p className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full border border-brand-700/10 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-600 shadow-sm md:mx-0">
              <CheckCircleFilled className="text-brand-500" />
              Khám phá theo nhu cầu
            </p>
            <h2 className="text-3xl font-black tracking-tight text-brand-900 sm:text-4xl">
              Tất cả khóa học
            </h2>
            <p className="mt-3 text-sm leading-6 text-brand-800/65 sm:text-base">
              Chọn danh mục phù hợp và xem nhanh những khóa học đang sẵn sàng để bắt đầu.
            </p>
          </div>
          <div className="rounded-2xl border border-brand-700/10 bg-white px-4 py-3 text-sm font-semibold text-brand-800 shadow-sm">
            {filteredCourses.length} khóa học hiển thị
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible">
          {categories.map((item, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setSelectedCategory(item)}
              className={`w-fit shrink-0 rounded-full px-4 py-2 text-xs font-bold transition duration-300 sm:px-5 sm:text-sm
                                ${
                                  selectedCategory === item
                                    ? "bg-brand-800 text-brand-25 shadow-[0_12px_26px_rgba(52,78,65,0.24)]"
                                    : "border border-brand-700/10 bg-white text-brand-800 shadow-sm hover:-translate-y-0.5 hover:border-brand-600/30 hover:bg-brand-50"
                                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Course list */}
        {loading ? (
          <div className="flex min-h-[260px] items-center justify-center rounded-[2rem] border border-brand-700/10 bg-white shadow-sm">
            <LoadingOutlined className="text-4xl text-brand-700" />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="flex justify-center rounded-[2rem] border border-dashed border-brand-700/20 bg-white px-6 py-16 shadow-sm">
            <Empty description="Không có khóa học phù hợp" />
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredCourses.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col gap-4 rounded-[1.75rem] border border-brand-700/10 bg-white p-4 shadow-[0_16px_40px_rgba(31,45,39,0.07)] transition duration-300 hover:-translate-y-1 hover:border-brand-500/25 hover:shadow-[0_24px_60px_rgba(31,45,39,0.13)] sm:flex-row sm:items-center sm:justify-between sm:p-5"
              >
                {/* Left */}
                <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-brand-100 sm:h-28 sm:w-52 sm:shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-brand-800 shadow-sm">
                      {item.category?.category_name}
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-col gap-2">
                    <div className="line-clamp-2 text-lg font-black leading-7 text-brand-900">
                      {item.title}
                    </div>
                    <div className="line-clamp-2 text-sm leading-6 text-brand-800/65">
                      {item.description}
                    </div>
                    <div className="flex w-fit items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700">
                      {`Level: ${item.level}`}
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-row items-center justify-between gap-3 border-t border-brand-700/10 pt-4 sm:min-w-[180px] sm:flex-col sm:justify-center sm:border-t-0 sm:pt-0 lg:flex-row lg:justify-end">
                  <div className="text-lg font-black text-brand-800">
                    {Number(item.price || 0) === 0
                      ? "Miễn phí"
                      : `${item.price.toLocaleString("vi-VN")}đ`}
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate(`/course/${item._id}`)}
                    className="flex items-center gap-2 rounded-2xl bg-brand-700 px-4 py-3 text-sm font-bold text-brand-25 shadow-[0_12px_26px_rgba(52,78,65,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-[0_16px_34px_rgba(52,78,65,0.28)]"
                  >
                    Xem chi tiết <ArrowRightOutlined />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load more */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/course")}
            className="flex items-center gap-2 rounded-2xl border border-brand-700/15 bg-white px-6 py-3 text-sm font-bold text-brand-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-brand-600/30 hover:shadow-[0_16px_34px_rgba(31,45,39,0.12)] sm:text-base"
          >
            Tải thêm khóa học <ArrowRightOutlined />
          </button>
        </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
};

export default HomeCourses;
