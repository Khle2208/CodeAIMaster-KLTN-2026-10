import { useEffect, useMemo, useState } from "react";
import { GetHistoryOrder, type OrderItem } from "../../api/order/HistoryOrder";
import type { OrderStatus, PurchaseItem } from "../../types/purchase/purchase";
import EmptyState from "../../components/purchase/empty-state/EmptyState";
import OrderCard from "../../components/purchase/order-card/OrderCard";
import SearchBox from "../../components/purchase/search-box/SearchBox";
import StatusFilter from "../../components/purchase/status-fillter/StatusFilter";
import Footer from "../../components/footer";

type FilterValue = "all" | OrderStatus;

const PurchaseHistoryContent = () => {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [orders, setOrders] = useState<PurchaseItem[]>([]);
  const [loading, setLoading] = useState(false);

  const mapOrderStatus = (status: string): OrderStatus => {
    switch (status) {
      case "pending":
        return "pending";
      case "failed":
      case "cancelled":
        return "failed";
      case "paid":
      case "completed":
      case "success":
      default:
        return "paid";
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return "0đ";
    return `${price.toLocaleString("vi-VN")}đ`;
  };

  const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("vi-VN");
  };

  const mapApiOrderToPurchaseItem = (order: OrderItem): PurchaseItem => {
    return {
      id: order._id,
      typeLabel: "Khóa học trực tuyến",
      title:
        order.course_name ||
        order.title ||
        order.product_name ||
        "Đơn hàng khóa học",
      date: formatDate(order.createdAt),
      paymentMethod:
        order.payment_method || order.paymentMethod || "Thanh toán online",
      total: formatPrice(order.total_price),
      status: mapOrderStatus(order.status),
      thumbnail:
        order.thumbnail ||
        order.image ||
        "https://via.placeholder.com/300x200?text=Course",
    };
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await GetHistoryOrder({
          current: 1,
          pageSize: 50,
        });

        const mappedOrders = (res.data.results || []).map(
          mapApiOrderToPurchaseItem,
        );
        setOrders(mappedOrders);
      } catch (error) {
        console.error("Lỗi lấy lịch sử đơn hàng:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return orders.filter((item) => {
      const matchStatus =
        activeFilter === "all" ? true : item.status === activeFilter;

      const matchSearch =
        keyword === "" ||
        item.title.toLowerCase().includes(keyword) ||
        item.typeLabel.toLowerCase().includes(keyword) ||
        item.paymentMethod.toLowerCase().includes(keyword);

      return matchStatus && matchSearch;
    });
  }, [orders, activeFilter, searchKeyword]);

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-6 py-10 md:px-8 md:py-12">
        <div className="mb-10">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-[#23422a] md:text-5xl">
            Lịch sử mua hàng
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[#424842] md:text-lg">
            Xem lại các khóa học bạn đã mua và theo dõi trạng thái thanh toán
            một cách trực quan, rõ ràng.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <StatusFilter
            activeFilter={activeFilter}
            onChange={setActiveFilter}
          />
          <SearchBox value={searchKeyword} onChange={setSearchKeyword} />
        </div>

        {loading ? (
          <div className="py-10 text-center text-[#424842]">
            Đang tải dữ liệu...
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-5">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      <Footer />
    </>
  );
};

export default PurchaseHistoryContent;
