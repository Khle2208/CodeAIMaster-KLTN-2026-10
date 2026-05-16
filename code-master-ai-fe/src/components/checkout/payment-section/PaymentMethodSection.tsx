import React from "react";
import MomoLogo from "../../../assets/MomoLogo.png";
import VNPayLogo from "../../../assets/VNPayLogo.jpg";
import { Wallet, CircleCheck } from "lucide-react";
import type { CheckoutFormData } from "../../../types/checkout/checkout";

interface PaymentMethodSectionProps {
  paymentMethod: CheckoutFormData["paymentMethod"];
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

const PaymentMethodSection = ({
  paymentMethod,
  onChange,
}: PaymentMethodSectionProps) => {
  const methods = [
    {
      value: "momo",
      icon: MomoLogo,
      title: "Ví Momo",
      // desc: "Vietcombank, Techcombank, MB Bank...",
    },
    {
      value: "vnpay",
      icon: VNPayLogo,
      title: "Ví VNPay",
      // desc: "Momo, ZaloPay, ShopeePay",
    },
  ] as const;

  return (
    <section className="rounded-[2rem] border border-brand-700/10 bg-white/90 p-5 shadow-[0_18px_44px_rgba(31,45,39,0.08)] sm:p-6">
      <div className="mb-6 flex items-center gap-3 border-b border-brand-700/10 pb-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
          <Wallet />
        </span>
        <div>
          <h2 className="text-xl font-black text-brand-900">
            Phương thức thanh toán
          </h2>
          <p className="mt-1 text-sm text-brand-800/65">
            Bạn sẽ được chuyển đến cổng thanh toán an toàn để hoàn tất giao dịch.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {methods.map((method) => {
          const active = paymentMethod === method.value;

          return (
            <label
              key={method.value}
              className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition-all ${
                active
                  ? "border-brand-600/35 bg-brand-50 shadow-[0_14px_34px_rgba(31,45,39,0.10)]"
                  : "border-brand-700/10 bg-brand-25/50 hover:border-brand-600/30 hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  checked={active}
                  className="text-brand-700 focus:ring-brand-600"
                  name="payment"
                  type="radio"
                  onChange={() => onChange("paymentMethod", method.value)}
                />
                <div className="flex items-center gap-4">
                  {/* <span
                    className={`material-symbols-outlined text-slate-600 p-2 rounded-md ${
                      active ? "bg-white shadow-sm" : "bg-slate-100"
                    }`}
                  >
                    {method.icon}
                  </span> */}

                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-700/10 ${
                      active ? "bg-white shadow-sm" : "bg-slate-100"
                    }`}
                  >
                    <img
                      src={method.icon}
                      alt={method.title}
                      className="h-8 w-8 object-contain"
                    />
                  </span>
                  <div>
                    <p className="font-black text-brand-900">{method.title}</p>
                    <p className="mt-1 text-xs font-medium text-brand-800/60">
                      Cổng thanh toán bảo mật
                    </p>
                    {/* <p className="text-xs text-slate-500">{method.desc}</p> */}
                  </div>
                </div>
              </div>

              {active && (
                <div className="flex gap-2 text-brand-700">
                  <span className="material-symbols-outlined text-sm">
                    <CircleCheck />
                  </span>
                </div>
              )}
            </label>
          );
        })}
      </div>
    </section>
  );
};

export default PaymentMethodSection;
