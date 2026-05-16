import React from "react";
import type { CheckoutCourseItem } from "../../../types/checkout/checkout";

interface OrderItemProps {
  item: CheckoutCourseItem;
}

const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <div className="flex gap-4 rounded-2xl border border-brand-700/10 bg-brand-25/70 p-3">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-brand-700/10 bg-brand-100">
        <img
          alt={item.title}
          className="h-full w-full object-cover"
          src={item.image}
        />
      </div>

      <div className="flex-1">
        <p className="line-clamp-2 text-sm font-black leading-tight text-brand-900">
          {item.title}
        </p>
        <p className="mt-2 text-sm font-bold text-brand-700">
          {item.price.toLocaleString("vi-VN")}đ
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
