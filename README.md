# Lập Trình Di Động Nâng Cao - React Native

## Sinh viên thực hiện

- Họ và tên: `Nguyễn Khánh Quy`
- MSSV: `21110282`

## Danh sách bài tập

1. [Bài tập tuần 1 - 22/08/2024](#bài-tập-tuần-1---22082024)
1. [Bài tập tuần 2 - 29/08/2024](#bài-tập-tuần-2---29082024)
1. [Bài tập tuần 3 - 05/09/2024](#bài-tập-tuần-3---05092024)
1. [Bài tập tuần 4 - 12/09/2024](#bài-tập-tuần-4---12092024)
1. [Bài tập tuần 5 - 19/09/2024](#bài-tập-tuần-5---19092024)
1. [Bài tập tuần 6 - 26/09/2024](#bài-tập-tuần-6---26092024)
1. [Bài tập tuần 7 - 03/10/2024](#bài-tập-tuần-7---03102024)
1. [Bài tập tuần 8 - 10/10/2024](#bài-tập-tuần-8---10102024)

### Bài tập tuần 1 - 22/08/2024

- [Bài tập 01: Cài đặt môi trường lập trình](https://github.com/nguyenkhanhquy/baitap01-22-08-2024)

Yêu cầu:

1. Sinh viên xem hướng dẫn cài đặt môi trường trên trang chủ của ReactNative (<https://reactnative.dev>) nếu làm về ReactNative tiến hành cài đặt môi trường làm việc.
1. Sau đó làm bài tập 01: viết 01 app với 02 trang: trang giới thiệu bản thân trong 10s sau đó tự chuyển sang trang Homepage.

### Bài tập tuần 2 - 29/08/2024

- [Bài tập 02: Chức năng Register, Login, Forget Password](https://github.com/nguyenkhanhquy/baitap02-29-08-2024)

Yêu cầu:

1. Sinh viên thực hiện xây dựng chức năng Register không dùng OTP, Login, Forget Password có dùng OTP với giao diện tùy từng sinh viên và API của nhóm đề tài.
1. Chức năng Register và Login làm từ 7g30 - 10g30
1. Chức năng ForgetPassword làm ở nhà

### Bài tập tuần 3 - 05/09/2024

- [Bài tập A03: Xây dựng trang chủ của ứng dụng](https://github.com/nguyenkhanhquy/react-native/tree/main/21110282_NguyenKhanhQuy)

Yêu cầu:

1. Tìm hiểu JWT và vận dụng vào trang Login và các trang sau Login để bảo mật API truyền cho App, OTP gửi 6 số ngẫu nhiên về cho email khi kích hoạt tài khoản sau đăng ký và khi chỉnh sửa profile người dùng.
1. Xây dựng trang chủ của đề tài có sử dụng Tailwind CSS (<https://tailwindcss.com>) hoặc tương đương để làm giao diện đẹp. Design Navigation cho ứng dụng API cho trang chủ dùng chung của nhóm đề tài.
1. Sử dụng RealM hoặc tương đương để lưu thông tin tài khoản sau khi đăng nhập để hiển thị lên cho trang chủ.

### Bài tập tuần 4 - 12/09/2024

- [Bài tập A04: Chức năng profile, tìm kiếm, chi tiết](https://github.com/nguyenkhanhquy/react-native/tree/main/21110282_NguyenKhanhQuy)

Yêu cầu:

1. Chức năng Profile của người dùng đã đăng nhập thành công (API và Code): nộp từ 8g - 10g30
1. Chức năng tìm kiếm, lọc sản phẩm trên trang chủ (API và Code): về nhà
1. Chức năng xem Chi tiết sản phẩm từ trang chủ, từ kết quả tìm kiếm, lọc (API và Code): về nhà

### Bài tập tuần 5 - 19/09/2024

- [Bài tập A05: Xây dựng trang chủ của ứng dụng](https://github.com/nguyenkhanhquy/react-native/tree/main/21110282_NguyenKhanhQuy)

Bài tập nhóm:

1. Chức năng hiển thị 10 sản phẩm bán chạy nhất hiển thị theo chiều ngang của màn hình (API và Code)
1. Chức năng hiển thị tất cả sản phẩm theo từng danh mục sử dụng Lazy loading để load tiếp sản phẩm khi kéo xuống cuối trang (API và Code)
1. Xây dựng Navigation ở cuối trang và UI Search, Back ở trên cùng của trang.

### Bài tập tuần 6 - 26/09/2024

- [Bài tập A06: Chức năng giỏ hàng, thanh toán đơn hàng](https://github.com/nguyenkhanhquy/react-native/tree/main/21110282_NguyenKhanhQuy)

Bài tập nhóm:

1. Xây dựng chức năng Giỏ hàng cho ứng dụng bán hàng (API + App). Lưu trữ thông tin giỏ hàng bằng local database hoặc lưu trên API đều được.
1. Xây dựng chức năng thanh toán đơn hàng với phương thức bắt buộc là COD, có thể tìm hiểu thêm về thanh toán thông qua ví điện tử,...
1. Xây dựng chức năng theo dõi đơn hàng của người dùng gồm xem lại lịch sử mua hàng và theo dõi đơn hàng có xác định các trạng thái đơn hàng:  
    1. Đơn hàng mới
    2. Đã xác nhận đơn hàng (thủ công hoặc tự động 30 phút sau khi đơn đặt thành công)
    3. Shop đang chuẩn bị hàng
    4. Đang giao hàng
    5. Đã giao thành công
    6. Hủy đơn hàng (chỉ cho phép hủy trước 30 phút sau khi đặt đơn, nếu đang ở bước 3 thì chuyển sang Gửi Yêu cầu hủy đơn cho shop)

### Bài tập tuần 7 - 03/10/2024

- [Bài tập A07: Bình luận, đánh giá, yêu thích](https://github.com/nguyenkhanhquy/react-native/tree/main/21110282_NguyenKhanhQuy)

Bài tập nhóm:

1. Xây dựng chức năng Bình luận, đánh giá sản phẩm đã mua thành công, mỗi lần đánh giá sẽ tặng mã giảm giá hoặc tặng điểm vào kho điểm tích lũy của mình cho lần mua sau (API + App).  
1. Xây dựng chức năng sản phẩm yêu thích, sản phẩm tương tự, sản phẩm đã xem và đếm số khách mua, khách bình luận trên sản phẩm đó (API + App).
1. Xây dựng chức năng phiếu giảm giá, khuyến mãi để áp vào sản phẩm khi khách mua hàng, kho điểm tích lũy để mua hàng từ điểm tích lũy (chức năng mở rộng).

### Bài tập tuần 8 - 10/10/2024

- [Bài tập A08: Chức năng Notification và Thống kê lịch sử mua hàng](https://github.com/nguyenkhanhquy/react-native/tree/main/21110282_NguyenKhanhQuy)

Bài tập nhóm:

1. Xây dựng chức năng Notification để thông báo các hoạt động mới của ứng dụng, ví dụ như có bao nhiêu đơn hàng mới, bài viết mới, sự kiện mới, đánh giá, bình luận mới,... (API + App).
1. Xây dựng chức năng Thống kê dòng tiền của lịch sử mua hàng của user (tổng số tiền cho các đơn chờ xác nhận, các đơn đang giao, các đơn đã giao) (API + App).
