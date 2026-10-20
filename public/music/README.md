# Nhạc nền tùy chọn

Hiện website dùng tệp có sẵn `lgt.mp3` tại thư mục này.
Để thay nhạc, đặt một tệp âm thanh bạn có quyền sử dụng ở đây, ví dụ `gentle-piano.mp3`.
Trong `src/config/greeting.ts`, đổi `music.src` thành `/music/gentle-piano.mp3`, hoặc `null` để bỏ nhạc.
Âm lượng mặc định: `0.3`. Website chỉ phát khi người xem bấm nút nhạc.
Không thêm tệp có bản quyền khi chưa có quyền sử dụng.
