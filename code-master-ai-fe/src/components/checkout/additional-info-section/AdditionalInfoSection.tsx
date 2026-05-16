import React from "react";
import { NotebookPen } from "lucide-react";
import type { CheckoutFormData } from "../../../types/checkout/checkout";

interface AdditionalInfoSectionProps {
  note: string;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

const AdditionalInfoSection = ({
  note,
  onChange,
}: AdditionalInfoSectionProps) => {
  return (
    <section className="rounded-[2rem] border border-brand-700/10 bg-white/90 p-5 shadow-[0_18px_44px_rgba(31,45,39,0.08)] sm:p-6">
      <div className="mb-6 flex items-center gap-3 border-b border-brand-700/10 pb-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
          <NotebookPen />
        </span>
        <div>
          <h2 className="text-xl font-black text-brand-900">Thông tin bổ sung</h2>
          <p className="mt-1 text-sm text-brand-800/65">
            Gửi thêm ghi chú nếu bạn cần hỗ trợ trong quá trình kích hoạt.
          </p>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-brand-900">
          Ghi chú đơn hàng (tùy chọn)
        </label>
        <textarea
          className="w-full rounded-2xl border border-brand-700/10 bg-brand-25/50 p-4 text-brand-900 outline-none transition focus:border-brand-600/35 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
          placeholder="Lưu ý về thời gian kích hoạt hoặc yêu cầu đặc biệt..."
          rows={3}
          value={note}
          onChange={(e) => onChange("note", e.target.value)}
        />
      </div>
    </section>
  );
};

export default AdditionalInfoSection;
