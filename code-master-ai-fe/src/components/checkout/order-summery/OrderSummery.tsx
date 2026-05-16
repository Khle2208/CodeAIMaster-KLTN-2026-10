import React from "react";
import {
  MoveRight,
  ShieldEllipsis,
  Landmark,
  CreditCard,
  Wallet2,
  ShieldCheck,
} from "lucide-react";

import OrderItem from "../order-item/OrderItem";
import type {
  CheckoutCourseItem,
  CheckoutSummary,
} from "../../../types/checkout/checkout";

interface OrderSummaryProps {
  items: CheckoutCourseItem[];
  summary: CheckoutSummary;
  onSubmit?: () => void;
}

const OrderSummary = ({ items, summary, onSubmit }: OrderSummaryProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="space-y-6 lg:sticky lg:top-28">
        <div className="rounded-[2rem] border border-brand-700/10 bg-white/95 p-5 shadow-[0_18px_44px_rgba(31,45,39,0.12)] sm:p-6">
          <div className="mb-6 border-b border-brand-700/10 pb-5">
            <h2 className="text-xl font-black text-brand-900">
              Đơn hàng của bạn
            </h2>
            <p className="mt-1 text-sm text-brand-800/65">
              Kiểm tra khóa học và tổng thanh toán trước khi xác nhận.
            </p>
          </div>

          <div className="mb-8 space-y-4">
            {items.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>

          <div className="mb-8 space-y-3 border-t border-brand-700/10 pt-5">
            <div className="flex justify-between text-sm font-medium text-brand-800/65">
              <span>Tạm tính</span>
              <span>{summary.subtotal.toLocaleString("vi-VN")}đ</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-brand-800/65">
              <span>Giảm giá</span>
              <span>- {summary.discount.toLocaleString("vi-VN")}đ</span>
            </div>
            <div className="flex items-end justify-between rounded-2xl bg-brand-900 px-4 py-4 text-brand-25">
              <span>Tổng cộng</span>
              <span className="text-2xl font-black">{summary.total.toLocaleString("vi-VN")}đ</span>
            </div>
          </div>

          <button
            onClick={onSubmit}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-700 px-5 py-4 font-bold text-brand-25 shadow-[0_14px_30px_rgba(52,78,65,0.24)] transition hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-[0_18px_38px_rgba(52,78,65,0.30)]"
          >
            <span>Xác nhận thanh toán</span>
            <span className="transition-transform group-hover:translate-x-1">
              <MoveRight />
            </span>
          </button>

          <p className="mt-3 text-center text-xs font-medium leading-5 text-brand-800/60">
            Bạn sẽ được chuyển đến cổng thanh toán an toàn để hoàn tất giao dịch.
          </p>

          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-700">
              <span>
                <ShieldEllipsis />
              </span>
              Thanh toán an toàn & bảo mật 256-bit
            </div>

            <div className="flex gap-4 text-brand-800/45">
              <span>
                <CreditCard />
              </span>
              <span>
                <Wallet2 />
              </span>
              <span>
                <Landmark />
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-[1.5rem] border border-brand-700/10 bg-white/80 p-5 shadow-sm">
          <div className="rounded-2xl bg-brand-100 p-3 text-brand-700 shadow-sm">
            <span>
              <ShieldCheck />
            </span>
          </div>
          <div className="text-xs leading-relaxed text-brand-800/65">
            <p className="mb-1 text-sm font-black text-brand-900">
              Cam kết hoàn tiền
            </p>
            <p>
              Hoàn trả 100% học phí trong vòng 7 ngày nếu bạn không hài lòng với
              nội dung khóa học.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
