import React from "react";
import { useNavigate } from "react-router-dom";
import AnimateOnScroll from "../../../utils/animateOnScroll";

type CTASectionProps = {
    title?: string;
    description?: string;
    primaryText?: string;
    secondaryText?: string;
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
};

export default function CTASection({
    title = "Tham gia ngay hôm nay",
    description = "Bắt đầu hành trình chinh phục code và mở ra cơ hội nghề nghiệp không giới hạn trong kỷ nguyên AI.",
    primaryText = "Đăng ký ngay",
    secondaryText = "Tư vấn lộ trình",
    onPrimaryClick,
    onSecondaryClick,
}: CTASectionProps) {
    const navigate = useNavigate();

    const handlePrimaryClick = () => {
        if (onPrimaryClick) {
            onPrimaryClick();
        } else {
            navigate("/register");
        }
    };

    return (
        <AnimateOnScroll>
            <section className="bg-[linear-gradient(180deg,#f8faf4_0%,#edf5eb_100%)] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
                <div className="mx-auto max-w-7xl">
                    <div className="relative overflow-hidden rounded-[2rem] border border-brand-700/10 bg-brand-900 px-6 py-12 text-center shadow-[0_30px_80px_rgba(31,45,39,0.24)] sm:py-16 md:px-10 md:py-20">

                        {/* Background accents */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(163,177,138,0.28),transparent_32%),radial-gradient(circle_at_82%_20%,rgba(88,129,87,0.28),transparent_30%),linear-gradient(90deg,rgba(243,242,239,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(243,242,239,0.05)_1px,transparent_1px)] bg-[length:auto,64px_64px,64px_64px]" />
                        <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-brand-300/20 blur-3xl" />
                        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
                        <div className="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand-25/10 blur-2xl" />

                        <div className="relative mx-auto max-w-3xl">
                            <div className="mx-auto mb-5 flex w-fit items-center rounded-full border border-brand-25/15 bg-brand-25/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-100">
                                Sẵn sàng bắt đầu
                            </div>

                            <h2 className="text-3xl font-black tracking-tight text-brand-25 sm:text-4xl md:text-5xl">
                                {title}
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-brand-100/85 sm:mt-5 sm:text-lg">
                                {description}
                            </p>

                            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                                <button
                                    type="button"
                                    onClick={handlePrimaryClick}
                                    className="min-w-[190px] w-full rounded-2xl bg-brand-25 px-8 py-3 text-base font-bold text-brand-800 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_24px_52px_rgba(0,0,0,0.22)] sm:w-auto sm:py-4 sm:text-lg"
                                >
                                    {primaryText}
                                </button>

                                <button
                                    type="button"
                                    onClick={onSecondaryClick}
                                    className="min-w-[190px] w-full rounded-2xl border border-brand-25/20 bg-brand-25/10 px-8 py-3 text-base font-bold text-brand-25 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-brand-25/15 sm:w-auto sm:py-4 sm:text-lg"
                                >
                                    {secondaryText}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </AnimateOnScroll>
    );
}
