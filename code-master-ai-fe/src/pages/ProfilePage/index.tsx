import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserInfo } from "../../store/user";
import { UpdateMyProfile } from "../../api/admin/user";
import ChangePassword from "../profile/ChangePassword";
import {
  CameraOutlined,
  EnvironmentOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";

const tabs = [
  { key: "personal-info", label: "Thông tin cá nhân" },
  { key: "password", label: "Đổi mật khẩu" },
];

const ProfilePage: React.FC = () => {
  const { userInfo, setUserInfo } = useUserInfo((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminProfile = location.pathname.startsWith("/admin/profile");
  const basePath = isAdminProfile ? "/admin/profile" : "/profile";
  const activeTab = location.pathname.endsWith("/password") ? "password" : "personal-info";
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    password: "",
  });
  const [previewImage, setPreviewImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        phone: userInfo.phone || "",
        address: userInfo.address || "",
        password: "",
      });
      setPreviewImage(userInfo.image || "https://via.placeholder.com/150");
    }
  }, [userInfo]);

  const showNotification = (type: "success" | "error", msg: string) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    if (!formData.name.trim()) return showNotification("error", "Tên không được để trống!");

    setIsSaving(true);
    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      if (formData.phone) submitData.append("phone", formData.phone);
      if (formData.address) submitData.append("address", formData.address);
      if (formData.password) submitData.append("password", formData.password);
      if (selectedFile) submitData.append("image", selectedFile);

      const response = await UpdateMyProfile(submitData);
      showNotification("success", "Cập nhật hồ sơ thành công!");

      if (response.user) {
        setUserInfo({
          ...userInfo,
          name: response.user.name,
          phone: response.user.phone,
          address: response.user.address,
          image: response.user.image,
        } as any);
      }
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (error: any) {
      showNotification("error", error.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f3f2ef_0%,#f8faf4_45%,#edf5eb_100%)] px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-brand-700/10 bg-brand-900 px-6 py-8 shadow-[0_24px_70px_rgba(31,45,39,0.20)] sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(163,177,138,0.26),transparent_32%),radial-gradient(circle_at_84%_12%,rgba(88,129,87,0.22),transparent_30%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-brand-25/15 bg-brand-25/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-100">
                <UserOutlined />
                Hồ sơ cá nhân
              </div>
              <h1 className="text-3xl font-black tracking-tight text-brand-25 sm:text-4xl">
                Quản lý thông tin tài khoản
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-100/80 sm:text-base">
                Cập nhật thông tin liên hệ, ảnh đại diện và bảo mật tài khoản CodeMaster AI của bạn.
              </p>
            </div>

            <div className="flex rounded-2xl border border-brand-25/15 bg-brand-25/10 p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => navigate(`${basePath}${tab.key === "password" ? "/password" : ""}`)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                    activeTab === tab.key
                      ? "bg-brand-25 text-brand-900 shadow-sm"
                      : "text-brand-100 hover:bg-brand-25/10"
                  }`}
                >
                  {tab.key === "password" ? <LockOutlined /> : <UserOutlined />}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {notification && (
          <div className={`rounded-2xl border px-5 py-4 text-sm font-bold shadow-sm ${
            notification.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}>
            {notification.msg}
          </div>
        )}

        {activeTab === "personal-info" ? (
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="overflow-hidden rounded-[2rem] border border-brand-700/10 bg-white/90 shadow-[0_18px_44px_rgba(31,45,39,0.08)]">
                <div className="h-28 bg-[radial-gradient(circle_at_20%_10%,rgba(163,177,138,0.35),transparent_34%),linear-gradient(135deg,#344e41,#588157)]" />
                <div className="-mt-16 flex flex-col items-center px-6 pb-7 text-center">
                  <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-[2rem] border-4 border-brand-25 bg-brand-100 shadow-[0_18px_44px_rgba(31,45,39,0.18)]">
                    <img src={previewImage} alt="Avatar" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 flex cursor-pointer items-center justify-center bg-brand-900/55 text-brand-25 opacity-0 transition-opacity hover:opacity-100"
                    >
                      <CameraOutlined className="text-3xl" />
                    </button>
                  </div>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                  <h2 className="text-xl font-black text-brand-900">
                    {userInfo?.name || "Người học CodeMaster"}
                  </h2>
                  <p className="mt-1 max-w-xs text-sm leading-6 text-brand-800/65">
                    Bấm vào ảnh đại diện để cập nhật hình ảnh hiển thị trên tài khoản.
                  </p>
                  <div className="mt-5 w-full rounded-2xl border border-brand-700/10 bg-brand-25 px-4 py-3 text-left">
                    <div className="text-xs font-bold uppercase tracking-[0.14em] text-brand-600">
                      Email đăng nhập
                    </div>
                    <div className="mt-1 break-all text-sm font-bold text-brand-900">
                      {userInfo?.email || "Chưa cập nhật"}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <section className="rounded-[2rem] border border-brand-700/10 bg-white/90 p-5 shadow-[0_18px_44px_rgba(31,45,39,0.08)] sm:p-6 lg:col-span-8">
              <div className="mb-6 flex flex-col gap-2 border-b border-brand-700/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-black text-brand-900">
                    Thông tin cá nhân
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-brand-800/65">
                    Những thông tin này giúp hệ thống hỗ trợ bạn tốt hơn trong quá trình học.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-900">
                    <UserOutlined className="text-brand-600" />
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-2xl border border-brand-700/10 bg-brand-25/50 px-4 py-3 text-brand-900 outline-none transition focus:border-brand-600/35 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-900">
                    <MailOutlined className="text-brand-600" />
                    Email đăng nhập
                  </label>
                  <input
                    type="email"
                    value={userInfo?.email || ""}
                    disabled
                    className="w-full cursor-not-allowed rounded-2xl border border-brand-700/10 bg-brand-100/50 px-4 py-3 text-brand-800/55"
                  />
                  <p className="mt-2 text-xs font-medium text-brand-800/50">
                    Email là định danh duy nhất, không thể thay đổi.
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-900">
                    <PhoneOutlined className="text-brand-600" />
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-2xl border border-brand-700/10 bg-brand-25/50 px-4 py-3 text-brand-900 outline-none transition focus:border-brand-600/35 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

               
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-700 px-6 py-3 font-bold text-brand-25 shadow-[0_14px_30px_rgba(52,78,65,0.24)] transition hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-[0_18px_38px_rgba(52,78,65,0.30)] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-brand-400 disabled:hover:translate-y-0 sm:w-auto"
                >
                  <SaveOutlined />
                  {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </section>
          </section>
        ) : (
          <section className="rounded-[2rem] border border-brand-700/10 bg-white/90 p-5 shadow-[0_18px_44px_rgba(31,45,39,0.08)] sm:p-6">
            <ChangePassword />
          </section>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
