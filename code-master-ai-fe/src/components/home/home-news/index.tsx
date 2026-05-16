import React, { useEffect, useState } from "react";
import { CalendarOutlined, ExportOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AnimateOnScroll from "../../../utils/animateOnScroll";
import axiosInstance from "../../../utils/axios";
import { Empty } from "antd";

interface IBlog {
  _id: string;
  title: string;
  short_description: string;
  cover_image: string;
  createdAt: string;
}

const HomeNews = () => {
  const [posts, setPosts] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/blogs");
        const data: IBlog[] = res.data?.data ?? res.data ?? [];
        setPosts(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (e) {
        console.error("Lỗi tải tin tức trang chủ:", e);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <AnimateOnScroll>
      <section className="bg-brand-25 px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 flex w-fit items-center gap-2 rounded-full border border-brand-700/10 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-600 shadow-sm">
              Cập nhật tri thức
            </p>
            <h2 className="text-3xl font-black tracking-tight text-brand-900 sm:text-4xl">
              Tin tức công nghệ
            </h2>
            <p className="mt-3 text-sm leading-6 text-brand-800/65 sm:text-base">
              Góc đọc ngắn gọn để theo kịp xu hướng lập trình, AI và cách học hiệu quả hơn.
            </p>
          </div>
          <Link
            to="/blog"
            className="flex w-fit items-center gap-2 rounded-2xl border border-brand-700/10 bg-white px-5 py-3 text-sm font-bold text-brand-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-brand-600/30 hover:shadow-[0_16px_34px_rgba(31,45,39,0.12)]"
          >
            Xem tất cả tin
            <ExportOutlined />
          </Link>
        </div>

        {loading ? (
          <div className="flex min-h-[260px] items-center justify-center rounded-[2rem] border border-brand-700/10 bg-white shadow-sm">
            <LoadingOutlined className="text-4xl text-brand-700" />
          </div>
        ) : posts.length === 0 ? (
          <div className="flex justify-center rounded-[2rem] border border-dashed border-brand-700/20 bg-white px-6 py-16 shadow-sm">
            <Empty description="Chưa có bài viết" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/blog/${post._id}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-brand-700/10 bg-white shadow-[0_16px_40px_rgba(31,45,39,0.07)] transition duration-300 hover:-translate-y-1.5 hover:border-brand-500/25 hover:shadow-[0_26px_64px_rgba(31,45,39,0.14)]"
              >
                <div className="relative h-52 overflow-hidden bg-brand-100 sm:h-60">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-brand-800 shadow-sm">
                    Cập nhật
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-700/70">
                    <CalendarOutlined />
                    {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                  <h3 className="line-clamp-2 text-lg font-black leading-7 text-brand-900">
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 flex-1 text-sm leading-6 text-brand-800/65">
                    {post.short_description}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-bold text-brand-700 transition group-hover:gap-3">
                    Đọc thêm
                    <ExportOutlined />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
        </div>
      </section>
    </AnimateOnScroll>
  );
};

export default HomeNews;
