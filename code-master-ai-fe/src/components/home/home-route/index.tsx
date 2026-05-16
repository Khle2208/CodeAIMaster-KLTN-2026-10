import React from "react";
import { BookOpen, Pencil, HelpCircle, Code } from "lucide-react";
import AnimateOnScroll from "../../../utils/animateOnScroll";

interface FeatureItem {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
}

const featureList: FeatureItem[] = [
    {
        id: 1,
        title: "Bài học",
        description: "Video bài giảng chất lượng cao, súc tích và dễ hiểu.",
        icon: <BookOpen size={20} />,
    },
    {
        id: 2,
        title: "Bài tập",
        description: "Hệ thống bài tập vận dụng ngay sau mỗi kiến thức mới.",
        icon: <Pencil size={20} />,
    },
    {
        id: 3,
        title: "Quiz",
        description: "Kiểm tra nhanh kiến thức để củng cố nền tảng vững chắc.",
        icon: <HelpCircle size={20} />,
    },
    {
        id: 4,
        title: "Thực hành Code",
        description: "Code trực tiếp trên trình duyệt với sự hỗ trợ của AI.",
        icon: <Code size={20} />,
    },
];

const HomeRoute = () => {
    return (
        <AnimateOnScroll>
            <section id="tour-home-route" className="relative overflow-hidden bg-[linear-gradient(180deg,#f3f2ef_0%,#f8faf4_100%)] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
                <div className="pointer-events-none absolute left-0 top-16 h-72 w-72 rounded-full bg-brand-300/20 blur-3xl" />
                <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 sm:gap-12">

                {/* Header */}
                <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-3 text-center">
                    <div className="flex w-fit items-center gap-2 rounded-full border border-brand-700/10 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-600 shadow-sm">
                        Lộ trình khép kín
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-brand-900 sm:text-4xl">
                        Lộ trình học tập chuyên nghiệp
                    </h2>
                    <p className="max-w-2xl text-sm leading-6 text-brand-800/65 sm:text-base">
                        Chúng tôi xây dựng quy trình học khép kín giúp bạn không chỉ hiểu lý thuyết mà còn
                        thành thạo kỹ năng thực hành.
                    </p>
                </div>

                {/* Cards */}
                <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                    <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gradient-to-r from-brand-700/5 via-brand-700/25 to-brand-700/5 lg:block" />
                    {featureList.map((item, index) => (
                        <div
                            key={index}
                            className="group relative flex min-h-[260px] cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-brand-700/10 bg-white p-6 text-left shadow-[0_16px_40px_rgba(31,45,39,0.07)] transition duration-300 hover:-translate-y-1.5 hover:border-brand-500/25 hover:shadow-[0_26px_64px_rgba(31,45,39,0.14)]"
                        >
                            <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full bg-brand-100 transition duration-300 group-hover:bg-brand-200" />
                            <div className="absolute right-5 top-5 text-5xl font-black leading-none text-brand-100 transition duration-300 group-hover:text-brand-200">
                                {String(item.id).padStart(2, "0")}
                            </div>
                            <div className="relative mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 shadow-sm ring-1 ring-brand-700/10 transition duration-300 group-hover:bg-brand-700 group-hover:text-brand-25 lg:mx-auto">
                                {item.icon}
                            </div>
                            <div className="relative mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-brand-500 lg:text-center">
                                Bước {item.id}
                            </div>
                            <h3 className="relative text-xl font-black text-brand-900 lg:text-center">
                                {item.title}
                            </h3>
                            <p className="relative mt-3 text-sm leading-6 text-brand-800/65 lg:text-center">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                </div>
            </section>
        </AnimateOnScroll>
    );
};

export default HomeRoute;
