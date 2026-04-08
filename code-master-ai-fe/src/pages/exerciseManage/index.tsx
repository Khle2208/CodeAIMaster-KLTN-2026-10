import React, { useState } from "react";
import { Input, Button } from "antd";
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    MoreOutlined,
    FilterOutlined,
    DownloadOutlined,
    CalendarOutlined,
    RocketOutlined,
    MailOutlined,
    BellOutlined,
    BarChartOutlined,
    LeftOutlined,
    RightOutlined,
} from "@ant-design/icons";

type Assignment = {
    id: string;
    name: string;
    course: string;
    lesson: string;
    score: number;
    dueDate: string;
    dueTime: string;
    submissions: number;
    submissionsTotal: number;
    isOverdue?: boolean;
    status: "open" | "closed";
};

const data: Assignment[] = [
    {
        id: "#ASG-001",
        name: "Cấu trúc điều kiện IF/ELSE",
        course: "Lập trình Python Cơ Bản",
        lesson: "Bài 4: Luồng xử lý",
        score: 100,
        dueDate: "25/10/2023",
        dueTime: "23:59",
        submissions: 142,
        submissionsTotal: 150,
        status: "open",
    },
    {
        id: "#ASG-002",
        name: "Thao tác với Array cơ bản",
        course: "JavaScript Hiện Đại",
        lesson: "Bài 6: Data Structures",
        score: 10,
        dueDate: "20/10/2023",
        dueTime: "23:59",
        submissions: 98,
        submissionsTotal: 100,
        status: "closed",
    },
    {
        id: "#ASG-003",
        name: "Xây dựng UI với Flexbox",
        course: "HTML & CSS Master",
        lesson: "Bài 12: Layout Mastery",
        score: 50,
        dueDate: "15/10/2023",
        dueTime: "23:59",
        submissions: 45,
        submissionsTotal: 200,
        isOverdue: true,
        status: "closed",
    },
    {
        id: "#ASG-004",
        name: "Phân tích thuật toán Sắp xếp",
        course: "Cấu trúc dữ liệu & Giải thuật",
        lesson: "Bài 2: Sorting Algorithms",
        score: 100,
        dueDate: "30/11/2023",
        dueTime: "23:59",
        submissions: 12,
        submissionsTotal: 80,
        status: "open",
    },
];

const TABS = ["Bài tập thường", "Code Assignment", "Ngân hàng câu hỏi"];

const StatusPill = ({ status }: { status: "open" | "closed" }) =>
    status === "open" ? (
        <span style={{
            display: "inline-block",
            padding: "3px 14px",
            borderRadius: 6,
            background: "#dcfce7",
            color: "#166534",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.06em",
        }}>OPEN</span>
    ) : (
        <span style={{
            display: "inline-block",
            padding: "3px 14px",
            borderRadius: 6,
            background: "#f1f5f9",
            color: "#475569",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.06em",
        }}>CLOSED</span>
    );

