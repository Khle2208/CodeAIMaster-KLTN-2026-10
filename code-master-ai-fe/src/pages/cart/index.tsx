import React, { useEffect, useState } from "react";
import CartItem, {
  CartItemData,
} from "../../components/cart/cart-item/CartItem";
import RecommendedSection from "../../components/cart/recommended/RecommendedSection";
import OrderSummary from "../../components/cart/order-summary/OrderSummary";
import Footer from "../../components/footer";
import { GetCartLength, getCartListQuick, removeCartItem } from "../../api/cart";
import { useUserCart } from "../../store/cart";
import { GetFeaturedCourses } from "../../api/course";
import { RecommendedCourse } from "../../components/cart/recommended/RecommendedSection";
import { BookOutlined, LoadingOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const Cart = () => {
  const [cartList, setCartList] = useState<CartItemData[]>([]);
  const [loading, setLoading] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState<RecommendedCourse[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { setQuantityCart } = useUserCart();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);

        const res = await getCartListQuick();
        console.log("cart res =", res);

        const rawItems = Array.isArray(res?.data?.items) ? res.data.items : [];

        const mappedItems: CartItemData[] = rawItems.map((item: any) => ({
          id: item.course_id?._id || "",
          title: item.course_id?.title || "",
          price: `${Number(item.price || 0).toLocaleString("vi-VN")}đ`,
          description: item.course_id?.description || "",
          instructor: "Chưa cập nhật",
          image: item.course_id?.thumbnail || "",
        }));

        setCartList(mappedItems);
        setTotalPrice(Number(res?.data?.totalPrice || 0));
      } catch (error) {
        console.error("Lỗi load cart:", error);
        setCartList([]);
        setTotalPrice(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const fetchRecommendedCourses = async () => {
      try {
        const courses = await GetFeaturedCourses();
        const mappedCourses: RecommendedCourse[] = (courses || []).map((course: any) => ({
          id: course._id,
          title: course.title,
          price:
            Number(course.price || 0) === 0
              ? "Miễn phí"
              : `${Number(course.price || 0).toLocaleString("vi-VN")}đ`,
          image: course.thumbnail || "",
          level: course.level,
        }));
        setRecommendedCourses(mappedCourses);
      } catch (error) {
        console.error("Lỗi load khóa học gợi ý:", error);
        setRecommendedCourses([]);
      }
    };

    fetchRecommendedCourses();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await removeCartItem(id);
      const data = await GetCartLength();
      setQuantityCart(data.data);
      console.log("Xóa sản phẩm thành công!:", data.data);
      const removedItem = cartList.find((item) => item.id === id);
      setCartList((prev) => prev.filter((item) => item.id !== id));

      if (removedItem) {
        const priceNumber = Number(
          removedItem.price.replace(/\./g, "").replace("đ", ""),
        );

        setTotalPrice((prev) => Math.max(0, prev - priceNumber));
      }
    } catch (error) {
      console.error("Xóa sản phẩm lỗi:", error);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[linear-gradient(180deg,#f3f2ef_0%,#f8faf4_42%,#edf5eb_100%)] px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <section className="relative overflow-hidden rounded-[2rem] border border-brand-700/10 bg-brand-900 px-6 py-8 shadow-[0_24px_70px_rgba(31,45,39,0.20)] sm:px-8 sm:py-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(163,177,138,0.26),transparent_32%),radial-gradient(circle_at_84%_12%,rgba(88,129,87,0.22),transparent_30%)]" />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-brand-25/15 bg-brand-25/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-100">
                  <ShoppingCartOutlined />
                  Giỏ hàng
                </div>
                <h1 className="text-3xl font-black tracking-tight text-brand-25 sm:text-4xl">
                  Giỏ hàng của bạn
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-100/80 sm:text-base">
                  Kiểm tra lại khóa học đã chọn trước khi chuyển sang thanh toán.
                </p>
              </div>

              <div className="w-fit rounded-2xl border border-brand-25/15 bg-brand-25/10 px-4 py-3 text-sm font-bold text-brand-25">
                {cartList.length} khóa học
              </div>
            </div>
          </section>

          {loading ? (
            <section className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
              <div className="flex flex-col gap-4 lg:col-span-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-[1.75rem] border border-brand-700/10 bg-white p-5 shadow-[0_16px_40px_rgba(31,45,39,0.07)]"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="h-36 rounded-2xl bg-brand-100 sm:w-48" />
                      <div className="flex flex-1 flex-col gap-3">
                        <div className="h-5 w-3/4 rounded-full bg-brand-100" />
                        <div className="h-4 w-full rounded-full bg-brand-100" />
                        <div className="h-4 w-2/3 rounded-full bg-brand-100" />
                        <div className="mt-auto h-9 w-32 rounded-full bg-brand-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-[1.75rem] border border-brand-700/10 bg-white p-6 shadow-[0_16px_40px_rgba(31,45,39,0.07)]">
                <div className="flex items-center gap-3 text-brand-700">
                  <LoadingOutlined className="text-2xl" />
                  <span className="text-sm font-bold">Đang tải giỏ hàng...</span>
                </div>
              </div>
            </section>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
              <div className="flex flex-col gap-6 lg:col-span-2">
                <div className="rounded-[2rem] border border-brand-700/10 bg-white/80 p-4 shadow-[0_18px_44px_rgba(31,45,39,0.08)] sm:p-5">
                  <div className="mb-5 flex flex-col gap-2 border-b border-brand-700/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-xl font-black text-brand-900">
                        Khóa học trong giỏ
                      </h2>
                      <p className="mt-1 text-sm text-brand-800/65">
                        Xóa những khóa học bạn chưa muốn mua ngay.
                      </p>
                    </div>
                    <span className="w-fit rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700">
                      {cartList.length} mục
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    {cartList.length > 0 ? (
                      cartList.map((item) => (
                        <CartItem key={item.id} item={item} onRemove={handleRemove} />
                      ))
                    ) : (
                      <div className="rounded-[1.5rem] border border-dashed border-brand-700/20 bg-brand-25/70 px-6 py-14 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-2xl text-brand-700">
                          <BookOutlined />
                        </div>
                        <h3 className="mt-4 text-lg font-black text-brand-900">
                          Giỏ hàng của bạn đang trống
                        </h3>
                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-brand-800/65">
                          Các khóa học bạn thêm vào giỏ sẽ xuất hiện tại đây để kiểm tra trước khi thanh toán.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-brand-700/10 bg-white/80 p-4 shadow-[0_18px_44px_rgba(31,45,39,0.08)] sm:p-5">
                  <RecommendedSection courses={recommendedCourses} />
                </div>
              </div>

              <aside className="lg:sticky lg:top-28 lg:col-span-1">
                <div className="rounded-[2rem] border border-brand-700/10 bg-white/90 p-4 shadow-[0_18px_44px_rgba(31,45,39,0.10)]">
                  <OrderSummary totalPrice={totalPrice} />
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
