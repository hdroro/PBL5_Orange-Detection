# **PBL5 Hệ thống nhận dạng chất lượng trái cam vàng**

## **Giới thiệu**

- Với sự phát triển của công nghệ thông tin, việc áp dụng các công nghệ hiện đại đã giúp cải thiện hiệu quả công việc và hiệu suất của dây chuyền sản xuất, đặc biệt trong ngành công nghiệp thực phẩm. Trong dây chuyền phân loại trái cây, hầu hết việc phân loại chất lượng đều được thực hiện thủ công, từ đó đặt ra yêu cầu việc tự động phân loại chất lượng trong dây chuyền.
- Thông qua việc ứng dụng những kiến thức về khoa học dữ liệu và trí tuệ nhân tạo, chúng em đã xây dựng một hệ thống nhận dạng chất lượng trái cây (cụ thể là trái cam vàng)

## **Những thông tin về các folders dự án**

- Folder `Data` bao gồm:

  - Folder `dataset`: chứa data được thu thập từ nhiều nguồn và đã lọc để chọn ra những ảnh phù hợp.
  - Folder `resized_dataset`: chưa data sau khi thực hiện resize
  - Folder `fruit_dataser`: chứa data sau khi phân chia thành 3 tập là train/test/val
  - File `TienXuLy.ipynb`: source code tiền xử lý

- Folder `Frontend`: chứa ứng dụng web của dự án.
- Folder `Model`: chứa model được sử dụng trong dự án.
- Folder `Server`: chứa source code được nhúng trên Raspberry Pi để thực hiện các công việc của dự án.

## **Hướng dẫn chạy chương trình**

**1. Đối với bước tiền xử lý dữ liệu ở folder `Data`:**

- Tải folder `dataset` về máy
- Mở file `TienXuLy.ipynb` sau đó tiến hành chạy từng cell trong file, ta sẽ được kết quả là 2 folder `resized_dataset` và `fruit_dataset`.

**2. Đối với việc train model ở folder `Model`:**

- Tiến hành upload bộ dữ liệu trong folder `fruit_dataset` và file model `MobilenetV2.ipynb` lên drive của bạn.
- Mở file `MobilenetV2.ipynb`, sau đó tiến hành sửa đổi các đường dẫn đến bộ dữ liệu và model trên drive bạn.
- Tiến hành chạy từng cell trong file, ta sẽ được kết quả là model mới được train và có thể sử dụng model đó vào các công việc tiếp theo.

**3. Đối với ứng dụng web ở folder `Frontend`:**

- Sử đổi các thông số về database (Firebase) phù hợp với database của bạn ở file `./src/config/firebaseConfig.js`.
- Cài đặt các package yêu cầu: `npm install`.
- Chạy dự án: `npm start`.

**4. Đối với việc nạp code vào Raspberry Pi ở folder `Server`:**

- Các files trong folder này được nhúng trên raspberry pi. Các công việc cần thực hiện trước khi chạy:
  - Setup Raspberry Pi
  - Cài đặt các package cần thiết: `tflite_runtime`, `matplotlib`
  - Thực hiện thay đổi các thông số database ở file `storage.py`
  - Nạp code: chạy file `main.py`

## **Thành viên**

- Tô Phan Thùy Phương
- Nguyễn Thị Hồng Diễm
- Nguyễn Phương Hà
- Lê Nguyễn Yến Nhi