const ExerciseManage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [activePage, setActivePage] = useState(1);

    return (
        <div className="min-h-screen px-6 py-8 md:px-10">
            <div className="mx-auto max-w-6xl space-y-6">
                {/* Breadcrumb */}
                {/* <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.06em" }}>
                    <span>ADMIN</span>
                    <span>›</span>
                    <span>NỘI DUNG</span>
                </div> */}

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-extrabold text-brand-700">Quản lý bài tập</h2>
                        <p className="text-gray-500 mt-1">Quản lý và theo dõi tiến độ bài tập của học viên</p>
                    </div>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        style={{
                            background: "#3a5a40",
                            borderColor: "#3a5a40",
                            borderRadius: 999,
                            fontWeight: 600,
                            height: 40,
                            paddingLeft: 20,
                            paddingRight: 20,
                            fontSize: 14,
                        }}
                    >
                        Tạo bài tập mới
                    </Button>
                </div>

                {/* Stats */}
                <div className="flex justify-between" style={{
                    
                
                    overflow: "hidden",
                }}>
                    {[
                        {
                            icon: <CalendarOutlined style={{ fontSize: 24, color: "#fff" }} />,
                            iconBg: "#3a5a40",
                            badge: "+12 tháng này",
                            badgeBg: "#f0fdf4",
                            badgeColor: "#166534",
                            label: "TỔNG BÀI TẬP",
                            value: "124",
                        },
                        {
                            icon: <RocketOutlined style={{ fontSize: 24, color: "#fff" }} />,
                            iconBg: "#588157",
                            badge: "Hoạt động",
                            badgeBg: "#f0fdf4",
                            badgeColor: "#166534",
                            label: "ĐANG MỞ (OPEN)",
                            value: "86",
                        },
                        {
                            icon: <MailOutlined style={{ fontSize: 24, color: "#fff" }} />,
                            iconBg: "#3a5a40",
                            badge: "89% hoàn thành",
                            badgeBg: "#f1f5f9",
                            badgeColor: "#475569",
                            label: "LƯỢT NỘP BÀI",
                            value: "2,451",
                        },
                        {
                            icon: <BellOutlined style={{ fontSize: 24, color: "#fff" }} />,
                            iconBg: "#ef4444",
                            badge: "Yêu cầu mới",
                            badgeBg: "#fef2f2",
                            badgeColor: "#991b1b",
                            label: "CẦN CHẤM ĐIỂM",
                            value: "12",
                        },
                    ].map((s, i) => (
                        <div
                            className="flex flex-col justify-center border border-brand-100 rounded-2xl bg-brand-25 shadow-sm px-12 py-8"
                            key={i}
                           
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: 14,
                                    background: s.iconBg,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    flexShrink: 0,
                                }}>
                                    {s.icon}
                                </div>
                                <span style={{
                                    fontSize: 11, fontWeight: 600, padding: "3px 10px",
                                    borderRadius: 999,
                                    background: s.badgeBg,
                                    color: s.badgeColor,
                                }}>
                                    {s.badge}
                                </span>
                            </div>
                            <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.06em", marginBottom: 6 }}>
                                {s.label}
                            </p>
                            <p style={{ fontSize: 28, fontWeight: 800, color: "#1e293b" }}>{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", gap: 0 }}>
                        {TABS.map((tab, i) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(i)}
                                style={{
                                    padding: "12px 20px",
                                    background: "none",
                                    border: "none",
                                    borderBottom: activeTab === i ? "2px solid #3a5a40" : "2px solid transparent",
                                    color: activeTab === i ? "#3a5a40" : "#64748b",
                                    fontWeight: activeTab === i ? 700 : 500,
                                    fontSize: 14,
                                    cursor: "pointer",
                                    transition: "all 0.15s",
                                    marginBottom: -1,
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filter */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
                    <Input
                        prefix={<SearchOutlined style={{ color: "#94a3b8" }} />}
                        placeholder="Tìm kiếm bài tập..."
                        style={{ width: 320, borderRadius: 8, height: 38 }}
                    />
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "7px 16px", borderRadius: 8,
                            border: "1px solid #e2e8f0", background: "#fff",
                            color: "#475569", fontWeight: 600, fontSize: 13, cursor: "pointer",
                        }}>
                            <FilterOutlined style={{ fontSize: 13 }} /> LỌC
                        </button>
                        <button style={{
                            width: 36, height: 36, borderRadius: 8,
                            border: "1px solid #e2e8f0", background: "#fff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#64748b", cursor: "pointer",
                        }}>
                            <DownloadOutlined style={{ fontSize: 15 }} />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="border boder-brand-100 bg-brand-25 rounded-2xl" style={{ overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                                {[
                                    { label: "TÊN BÀI TẬP", align: "left" },
                                    { label: "KHÓA HỌC", align: "left" },
                                    { label: "BÀI HỌC", align: "left" },
                                    { label: "ĐIỂM TỐI ĐA", align: "center" },
                                    { label: "HẠN NỘP", align: "left" },
                                    { label: "NỘP BÀI", align: "center" },
                                    { label: "TRẠNG THÁI", align: "center" },
                                    { label: "THAO TÁC", align: "right" },
                                ].map((col) => (
                                    <th
                                        key={col.label}
                                        className="text-gray-500"
                                        style={{
                                            padding: "14px 16px",
                                            textAlign: col.align as any,
                                            fontSize: 11,
                                            fontWeight: 700,
                                            
                                            letterSpacing: "0.06em",
                                            background: "#fafaf9",
                                        }}
                                    >
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item, idx) => (
                                <tr
                                    key={item.id}
                                    style={{
                                        borderTop: idx === 0 ? "none" : "1px solid #f1f5f9",
                                        transition: "background 0.12s",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = "#fafaf9")}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                >
                                    {/* Tên */}
                                    <td style={{ padding: "16px" }}>
                                        <p style={{ fontWeight: 700, color: "#1e293b", fontSize: 14, marginBottom: 4 }}>{item.name}</p>
                                        <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>ID: {item.id}</span>
                                    </td>

                                    {/* Khóa học */}
                                    <td style={{ padding: "16px", fontSize: 13, color: "#374151", verticalAlign: "top", paddingTop: 18 }}>
                                        {item.course}
                                    </td>

                                    {/* Bài học */}
                                    <td style={{ padding: "16px", fontSize: 13, color: "#374151", verticalAlign: "top", paddingTop: 18 }}>
                                        {item.lesson}
                                    </td>

                                    {/* Điểm */}
                                    <td style={{ padding: "16px", textAlign: "center", fontWeight: 800, fontSize: 15, color: "#3a5a40", verticalAlign: "top", paddingTop: 18 }}>
                                        {item.score}
                                    </td>

                                    {/* Hạn nộp */}
                                    <td style={{ padding: "16px", verticalAlign: "top", paddingTop: 18 }}>
                                        <p style={{ fontSize: 13, color: item.isOverdue ? "#ef4444" : "#374151", fontWeight: item.isOverdue ? 700 : 400 }}>
                                            {item.isOverdue ? "Hết hạn" : item.dueDate}
                                        </p>
                                        <p style={{ fontSize: 12, color: "#94a3b8" }}>{item.dueTime}</p>
                                    </td>

                                    {/* Nộp bài */}
                                    <td style={{ padding: "16px", textAlign: "center", verticalAlign: "top", paddingTop: 18 }}>
                                        <p style={{
                                            fontSize: 14, fontWeight: 700,
                                            color: item.submissions / item.submissionsTotal < 0.4 ? "#ef4444" : "#374151",
                                        }}>
                                            {item.submissions}
                                        </p>
                                        <p style={{ fontSize: 11, color: "#94a3b8" }}>/{item.submissionsTotal} học viên</p>
                                    </td>

                                    {/* Trạng thái */}
                                    <td style={{ padding: "16px", textAlign: "center", verticalAlign: "top", paddingTop: 18 }}>
                                        <StatusPill status={item.status} />
                                    </td>

                                    {/* Thao tác */}
                                    <td style={{ padding: "16px", textAlign: "right", verticalAlign: "top", paddingTop: 14 }}>
                                        <div style={{ display: "inline-flex", gap: 6 }}>
                                            {[EditOutlined, MoreOutlined].map((Icon, i) => (
                                                <button
                                                    key={i}
                                                    style={{
                                                        width: 32, height: 32, borderRadius: 8,
                                                        border: "1px solid #e2e8f0", background: "#fff",
                                                        cursor: "pointer", display: "flex",
                                                        alignItems: "center", justifyContent: "center",
                                                        color: "#64748b",
                                                    }}
                                                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#f8fafc"; }}
                                                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#fff"; }}
                                                >
                                                    <Icon style={{ fontSize: 14 }} />
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "14px 20px", borderTop: "1px solid #f1f5f9", background: "#fafaf9",
                    }}>
                        <span className="text-gray-500" style={{ fontSize: 13,}}>Hiển thị 4 trên 124 bài tập</span>
                        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                            <button
                                style={{
                                    width: 32, height: 32, borderRadius: 8,
                                    border: "1px solid #e2e8f0", background: "#fff",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#64748b", cursor: "pointer",
                                }}
                            >
                                <LeftOutlined style={{ fontSize: 11 }} />
                            </button>
                            {[1, 2, 3].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setActivePage(p)}
                                    style={{
                                        width: 32, height: 32, borderRadius: 8,
                                        border: activePage === p ? "none" : "1px solid #e2e8f0",
                                        background: activePage === p ? "#3a5a40" : "#fff",
                                        color: activePage === p ? "#fff" : "#374151",
                                        fontWeight: activePage === p ? 700 : 500,
                                        fontSize: 13, cursor: "pointer",
                                    }}
                                >
                                    {p}
                                </button>
                            ))}
                            <span style={{ color: "#94a3b8", padding: "0 4px" }}>...</span>
                            <button
                                style={{
                                    width: 32, height: 32, borderRadius: 8,
                                    border: "1px solid #e2e8f0", background: "#fff",
                                    color: "#374151", fontWeight: 500, fontSize: 13, cursor: "pointer",
                                }}
                            >
                                31
                            </button>
                            <button
                                style={{
                                    width: 32, height: 32, borderRadius: 8,
                                    border: "1px solid #e2e8f0", background: "#fff",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#64748b", cursor: "pointer",
                                }}
                            >
                                <RightOutlined style={{ fontSize: 11 }} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Info Card */}
                    <div
                        style={{
                            gridColumn: "span 2",
                            background: "linear-gradient(135deg, #3a5a40 0%, #588157 100%)",
                            borderRadius: 20,
                            padding: "32px 36px",
                            color: "#fff",
                        }}
                        className="md:col-span-2"
                    >
                        <h4 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Thông tin hệ thống</h4>
                        <p style={{ fontSize: 14, opacity: 0.82, lineHeight: 1.6, marginBottom: 24, maxWidth: 480 }}>
                            Bạn đang xem danh sách các bài tập tiểu luận và trắc nghiệm. Để quản lý các bài tập chấm code tự động, hãy chuyển sang tab Code Assignment.
                        </p>
                        <button
                            style={{
                                padding: "10px 22px",
                                borderRadius: 999,
                                border: "2px solid rgba(255,255,255,0.7)",
                                background: "transparent",
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: 14,
                                cursor: "pointer",
                                transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                        >
                            Tìm hiểu về Code Assignment
                        </button>
                    </div>

                    {/* Completion Rate Card */}
                    <div style={{
                        background: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: 20,
                        padding: "28px 24px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 16,
                    }}>
                        <div style={{
                            width: 56, height: 56, borderRadius: 16,
                            background: "#f0fdf4",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <BarChartOutlined style={{ fontSize: 26, color: "#3a5a40" }} />
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <p style={{ fontWeight: 700, fontSize: 15, color: "#1e293b", marginBottom: 4 }}>Tỷ lệ hoàn thành</p>
                            <p style={{ fontSize: 12, color: "#94a3b8" }}>Dựa trên toàn bộ học viên đăng ký</p>
                        </div>
                        <div style={{ width: "100%" }}>
                            <div style={{
                                height: 10, borderRadius: 999,
                                background: "#f1f5f9", overflow: "hidden",
                            }}>
                                <div style={{
                                    height: "100%", width: "82%",
                                    background: "linear-gradient(90deg, #588157, #3a5a40)",
                                    borderRadius: 999,
                                }} />
                            </div>
                        </div>
                        <p style={{ fontSize: 26, fontWeight: 800, color: "#3a5a40" }}>82%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExerciseManage;