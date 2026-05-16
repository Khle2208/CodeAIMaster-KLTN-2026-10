import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  CodeOutlined,
  BookFilled,
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Dropdown, MenuProps, AutoComplete } from "antd";

import { useUserInfo } from "../../store/user";
import { useUserCart } from "../../store/cart";
import { useCourseStore } from "../../store/course";

import { GetCartLength } from "../../api/cart";
import { PostLogout } from "../../api/auth";
import NotificationBell from "../notification-bell";


const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const { userInfo, clearUserInfo } = useUserInfo();
  const { setQuantityCart, countQuantityCart } = useUserCart();
  const { globalCourses, setGlobalSearchKeyword } = useCourseStore();

  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState<
    { value: string; label: React.ReactNode }[]
  >([]);

  // ===== SEARCH =====
  const handleSearch = (value: string) => {
    setSearchValue(value);

    if (!value) {
      setOptions([]);
      return;
    }

    const filtered = globalCourses
      ?.filter((course) =>
        course.title.toLowerCase().includes(value.toLowerCase()),
      )
      .map((course) => ({
        value: course.title,
        label: (
          <div
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => {
              navigate(`/course/${course._id}`);
              setIsOpen(false);
            }}
          >
            <img
              src={course.thumbnail}
              alt=""
              className="w-10 h-10 object-cover rounded-lg"
            />
            <div>
              <div className="text-sm font-semibold">{course.title}</div>
              <div className="text-xs text-gray-500">
                {course.category?.category_name}
              </div>
            </div>
          </div>
        ),
      }));

    setOptions(filtered);
  };

  const handleSelect = (value: string) => {
    setSearchValue(value);
    setGlobalSearchKeyword(value);
    navigate("/course");
  };

  // ===== EFFECT =====
  useEffect(() => {
    const getCountCart = async () => {
      try {
        const data = await GetCartLength();
        setQuantityCart(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    // eslint-disable-next-line
    getCountCart();
  }, [setQuantityCart]);

  // ===== MENU USER =====
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div onClick={() => navigate("/profile")} className="flex gap-2">
          <UserOutlined /> Thông tin
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => navigate("/history-order")} className="flex gap-2">
          <ShoppingOutlined /> Đơn hàng
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={async () => {
            await PostLogout();
            clearUserInfo();
            window.location.href = "/login";
          }}
          className="flex gap-2"
        >
          <LogoutOutlined /> Đăng xuất
        </div>
      ),
    },
  ];

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "relative rounded-full px-4 py-2 text-sm transition-all duration-300",
      isActive
        ? "bg-brand-700 text-brand-25 shadow-sm"
        : "font-medium text-brand-900/75 hover:bg-brand-100/70 hover:text-brand-800",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 border-b border-brand-700/10 bg-brand-25/95 shadow-[0_10px_30px_rgba(31,45,39,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 lg:px-10">
        {/* ===== LEFT ===== */}
        <div className="flex items-center gap-3 md:gap-7">
          {/* Logo */}
          <button
            type="button"
            aria-label="Mở menu"
            onClick={() => setIsOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-brand-800 shadow-sm ring-1 ring-brand-700/10 transition hover:bg-brand-100 md:hidden"
          >
            <MenuOutlined className="text-lg" />
          </button>
          <NavLink
            to="/"
            className="flex items-center gap-3 text-xl font-extrabold tracking-tight text-brand-800"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-700 text-brand-25 shadow-[0_12px_28px_rgba(52,78,65,0.24)]">
              <CodeOutlined />
            </span>
            <h1 className="hidden md:flex">CodeMaster AI</h1>
          </NavLink>

          {/* Desktop Menu */}
          <nav
            id="tour-nav-links"
            className="hidden items-center gap-1 rounded-full bg-white/70 p-1 shadow-sm ring-1 ring-brand-700/10 md:flex"
          >
            <NavLink
              to="/"
              end
              className={navLinkClass}
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/introduce"
              className={navLinkClass}
            >
              Giới thiệu
            </NavLink>
            <NavLink
              to="/blog"
              className={navLinkClass}
            >
              Tin tức
            </NavLink>
            <NavLink
              to="/course"
              className={navLinkClass}
            >
              Khóa học
            </NavLink>
          </nav>

        </div>

        {/* ===== RIGHT ===== */}
        <div id="tour-auth" className="flex items-center gap-2 md:gap-3">
          {/* Search */}
          <div
            id="tour-search"
            className="hidden h-11 items-center rounded-full bg-white/85 px-4 shadow-sm ring-1 ring-brand-700/10 transition focus-within:ring-2 focus-within:ring-brand-500/35 md:flex md:w-[280px] lg:w-[380px]"
          >
            <SearchOutlined
              className="cursor-pointer text-brand-700"
              onClick={() => {
                setGlobalSearchKeyword(searchValue);
                navigate("/course");
              }}
            />
            <AutoComplete
              value={searchValue}
              options={options}
              onSearch={handleSearch}
              onSelect={handleSelect}
              className="custom-autocomplete w-full"
            >
              <input
                className="w-full bg-transparent px-3 text-sm text-brand-900 outline-none placeholder:text-brand-700/45"
                placeholder="Tìm khóa học..."
              />
            </AutoComplete>
          </div>

          {/* Auth + Cart */}
          {userInfo && (
            <>
              <BookFilled
                onClick={() => navigate("/myCourses")}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-xl text-brand-800 transition hover:bg-white hover:text-brand-600 hover:shadow-sm"
              />
              <div className="relative">
                <ShoppingCartOutlined
                  onClick={() => navigate("/cart")}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-xl text-brand-800 transition hover:bg-white hover:text-brand-600 hover:shadow-sm"
                />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white shadow-sm ring-2 ring-brand-25">
                  {countQuantityCart}
                </span>
              </div>
              <NotificationBell></NotificationBell>
            </>
          )}

          {/* User */}
          {userInfo ? (
            <Dropdown menu={{ items }}>
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-brand-700 text-brand-25 shadow-sm ring-1 ring-brand-700/10 transition hover:bg-brand-600">
                <UserOutlined />
              </div>
            </Dropdown>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-brand-25 shadow-[0_12px_24px_rgba(52,78,65,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-[0_16px_30px_rgba(52,78,65,0.28)]"
            >
              Đăng nhập
            </button>
          )}

          {/* Hamburger */}

        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {isOpen && (
        <div className="border-t border-brand-700/10 bg-brand-25 px-4 pb-5 pt-3 shadow-lg md:hidden">
          <div className="mb-3 flex justify-end">
            {/* <div className="font-bold">Menu</div> */}
            <button
              type="button"
              aria-label="Đóng menu"
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-brand-800 shadow-sm ring-1 ring-brand-700/10"
            >
              <CloseOutlined />
            </button>
          </div>

          <div
            className="cursor-pointer rounded-2xl px-4 py-3 font-medium text-brand-900 transition hover:bg-white hover:shadow-sm active:scale-[0.98]"
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
          >
            Trang chủ
          </div>
          <div
            className="cursor-pointer rounded-2xl px-4 py-3 font-medium text-brand-900 transition hover:bg-white hover:shadow-sm active:scale-[0.98]"
            onClick={() => {
              navigate("/introduce");
              setIsOpen(false);
            }}
          >
            Giới thiệu
          </div>
          <div
            className="cursor-pointer rounded-2xl px-4 py-3 font-medium text-brand-900 transition hover:bg-white hover:shadow-sm active:scale-[0.98]"
            onClick={() => {
              navigate("/blog");
              setIsOpen(false);
            }}
          >
            Tin tức
          </div>
          <div
            className="cursor-pointer rounded-2xl px-4 py-3 font-medium text-brand-900 transition hover:bg-white hover:shadow-sm active:scale-[0.98]"
            onClick={() => {
              navigate("/course");
              setIsOpen(false);
            }}
          >
            Khóa học
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
