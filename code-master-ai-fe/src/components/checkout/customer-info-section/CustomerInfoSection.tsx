import React from "react";
import { User } from "lucide-react";
import type { CheckoutFormData } from "../../../types/checkout/checkout";

interface CustomerInfoSectionProps {
  formData: CheckoutFormData;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

const CustomerInfoSection = ({
  formData,
  onChange,
}: CustomerInfoSectionProps) => {
  return (
    <section className="rounded-[2rem] border border-brand-700/10 bg-white/90 p-5 shadow-[0_18px_44px_rgba(31,45,39,0.08)] sm:p-6">
      <div className="mb-6 flex items-center gap-3 border-b border-brand-700/10 pb-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
          <User />
        </span>
        <div>
          <h2 className="text-xl font-black text-brand-900">
            Thông tin khách hàng
          </h2>
          <p className="mt-1 text-sm text-brand-800/65">
            Thông tin dùng để xác nhận và kích hoạt khóa học.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-bold text-brand-900">
            Họ và tên
          </label>
          <input
            className="w-full rounded-2xl border border-brand-700/10 bg-brand-25/50 p-4 text-brand-900 outline-none transition focus:border-brand-600/35 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
            placeholder="Nguyễn Văn A"
            type="text"
            value={formData.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-brand-900">
            Email
          </label>
          <input
            className="w-full rounded-2xl border border-brand-700/10 bg-brand-25/50 p-4 text-brand-900 outline-none transition focus:border-brand-600/35 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
            placeholder="email@vi-du.com"
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-brand-900">
            Số điện thoại
          </label>
          <input
            className="w-full rounded-2xl border border-brand-700/10 bg-brand-25/50 p-4 text-brand-900 outline-none transition focus:border-brand-600/35 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
            placeholder="090 123 4567"
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};

export default CustomerInfoSection;
