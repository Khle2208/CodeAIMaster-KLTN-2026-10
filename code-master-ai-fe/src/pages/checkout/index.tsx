import React, { useEffect, useMemo, useState } from "react";
import CheckoutForm from "../../components/checkout/checkout-form/CheckoutForm";
import OrderSummary from "../../components/checkout/order-summery/OrderSummery";
import { createPayment } from "../../api/payment/payment";
import type {
  CheckoutCourseItem,
  CheckoutFormData,
  CheckoutSummary,
} from "../../types/checkout/checkout";
import Footer from "../../components/footer";
import { getCartListQuick } from "../../api/cart";
import { useNavigate, useParams } from "react-router-dom";
import { GetCoursesDetail } from "../../api/course";
import {
  BookOutlined,
  CheckCircleOutlined,
  CustomerServiceOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const CheckoutPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    email: "",
    phone: "",
    note: "",
    paymentMethod: "momo",
  });

  const [checkoutItems, setCheckoutItems] = useState<CheckoutCourseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        setLoading(true);

        // 👉 CASE 1: BUY NOW
        if (courseId) {
          const res = await GetCoursesDetail(courseId); // ⚠️ cần API này

          const course = res?.data;

          const item: CheckoutCourseItem = {
            id: course._id,
            title: course.title,
            price: Number(course.price || 0),
            image: course.thumbnail,
          };

          setCheckoutItems([item]);
          setTotalPrice(item.price);

          const resUser = await getCartListQuick();
          const user = resUser?.data?.user_id;

          setFormData((prev) => ({
            ...prev,
            fullName: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
          }));
          return;
        }

        // 👉 CASE 2: CART (giữ nguyên)
        const res = await getCartListQuick();

        const rawItems = Array.isArray(res?.data?.items) ? res.data.items : [];

        const mappedItems: CheckoutCourseItem[] = rawItems.map((item: any) => ({
          id: item.course_id?._id || "",
          title: item.course_id?.title || "",
          price: Number(item.price || 0),
          image: item.course_id?.thumbnail || "",
        }));

        setCheckoutItems(mappedItems);
        setTotalPrice(Number(res?.data?.totalPrice || 0));

        const user = res?.data?.user_id;

        setFormData((prev) => ({
          ...prev,
          fullName: user?.name || "",
          email: user?.email || "",
          phone: user?.phone || "",
        }));
      } catch (error) {
        console.error("Lỗi load checkout:", error);
        setCheckoutItems([]);
        setTotalPrice(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckout();
  }, [courseId]);

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const res = await createPayment({
        payment_method: formData.paymentMethod,
        courseId: courseId, // 🔥 thêm dòng này
      });

      const paymentUrl = res?.data?.payment_url;

      if (paymentUrl) {
        window.location.href = paymentUrl;
        return;
      }

      alert("Tạo đơn hàng thành công nhưng chưa có link thanh toán.");
    } catch (error) {
      console.error("Thanh toán lỗi:", error);
      alert("Có lỗi xảy ra khi thanh toán.");
    }
  };
  const summary: CheckoutSummary = useMemo(() => {
    const subtotal = checkoutItems.reduce((sum, item) => sum + item.price, 0);
    const discount = 0;
    const total = totalPrice || subtotal - discount;

    return {
      subtotal,
      discount,
      total,
    };
  }, [checkoutItems, totalPrice]);

  return (
    <>
      <main className="min-h-screen bg-[linear-gradient(180deg,#f3f2ef_0%,#f8faf4_45%,#edf5eb_100%)] px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <section className="relative overflow-hidden rounded-[2rem] border border-brand-700/10 bg-brand-900 px-6 py-8 shadow-[0_24px_70px_rgba(31,45,39,0.20)] sm:px-8 sm:py-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(163,177,138,0.26),transparent_32%),radial-gradient(circle_at_84%_12%,rgba(88,129,87,0.22),transparent_30%)]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-brand-25/15 bg-brand-25/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-100">
                  <LockOutlined />
                  Checkout bảo mật
                </div>
                <h1 className="text-3xl font-black tracking-tight text-brand-25 sm:text-4xl">
                  Thanh toán
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-100/80 sm:text-base">
                  Kiểm tra đơn hàng, chọn phương thức thanh toán và hoàn tất đăng ký khóa học an toàn.
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded-2xl border border-brand-25/15 bg-brand-25/10 px-4 py-3 text-sm font-bold text-brand-25">
                  <SafetyCertificateOutlined className="mr-2" />
                  Thanh toán an toàn
                </div>
                <div className="rounded-2xl border border-brand-25/15 bg-brand-25/10 px-4 py-3 text-sm font-bold text-brand-25">
                  <CheckCircleOutlined className="mr-2" />
                  Kích hoạt sau thanh toán
                </div>
                <div className="rounded-2xl border border-brand-25/15 bg-brand-25/10 px-4 py-3 text-sm font-bold text-brand-25">
                  <CustomerServiceOutlined className="mr-2" />
                  Có hỗ trợ khi cần
                </div>
              </div>
            </div>
          </section>

          {loading ? (
            <section className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
              <div className="space-y-6 lg:col-span-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-[2rem] border border-brand-700/10 bg-white/85 p-6 shadow-[0_18px_44px_rgba(31,45,39,0.08)]"
                  >
                    <div className="mb-6 h-6 w-48 rounded-full bg-brand-100" />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="h-12 rounded-2xl bg-brand-100" />
                      <div className="h-12 rounded-2xl bg-brand-100" />
                      <div className="h-12 rounded-2xl bg-brand-100 sm:col-span-2" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="animate-pulse rounded-[2rem] border border-brand-700/10 bg-white/85 p-6 shadow-[0_18px_44px_rgba(31,45,39,0.08)]">
                <div className="mb-6 h-6 w-40 rounded-full bg-brand-100" />
                <div className="space-y-4">
                  <div className="h-16 rounded-2xl bg-brand-100" />
                  <div className="h-16 rounded-2xl bg-brand-100" />
                  <div className="h-12 rounded-2xl bg-brand-100" />
                </div>
              </div>
            </section>
          ) : checkoutItems.length === 0 ? (
            <section className="rounded-[2rem] border border-dashed border-brand-700/20 bg-white/85 px-6 py-16 text-center shadow-[0_18px_44px_rgba(31,45,39,0.08)]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-2xl text-brand-700">
                <BookOutlined />
              </div>
              <h2 className="mt-4 text-xl font-black text-brand-900">
                Chưa có khóa học để thanh toán
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-brand-800/65">
                Hãy chọn khóa học phù hợp rồi quay lại trang thanh toán để hoàn tất đăng ký.
              </p>
              <button
                type="button"
                onClick={() => navigate("/course")}
                className="mt-6 rounded-2xl bg-brand-700 px-5 py-3 text-sm font-bold text-brand-25 shadow-[0_14px_30px_rgba(52,78,65,0.24)] transition hover:-translate-y-0.5 hover:bg-brand-600"
              >
                Khám phá khóa học
              </button>
            </section>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
              <CheckoutForm formData={formData} onChange={handleChange} />
              <OrderSummary
                items={checkoutItems}
                summary={summary}
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;
