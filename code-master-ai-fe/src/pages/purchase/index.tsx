// import { useEffect, useMemo, useState } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GetHistoryOrder, type OrderItem } from "../../api/order/HistoryOrder";
import type { OrderStatus, PurchaseItem } from "../../types/purchase/purchase";
import EmptyState from "../../components/purchase/empty-state/EmptyState";
import OrderCard from "../../components/purchase/order-card/OrderCard";
import SearchBox from "../../components/purchase/search-box/SearchBox";
import StatusFilter from "../../components/purchase/status-fillter/StatusFilter";
import Footer from "../../components/footer";
import {
  FileDoneOutlined,
  LoadingOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

type FilterValue = "all" | OrderStatus;

const PurchaseHistoryContent = () => {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [orders, setOrders] = useState<PurchaseItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

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

  const mapApiOrderToPurchaseItem = useCallback(
    (order: OrderItem): PurchaseItem => {
      const firstOrderDetail = order.orderDetails?.[0];
      const firstCourse = firstOrderDetail?.course;

      return {
        id: order._id,
        typeLabel: "Khóa học trực tuyến",
        title: firstCourse?.title || "Đơn hàng khóa học",
        date: formatDate(order.createdAt),
        paymentMethod: "Thanh toán online",
        total: formatPrice(order.total_price),
        status: mapOrderStatus(order.status),
        thumbnail:
          order.firstCourseImage ||
          firstCourse?.thumbnail ||
          "https://via.placeholder.com/300x200?text=Course",
      };
    },
    [],
  );

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const apiStatus =
          activeFilter === "all"
            ? undefined
            : activeFilter === "failed"
              ? "cancelled"
              : activeFilter;

        const res = await GetHistoryOrder({
          current: currentPage,
          pageSize,
          status: apiStatus,
        });

        const mappedOrders = (res.data.results || []).map(
          mapApiOrderToPurchaseItem,
        );

        setOrders(mappedOrders);
        setTotalPages(res.data.totalPages || 1);
        setTotalItems(res.data.totalItems || 0);
      } catch (error) {
        console.error("Lỗi lấy lịch sử đơn hàng:", error);
        setOrders([]);
        setTotalPages(1);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage, pageSize, activeFilter, mapApiOrderToPurchaseItem]);
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const filteredOrders = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return orders.filter((item) => {
      const matchSearch =
        keyword === "" ||
        item.title.toLowerCase().includes(keyword) ||
        item.typeLabel.toLowerCase().includes(keyword) ||
        item.paymentMethod.toLowerCase().includes(keyword);

      return matchSearch;
    });
  }, [orders, searchKeyword]);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <button
          className="rounded-2xl border border-brand-700/15 bg-white px-4 py-2 text-sm font-bold text-brand-800 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-600/30 hover:shadow-[0_12px_26px_rgba(31,45,39,0.10)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Trước
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`rounded-2xl px-4 py-2 text-sm font-bold transition ${
              currentPage === page
                ? "bg-brand-800 text-brand-25 shadow-[0_12px_26px_rgba(52,78,65,0.24)]"
                : "border border-brand-700/15 bg-white text-brand-800 shadow-sm hover:-translate-y-0.5 hover:border-brand-600/30 hover:shadow-[0_12px_26px_rgba(31,45,39,0.10)]"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="rounded-2xl border border-brand-700/15 bg-white px-4 py-2 text-sm font-bold text-brand-800 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-600/30 hover:shadow-[0_12px_26px_rgba(31,45,39,0.10)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Sau
        </button>
      </div>
    );
  };

  return (
    <>
      <section className="min-h-screen bg-[linear-gradient(180deg,#f3f2ef_0%,#f8faf4_42%,#edf5eb_100%)] px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-brand-700/10 bg-brand-900 px-6 py-8 shadow-[0_24px_70px_rgba(31,45,39,0.20)] sm:px-8 sm:py-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(163,177,138,0.26),transparent_32%),radial-gradient(circle_at_84%_12%,rgba(88,129,87,0.22),transparent_30%)]" />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-brand-25/15 bg-brand-25/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-100">
                  <ShoppingOutlined />
                  Lịch sử đơn hàng
                </div>
                <h1 className="text-3xl font-black tracking-tight text-brand-25 sm:text-4xl">
                  Lịch sử mua hàng
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-100/80 sm:text-base">
                  Xem lại các khóa học bạn đã mua và theo dõi trạng thái thanh toán một cách trực quan, rõ ràng.
                </p>
              </div>

              <div className="w-fit rounded-2xl border border-brand-25/15 bg-brand-25/10 px-4 py-3 text-sm font-bold text-brand-25">
                {totalItems} đơn hàng
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-brand-700/10 bg-white/85 p-4 shadow-[0_18px_44px_rgba(31,45,39,0.08)] sm:p-5">
            <div className="flex flex-col gap-4 border-b border-brand-700/10 pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-black text-brand-900">
                  <FileDoneOutlined className="text-brand-600" />
                  Danh sách đơn hàng
                </h2>
                <p className="mt-1 text-sm leading-6 text-brand-800/65">
                  Lọc theo trạng thái hoặc tìm nhanh khóa học trong đơn hàng của bạn.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                <StatusFilter
                  activeFilter={activeFilter}
                  onChange={setActiveFilter}
                />
                <SearchBox value={searchKeyword} onChange={setSearchKeyword} />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-brand-800/65">
                Tổng đơn hàng: <span className="font-bold text-brand-900">{totalItems}</span>
              </div>
              <div className="w-fit rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700">
                Trang {currentPage}/{totalPages}
              </div>
            </div>

            {loading ? (
              <div className="mt-6 flex flex-col gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-[1.5rem] border border-brand-700/10 bg-brand-25/70 p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="h-28 rounded-2xl bg-brand-100 sm:w-44" />
                      <div className="flex flex-1 flex-col gap-3">
                        <div className="h-5 w-3/4 rounded-full bg-brand-100" />
                        <div className="h-4 w-full rounded-full bg-brand-100" />
                        <div className="h-4 w-2/3 rounded-full bg-brand-100" />
                        <div className="mt-auto flex gap-2">
                          <div className="h-9 w-28 rounded-full bg-brand-100" />
                          <div className="h-9 w-24 rounded-full bg-brand-100" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center gap-3 py-4 text-sm font-bold text-brand-700">
                  <LoadingOutlined className="text-xl" />
                  Đang tải dữ liệu...
                </div>
              </div>
            ) : filteredOrders.length > 0 ? (
              <>
                <div className="mt-6 space-y-5">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-[1.5rem] border border-brand-700/10 bg-white shadow-[0_14px_34px_rgba(31,45,39,0.07)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-500/25 hover:shadow-[0_22px_52px_rgba(31,45,39,0.12)]"
                    >
                      <OrderCard order={order} />
                    </div>
                  ))}
                </div>
                {renderPagination()}
              </>
            ) : (
              <div className="mt-6 rounded-[1.5rem] border border-dashed border-brand-700/20 bg-brand-25/70 px-6 py-12">
                <EmptyState />
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PurchaseHistoryContent;
