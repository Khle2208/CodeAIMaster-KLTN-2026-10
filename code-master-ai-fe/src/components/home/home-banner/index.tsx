import React from "react";
import codeEditorImg from "../../../assets/Code Editor.png";
import { useNavigate } from "react-router-dom";
import AnimateOnScroll from "../../../utils/animateOnScroll";
import { driver } from "driver.js";
import type { DriveStep } from "driver.js";
import "driver.js/dist/driver.css";

const HomeBaner = () => {
    const navigate = useNavigate();

    const startTour = () => {
        const isVisibleElement = (selector: string) => {
            const element = document.querySelector(selector);

            if (!element) return false;

            const rect = element.getBoundingClientRect();

            return rect.width > 0 && rect.height > 0;
        };

        const allTourSteps: DriveStep[] = [
            { element: '#tour-banner-title', popover: { title: 'CodeMaster AI', description: 'Nền tảng học tập lập trình AI thế hệ mới, giúp bạn nâng tầm kỹ năng từ con số 0.', align: 'start' } },
            { element: '#tour-nav-links', popover: { title: 'Thanh Điều Hướng', description: 'Chuyển đổi giữa các trang: Trang chủ, Giới thiệu, Khóa học nhanh chóng.', align: 'start', side: "bottom" } },
            { element: '#tour-search', popover: { title: 'Tìm Kiếm Khóa Học', description: 'Gõ từ khóa để tìm các khóa học bạn quan tâm.', align: 'start', side: "bottom" } },
            { element: '#tour-auth', popover: { title: 'Tài khoản & Giỏ Hàng', description: 'Quản lý thông tin cá nhân và xem giỏ hàng của bạn.', align: 'start', side: "bottom" } },
            { element: '#tour-start-learning', popover: { title: 'Bắt Đầu Ngay', description: 'Nhấn vào đây để xem trực tiếp danh sách khóa học.', align: 'start', side: "right" } },
            { element: '#tour-featured-courses', popover: { title: 'Khóa Học Nổi Bật', description: 'Các khóa học được nhiều học viên đăng ký nhất.', align: 'start', side: "top" } },
            { element: '#tour-home-route', popover: { title: 'Lộ Trình Học Tập', description: 'Khám phá quy trình học khép kín từ Lý thuyết đến Thực hành code.', align: 'start', side: "top" } },
        ];

        const tourSteps = allTourSteps.filter((step) => (
            typeof step.element === "string" && isVisibleElement(step.element)
        ));

        const driverObj = driver({
            showProgress: true,
            animate: true,
            stagePadding: window.innerWidth < 640 ? 4 : 10,
            popoverClass: "driverjs-theme-codemaster",
            nextBtnText: 'Tiếp tục',
            prevBtnText: 'Quay lại',
            doneBtnText: 'Hoàn thành',
            steps: tourSteps
        });

        driverObj.drive();
    };

    const featureBadges = ["AI Mentor", "Dự án thực tế", "Lộ trình cá nhân hóa"];

    return (
        <section className="relative flex min-h-[90vh] w-full items-center overflow-hidden bg-[linear-gradient(135deg,#f3f2ef_0%,#edf5eb_42%,#dcead9_100%)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(88,129,87,0.16),transparent_30%),linear-gradient(90deg,rgba(52,78,65,0.07)_1px,transparent_1px),linear-gradient(0deg,rgba(52,78,65,0.06)_1px,transparent_1px)] bg-[length:auto,56px_56px,56px_56px]" />
            <div className="pointer-events-none absolute right-0 top-20 hidden h-72 w-1/3 rounded-l-[48px] border border-brand-700/10 bg-brand-25/45 lg:block" />

            <div className="relative mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-12 px-5 py-12 sm:px-8 md:py-16 lg:flex-row lg:gap-14 lg:px-10">

                {/* Text */}
                <AnimateOnScroll defaultClasses="opacity-0 -translate-x-10">
                    <div className="flex flex-1 flex-col justify-center text-center lg:text-left">
                        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-brand-700/10 bg-brand-25/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-700 shadow-sm lg:mx-0">
                            <span className="h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_0_5px_rgba(88,129,87,0.14)]"></span>
                            Nền tảng học lập trình cùng AI
                        </div>

                        <div id="tour-banner-title" className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-brand-900 sm:text-5xl lg:text-6xl">
                            Học lập trình cùng mentor AI
                        </div>

                        <div className="mx-auto mt-5 max-w-2xl text-base leading-7 text-brand-800/75 sm:text-lg lg:mx-0 lg:max-w-xl">
                            Xây nền tảng bài bản, luyện kỹ năng qua dự án thật và nhận gợi ý học tập thông minh theo tiến độ của bạn.
                        </div>

                        <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                            {featureBadges.map((badge) => (
                                <span
                                    key={badge}
                                    className="rounded-full border border-brand-700/10 bg-brand-25/80 px-4 py-2 text-sm font-semibold text-brand-800 shadow-sm"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>

                        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                            <button
                                type="button"
                                id="tour-start-learning"
                                onClick={() => navigate("/course")}
                                className="w-full cursor-pointer rounded-2xl bg-brand-700 px-6 py-3 text-sm font-bold text-brand-25 shadow-[0_18px_36px_rgba(52,78,65,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-[0_22px_44px_rgba(52,78,65,0.34)] sm:w-auto sm:text-base"
                            >
                                Bắt đầu học ngay
                            </button>
                            <button
                                type="button"
                                onClick={startTour}
                                className="w-full cursor-pointer rounded-2xl border border-brand-700/15 bg-brand-25/85 px-6 py-3 text-sm font-bold text-brand-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-brand-600/30 hover:bg-white hover:shadow-[0_16px_32px_rgba(31,45,39,0.12)] sm:w-auto sm:text-base"
                            >
                                Xem hướng dẫn
                            </button>
                        </div>
                    </div>
                </AnimateOnScroll>

                {/* Image */}
                <AnimateOnScroll defaultClasses="opacity-0 translate-x-10">
                    <div className="flex w-full flex-1 justify-center lg:justify-end">
                        <div className="relative w-full max-w-[560px]">
                            <div className="absolute -left-3 top-8 hidden rounded-2xl border border-brand-700/10 bg-brand-25 px-4 py-3 text-left shadow-[0_18px_40px_rgba(31,45,39,0.16)] sm:block">
                                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">AI Mentor</div>
                                <div className="mt-1 text-sm font-bold text-brand-900">Gợi ý bước học tiếp theo</div>
                            </div>

                            <div className="absolute -bottom-5 right-2 z-10 hidden rounded-2xl border border-brand-700/10 bg-brand-900 px-4 py-3 text-left text-brand-25 shadow-[0_18px_40px_rgba(31,45,39,0.22)] sm:block">
                                <div className="text-xs font-semibold text-brand-100">Project Lab</div>
                                <div className="mt-1 text-sm font-bold">Thực hành ngay trong lộ trình</div>
                            </div>

                            <div className="rounded-[2rem] border border-brand-700/10 bg-brand-25/80 p-3 shadow-[0_30px_80px_rgba(52,78,65,0.22)]">
                                <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(52,78,65,0.10),rgba(163,177,138,0.28))] p-3">
                                    <img
                                        src={codeEditorImg}
                                        alt="Code Editor"
                                        className="w-full rounded-[1.25rem] border border-brand-700/10 object-cover shadow-[0_18px_44px_rgba(31,45,39,0.18)]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimateOnScroll>

            </div>
        </section>
    );
};

export default HomeBaner;
