import React, { useEffect, useState } from "react";
import {
  ArrowRightOutlined,
  BookOutlined,
  LoadingOutlined,
  StarFilled,
} from "@ant-design/icons";
import AnimateOnScroll from "../../../utils/animateOnScroll";
import { ICourse } from "../../../api/enrollment";
import { GetFeaturedCourses } from "../../../api/course";
import { useNavigate } from "react-router-dom";

type FeaturedCourse = ICourse & {
  totalEnrollments?: number;
};

const FeaturedCourses = () => {
  const [featuredCourses, setFeaturedCourses] = useState<FeaturedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await GetFeaturedCourses();
        setFeaturedCourses(data);
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <section
      id="tour-featured-courses"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#f7f8f4_0%,#edf5eb_100%)] py-14 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-700/20 to-transparent" />
      <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-brand-300/20 blur-3xl" />
      <AnimateOnScroll>
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-9 px-5 sm:px-8 lg:px-10">
          {/* Header */}
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 flex w-fit items-center gap-2 rounded-full border border-brand-700/10 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-600 shadow-sm">
                <StarFilled className="text-brand-500" />
                Được học viên lựa chọn
              </p>
              <h2 className="text-3xl font-black tracking-tight text-brand-900 sm:text-4xl">
                Khóa học nổi bật
              </h2>
              <p className="mt-3 text-sm leading-6 text-brand-800/65 sm:text-base">
                Những lộ trình đang được quan tâm nhất, phù hợp để bắt đầu nhanh và học có định hướng.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/course")}
              className="flex w-fit items-center gap-2 rounded-2xl border border-brand-700/10 bg-white px-5 py-3 text-sm font-bold text-brand-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-brand-600/30 hover:shadow-[0_16px_34px_rgba(31,45,39,0.12)] active:scale-[0.98]"
            >
              Xem tất cả <ArrowRightOutlined />
            </button>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center rounded-[2rem] border border-brand-700/10 bg-white/70 shadow-sm">
              <LoadingOutlined className="text-4xl text-brand-700" />
            </div>
          ) : featuredCourses.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-brand-700/20 bg-white/70 px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-2xl text-brand-700">
                <BookOutlined />
              </div>
              <div className="mt-4 text-lg font-black text-brand-900">
                Chưa có khóa học nổi bật
              </div>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-brand-800/65">
                Các khóa học được đề xuất sẽ xuất hiện tại đây khi hệ thống có dữ liệu phù hợp.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featuredCourses.map((item) => (
                <div
                  key={item._id}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/course/${item._id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigate(`/course/${item._id}`);
                    }
                  }}
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-brand-700/10 bg-white shadow-[0_18px_44px_rgba(31,45,39,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-brand-500/25 hover:shadow-[0_28px_70px_rgba(31,45,39,0.16)]"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-brand-100">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/75 via-brand-900/5 to-transparent opacity-90" />
                    <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-brand-800 shadow-sm">
                      {item.category?.category_name || "Khóa học"}
                    </div>
                    <div className="absolute bottom-4 right-4 rounded-full bg-brand-700 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-brand-25 shadow-sm">
                      {item.level}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
                    <div className="flex flex-col gap-3">
                      <div className="line-clamp-2 min-h-[3.5rem] text-lg font-black leading-7 text-brand-900">
                        {item.title}
                      </div>
                      <div className="line-clamp-2 text-sm leading-6 text-brand-800/65">
                        {item.description}
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-brand-700/10 pt-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-brand-700">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                          <BookOutlined />
                        </span>
                        <span>{item.totalEnrollments || 0} học viên</span>
                      </div>
                      <div className="shrink-0 text-base font-black text-brand-800">
                        {Number(item.price || 0) === 0
                          ? "Miễn phí"
                          : `${Number(item.price || 0).toLocaleString("vi-VN")}đ`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default FeaturedCourses;
