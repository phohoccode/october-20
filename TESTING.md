# Kết quả kiểm tra — 20/10/2026

Môi trường: Windows, Node.js 22.13.1, npm 10.9.2, Next.js 16.4.2, React 19.3.1; Google Chrome qua Playwright. Bản production dùng static export trong `out/`. Playwright tự khởi động máy chủ riêng tại cổng **4173**, không tái sử dụng dev server ở cổng 3000.

| Lệnh | Kết quả |
| --- | --- |
| `npm install` | Thành công; có `package-lock.json` để cài lại bằng `npm ci` |
| `npm run lint` | Thành công, 0 cảnh báo |
| `npm run typecheck` | Thành công, không lỗi TypeScript |
| `npm run build` | Thành công, xuất trang tĩnh và assets vào `out/` |
| `npm run test:e2e` | **9/9 đạt**, lần chạy cuối 30,5 giây trên bản production; chi tiết bên dưới |
| `npm audit --omit=dev` | 0 lỗ hổng trong dependencies production |

9 bài E2E kiểm tra:

1. Mở quà, nội dung tiếng Việt, nút đọc ngay, chạm hoa hiện lời nhắn; mở/đóng thiệp bằng nút và Escape, trả focus về nút mở; tặng bó hoa; 20 lần nhận lời chúc không lặp ngay; mở/quay lại từ màn hình cuối. Đồng thời theo dõi lỗi JavaScript và HTTP >= 400 trong luồng này.
2. Trạng thái nút nhạc khi không có tệp; tắt/bật cánh hoa; tắt gió theo con trỏ.
3–8. Các chiều rộng **360, 390, 430, 768, 1024, 1440px**: kiểm tra overflow ngang, chữ và nút không tràn, dialog thiệp dùng được, nút đóng nằm trong viewport, mở và quay lại màn hình cuối. Có ảnh toàn trang trong `artifacts/website-<width>.png`.
9. `prefers-reduced-motion: reduce`, ẩn cánh hoa và bỏ animation; mở quà và thiệp bằng Enter, đóng bằng Escape, kiểm tra focus.

Đã xem ảnh giao diện desktop và mobile; chỉnh kích thước bó hoa trên mobile, giữ vùng bấm hoa cố định trong khi hình hoa đung đưa. Đã sửa lỗi thời điểm chuyển focus sau mở quà trên bản production và chạy lại toàn bộ suite thành công. Font tải từ cùng host, không có URL font hoặc nhạc bên ngoài trong ứng dụng.

Kiểm tra Lighthouse qua Chrome DevTools ở trạng thái trang chính (snapshot, desktop): **Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100**; 30 audit đạt, 0 audit lỗi. Đây là snapshot, không phải điểm hiệu năng hoặc chứng nhận truy cập đầy đủ. Console và các tài nguyên ứng dụng đã được kiểm tra qua trình duyệt.

## Giới hạn và tài nguyên cần thêm

- Chưa có tệp nhạc: đã kiểm tra trạng thái thiếu nhạc; chưa xác nhận phát/nghe và lỗi tải với một tệp nhạc thực tế. Đặt tệp có quyền sử dụng vào `public/music/` và cấu hình `music.src` khi cần. Code có xử lý lỗi Audio API và tải tệp.
- Chưa thử trực tiếp trên điện thoại vật lý, Safari/iOS hay Firefox; responsive và reduced motion được kiểm tra trên Chromium.
- Chưa đo hiệu năng CPU/GPU hoặc Lighthouse Performance trên thiết bị yếu; số lượng phần tử hiệu ứng được giới hạn, animation chủ yếu dùng transform/opacity.
- `npm audit` toàn bộ báo 5 cảnh báo high trong chuỗi công cụ phát triển `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces` (GHSA-vfj7-8cjw-p6xm). Không nằm trong dependency production. Không tự hạ Next/ESLint sang major cũ theo đề xuất `audit fix --force`.
- Hướng dẫn deploy Vercel có trong README; chưa thực hiện một deployment Vercel trong phiên này.
