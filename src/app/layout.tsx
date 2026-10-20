import type { Metadata } from "next";
import { greeting } from "@/config/greeting";
import "../../public/fonts/fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  title: `${greeting.title} | 20.10`,
  description: "Một chút hoa, một chút yêu thương. Món quà nhỏ chúc mừng ngày Phụ nữ Việt Nam 20/10, từ em dành riêng cho chị.",
  openGraph: { title: greeting.title, description: greeting.introSubtitle, locale: "vi_VN", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
