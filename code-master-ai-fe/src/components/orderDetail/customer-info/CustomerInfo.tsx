import React from "react";
import type { CustomerInfo as CustomerInfoType } from "../../../types/order/order";

type Props = {
  customer: CustomerInfoType;
};

const CustomerInfo: React.FC<Props> = ({ customer }) => {
  return (
    <div className="bg-[#f5f1e8] p-8 rounded-2xl space-y-6">
      <h3 className="text-sm font-semibold text-[#6b7280] uppercase tracking-widest">
        Thông tin khách hàng
      </h3>

      <div className="space-y-4">
        <div>
          <div className="text-xs text-[#6b7280] font-medium mb-1">Tên</div>
          <div className="font-semibold text-[#23422a]">{customer.name}</div>
        </div>

        <div>
          <div className="text-xs text-[#6b7280] font-medium mb-1">Email</div>
          <div className="font-semibold text-[#23422a]">{customer.email}</div>
        </div>

        <div>
          <div className="text-xs text-[#6b7280] font-medium mb-1">
            Ngày thanh toán
          </div>
          <div className="font-semibold text-[#23422a]">{customer.paidAt}</div>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-[#ddd7ca]">
        <div className="flex items-center gap-2 text-[#23422a] font-semibold text-sm">
          Giao dịch an toàn
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
