# Gửi chị một chút dịu dàng của tháng Mười

Món quà 20/10 từ em dành riêng cho chị. Next.js App Router + React + TypeScript, hoa SVG tự vẽ, CSS animation, không backend và không dịch vụ bên ngoài khi xem trang. Font Cormorant Garamond và Be Vietnam Pro được lưu cục bộ, kèm giấy phép SIL OFL trong `public/fonts/`.

## Chạy local

Yêu cầu Node.js 22.13+ và npm. Tại thư mục dự án:

```powershell
npm ci
npm run dev
```

Mở http://127.0.0.1:3000. Nếu cổng bận: `npm run dev -- --port 3002`.

## Production

```powershell
npm run build
npm run start
```

`build` xuất website tĩnh vào `out/`; `start` phục vụ bản này tại http://127.0.0.1:3000. Có thể đổi cổng bằng `$env:PORT='3002'` trong PowerShell. Chạy lại build sau khi sửa nội dung. Máy chủ xem trước chỉ dùng để kiểm tra local; khi triển khai, dùng dịch vụ static hosting có HTTPS.

## Cá nhân hóa

Sửa **`src/config/greeting.ts`**:

| Trường | Nội dung |
| --- | --- |
| `recipient` | Cách gọi người nhận, dùng cho nhãn và lời đề tặng |
| `title`, `heroTitle` | Tiêu đề trình duyệt và ba phần của tiêu đề chính |
| `intro`, `introSubtitle`, `subtitle` | Lời mở đầu và dòng tiếng Anh |
| `greeting` | Các đoạn lời chúc chính |
| `card.title`, `card.paragraphs`, `card.signature` | Nội dung và chữ ký thiệp |
| `wishes` | 10 lời chúc ngẫu nhiên; tránh lặp ngay lần trước |
| `bouquetMessage`, `finalMessage` | Lời tặng hoa và lời cuối |
| `music.src`, `music.volume` | Đường dẫn nhạc và âm lượng từ 0 đến 1 |
| `effects` | Mặc định cánh hoa, gió theo con trỏ, số cánh hoa (tối đa 24) |

Để thêm nhạc, đặt **tệp bạn có quyền sử dụng** vào `public/music/gentle-piano.mp3`, rồi đặt `music.src: "/music/gentle-piano.mp3"`. Không có nhạc vẫn xem toàn bộ món quà. Nút nhạc luôn thể hiện trạng thái; trang xử lý lỗi tải/phát bằng thông báo. Âm thanh không tự phát. Các đoạn lời chúc dùng cách xưng hô em–chị; nếu thay người nhận, sửa các đoạn tương ứng.

## Chức năng

- Màn hình mở quà, chuyển cảnh nhẹ, lời chúc xuất hiện nhanh và nút đọc ngay.
- Hoa hồng, tulip, baby và lá tự vẽ bằng SVG; thân mọc, hoa nở, đung đưa, ánh sáng và cánh hoa rơi có giới hạn.
- Vùng bấm hoa cố định; chạm hiện lời nhắn và cụm tim nhỏ, desktop có gió theo con trỏ.
- Thiệp mở/đóng, bó hoa tặng và lời kết trong dialog; Escape để đóng, giữ focus trong dialog và trả về nút mở.
- Lời chúc ngẫu nhiên, điều khiển cánh hoa/gió, nhạc tùy chọn; tôn trọng `prefers-reduced-motion`.
- Responsive, nhãn tiếng Việt, trạng thái nút và focus bàn phím rõ ràng.

## Kiểm tra

```powershell
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm audit --omit=dev
```

E2E dùng Google Chrome đã cài trên máy, chạy trên **bản production tĩnh**. Nếu máy chưa có Chrome: cài Chrome, hoặc chạy `npx playwright install chromium` và bỏ `channel: "chrome"` trong `playwright.config.ts` để dùng Chromium do Playwright quản lý. Kết quả và giới hạn kiểm tra được ghi trong `TESTING.md`. Xem báo cáo: `npx playwright show-report`. Ảnh responsive nằm trong `artifacts/` sau khi chạy tests.

## Deploy Vercel hoặc static hosting

1. Đưa source lên repository Git của bạn, không đưa `node_modules/`, `.next/` hay `out/` lên Git.
2. Trên Vercel, tạo Project, chọn repository, framework **Next.js**.
3. Install command `npm ci`, build command `npm run build`. Giữ cấu hình mặc định Next.js; `next.config.ts` đã bật `output: "export"`. Không cần biến môi trường hoặc backend.
4. Deploy và kiểm tra URL HTTPS trên điện thoại trước khi gửi chị.

Với dịch vụ static hosting khác, chọn build `npm run build`, thư mục xuất bản **`out`**. Website được thiết kế để đặt ở gốc domain, không phải thư mục con. Tham khảo [hướng dẫn static export chính thức của Next.js](https://nextjs.org/docs/app/guides/static-exports).

Bản Sites nếu xuất bản từ phiên làm việc này mặc định chỉ chủ sở hữu xem được; cần đổi chia sẻ trên Sites hoặc deploy Vercel với quyền truy cập phù hợp trước khi gửi cho chị. Không có thông tin cá nhân hoặc tài khoản được thêm vào ứng dụng.

## Cấu trúc

`src/app/` chứa trang, metadata, icon và CSS. `src/components/botanical.tsx` chứa minh họa hoa và vườn hoa; `gift-experience.tsx` điều phối màn hình và tương tác. `src/config/greeting.ts` chứa nội dung. `scripts/serve.mjs` phục vụ bản build local; `download-fonts.mjs` là tiện ích tải lại font nếu cần, không chạy lúc truy cập website.
