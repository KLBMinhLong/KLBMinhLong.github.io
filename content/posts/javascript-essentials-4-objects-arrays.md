---
title: "Objects và Arrays trong JavaScript"
date: 2025-01-08
lastmod: 2025-01-08
draft: false
author: "Nguyễn Minh Long"
description: "Tìm hiểu cách làm việc với Objects và Arrays trong JavaScript - cấu trúc dữ liệu quan trọng nhất, bao gồm object literals, array methods, destructuring và spread operator."
tags:
  - JavaScript
  - Data Structures
  - Tutorial
categories:
  - "JavaScript"
featuredImage: "/images/posts/javascript/javascript-objects-arrays.jpg"
featuredImagePreview: "/images/posts/javascript/javascript-objects-arrays-preview.jpg"
toc: true
ShowToc: true
math: false
code: true
---

## Giới thiệu

Sau khi đã nắm vững biến, kiểu dữ liệu và toán tử, bài viết này sẽ giới thiệu về **Objects** và **Arrays** - hai cấu trúc dữ liệu quan trọng nhất trong JavaScript.

![JavaScript Objects and Arrays](/images/posts/javascript/javascript-objects-arrays.jpg)

*Objects và Arrays - Cấu trúc dữ liệu cốt lõi trong JavaScript*

Chúng ta sẽ tìm hiểu:

- Cách tạo và sử dụng Objects (đối tượng)
- Cách làm việc với Arrays (mảng)
- Các phương thức mạnh mẽ của Array: `map`, `filter`, `reduce`
- Destructuring - cách "bóc tách" dữ liệu từ Objects và Arrays
- Spread operator - cách "trải rộng" dữ liệu

## Objects (Đối tượng)

**Object** là một tập hợp các cặp **key-value** (khóa-giá trị), dùng để lưu trữ dữ liệu có cấu trúc.

### Tạo Object

Có nhiều cách để tạo object:

#### 1. Object Literal (Cách phổ biến nhất)

```javascript
// Tạo object với object literal
const sinhVien = {
  ten: "Nguyễn Minh Long",
  tuoi: 22,
  monHoc: "Lập trình mạng",
  diemSo: 8.5,
  laSinhVien: true
};

// Truy cập thuộc tính
console.log(sinhVien.ten);        // "Nguyễn Minh Long"
console.log(sinhVien["tuoi"]);    // 22 (cách khác)
```

#### 2. Object Constructor

```javascript
// Tạo object với constructor
const sinhVien2 = new Object();
sinhVien2.ten = "Trần Văn A";
sinhVien2.tuoi = 20;
```

#### 3. Object với phương thức (methods)

```javascript
// Object có thể chứa functions (gọi là methods)
const nguoiDung = {
  ten: "Minh Long",
  tuoi: 22,
  
  // Method: function trong object
  gioiThieu: function() {
    return `Xin chào, tôi là ${this.ten}, ${this.tuoi} tuổi.`;
  },
  
  // ES6 shorthand (cách viết ngắn gọn)
  tangTuoi() {
    this.tuoi++;
    return this.tuoi;
  }
};

console.log(nguoiDung.gioiThieu()); // "Xin chào, tôi là Minh Long, 22 tuổi."
console.log(nguoiDung.tangTuoi());  // 23
```

### Thêm, Sửa, Xóa thuộc tính

```javascript
const car = {
  brand: "Toyota",
  model: "Camry"
};

// Thêm thuộc tính mới
car.year = 2023;
car.color = "Đen";

// Sửa thuộc tính
car.color = "Trắng";

// Xóa thuộc tính
delete car.year;

console.log(car); // { brand: "Toyota", model: "Camry", color: "Trắng" }
```

### Lặp qua Object

```javascript
const sinhVien = {
  ten: "Minh Long",
  tuoi: 22,
  monHoc: "Lập trình mạng"
};

// Dùng for...in
for (let key in sinhVien) {
  console.log(`${key}: ${sinhVien[key]}`);
}

// Dùng Object.keys()
Object.keys(sinhVien).forEach(key => {
  console.log(`${key}: ${sinhVien[key]}`);
});

// Dùng Object.entries() (ES2017+)
Object.entries(sinhVien).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
```

## Arrays (Mảng)

**Array** là một danh sách có thứ tự các giá trị, có thể chứa bất kỳ kiểu dữ liệu nào.

### Tạo Array

```javascript
// Cách 1: Array literal (khuyến nghị)
const monHoc = ["Toán", "Lý", "Hóa", "Tin học"];
const soNguyen = [1, 2, 3, 4, 5];
const honHop = ["Chuỗi", 42, true, null, { ten: "Object" }];

// Cách 2: Array constructor
const monHoc2 = new Array("Toán", "Lý", "Hóa");

// Mảng rỗng
const mangRong = [];
```

### Truy cập phần tử

```javascript
const monHoc = ["Toán", "Lý", "Hóa", "Tin học"];

// Truy cập bằng index (bắt đầu từ 0)
console.log(monHoc[0]);  // "Toán"
console.log(monHoc[2]);  // "Hóa"
console.log(monHoc[10]); // undefined (không tồn tại)

// Độ dài mảng
console.log(monHoc.length); // 4

// Phần tử cuối cùng
console.log(monHoc[monHoc.length - 1]); // "Tin học"
```

### Thêm, Xóa phần tử

```javascript
const mang = ["A", "B"];

// Thêm vào cuối
mang.push("C");        // ["A", "B", "C"]
mang.push("D", "E");   // ["A", "B", "C", "D", "E"]

// Xóa phần tử cuối
mang.pop();            // Trả về "E", mảng: ["A", "B", "C", "D"]

// Thêm vào đầu
mang.unshift("Z");     // ["Z", "A", "B", "C", "D"]

// Xóa phần tử đầu
mang.shift();          // Trả về "Z", mảng: ["A", "B", "C", "D"]

// Xóa/Thêm ở vị trí bất kỳ: splice()
mang.splice(1, 2);     // Xóa 2 phần tử từ index 1: ["A", "D"]
mang.splice(1, 0, "X", "Y"); // Thêm "X", "Y" tại index 1: ["A", "X", "Y", "D"]
```

### Lặp qua Array

```javascript
const monHoc = ["Toán", "Lý", "Hóa"];

// 1. for loop (cổ điển)
for (let i = 0; i < monHoc.length; i++) {
  console.log(monHoc[i]);
}

// 2. for...of (ES6+)
for (let mon of monHoc) {
  console.log(mon);
}

// 3. forEach (functional)
monHoc.forEach((mon, index) => {
  console.log(`${index + 1}. ${mon}`);
});
```

## Array Methods Quan Trọng

JavaScript cung cấp nhiều phương thức mạnh mẽ để xử lý mảng.

### map() - Biến đổi từng phần tử

```javascript
// Tạo mảng mới bằng cách biến đổi từng phần tử
const soNguyen = [1, 2, 3, 4, 5];

// Nhân mỗi số với 2
const soNhan2 = soNguyen.map(so => so * 2);
console.log(soNhan2); // [2, 4, 6, 8, 10]

// Chuyển đổi object
const sinhVien = [
  { ten: "Minh Long", tuoi: 22 },
  { ten: "Văn A", tuoi: 20 }
];

const danhSachTen = sinhVien.map(sv => sv.ten);
console.log(danhSachTen); // ["Minh Long", "Văn A"]
```

### filter() - Lọc phần tử

```javascript
// Tạo mảng mới chỉ chứa các phần tử thỏa điều kiện
const soNguyen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Lọc số chẵn
const soChan = soNguyen.filter(so => so % 2 === 0);
console.log(soChan); // [2, 4, 6, 8, 10]

// Lọc sinh viên có điểm >= 8
const sinhVien = [
  { ten: "Minh Long", diem: 8.5 },
  { ten: "Văn A", diem: 7.0 },
  { ten: "Thị B", diem: 9.0 }
];

const sinhVienGioi = sinhVien.filter(sv => sv.diem >= 8);
console.log(sinhVienGioi); // [{ ten: "Minh Long", diem: 8.5 }, { ten: "Thị B", diem: 9.0 }]
```

### reduce() - Gộp thành một giá trị

```javascript
// Gộp tất cả phần tử thành một giá trị duy nhất
const soNguyen = [1, 2, 3, 4, 5];

// Tính tổng
const tong = soNguyen.reduce((tong, so) => tong + so, 0);
console.log(tong); // 15

// Tìm số lớn nhất
const soLonNhat = soNguyen.reduce((max, so) => so > max ? so : max, soNguyen[0]);
console.log(soLonNhat); // 5

// Đếm số lượng
const sinhVien = [
  { ten: "Minh Long", gioiTinh: "Nam" },
  { ten: "Thị B", gioiTinh: "Nữ" },
  { ten: "Văn A", gioiTinh: "Nam" }
];

const demNam = sinhVien.reduce((dem, sv) => {
  return sv.gioiTinh === "Nam" ? dem + 1 : dem;
}, 0);
console.log(demNam); // 2
```

### Các phương thức khác

```javascript
const mang = [1, 2, 3, 4, 5];

// find() - Tìm phần tử đầu tiên thỏa điều kiện
const soLonHon3 = mang.find(so => so > 3);
console.log(soLonHon3); // 4

// findIndex() - Tìm index của phần tử đầu tiên
const index = mang.findIndex(so => so > 3);
console.log(index); // 3

// some() - Kiểm tra có ít nhất 1 phần tử thỏa điều kiện
const coSoChan = mang.some(so => so % 2 === 0);
console.log(coSoChan); // true

// every() - Kiểm tra tất cả phần tử đều thỏa điều kiện
const tatCaDuong = mang.every(so => so > 0);
console.log(tatCaDuong); // true

// includes() - Kiểm tra có chứa giá trị
console.log(mang.includes(3)); // true
console.log(mang.includes(10)); // false

// slice() - Cắt mảng (không thay đổi mảng gốc)
const mangCon = mang.slice(1, 4);
console.log(mangCon); // [2, 3, 4]
console.log(mang); // [1, 2, 3, 4, 5] (không đổi)

// concat() - Nối mảng
const mang1 = [1, 2];
const mang2 = [3, 4];
const mangMoi = mang1.concat(mang2);
console.log(mangMoi); // [1, 2, 3, 4]
```

![JavaScript Array Methods](/images/posts/javascript/javascript-array-methods.jpg)

*Các phương thức mạnh mẽ của Array trong JavaScript*

## Destructuring (Bóc tách)

**Destructuring** cho phép "bóc tách" giá trị từ Objects và Arrays vào các biến riêng biệt.

### Destructuring Arrays

```javascript
const monHoc = ["Toán", "Lý", "Hóa"];

// Cách cũ
const mon1 = monHoc[0];
const mon2 = monHoc[1];

// Destructuring
const [mon1, mon2, mon3] = monHoc;
console.log(mon1); // "Toán"
console.log(mon2); // "Lý"
console.log(mon3); // "Hóa"

// Bỏ qua phần tử
const [dauTien, , thuBa] = monHoc;
console.log(dauTien); // "Toán"
console.log(thuBa);   // "Hóa"

// Giá trị mặc định
const [a, b, c, d = "Mặc định"] = monHoc;
console.log(d); // "Mặc định" (vì monHoc chỉ có 3 phần tử)

// Hoán đổi giá trị
let x = 10;
let y = 20;
[x, y] = [y, x];
console.log(x); // 20
console.log(y); // 10
```

### Destructuring Objects

```javascript
const sinhVien = {
  ten: "Minh Long",
  tuoi: 22,
  monHoc: "Lập trình mạng"
};

// Destructuring
const { ten, tuoi, monHoc } = sinhVien;
console.log(ten);    // "Minh Long"
console.log(tuoi);   // 22
console.log(monHoc); // "Lập trình mạng"

// Đổi tên biến
const { ten: hoTen, tuoi: soTuoi } = sinhVien;
console.log(hoTen);  // "Minh Long"
console.log(soTuoi); // 22

// Giá trị mặc định
const { ten, tuoi, diemSo = 0 } = sinhVien;
console.log(diemSo); // 0 (vì không có trong object)

// Destructuring lồng nhau
const nguoiDung = {
  ten: "Minh Long",
  diaChi: {
    thanhPho: "Hồ Chí Minh",
    quan: "Quận 7"
  }
};

const { ten, diaChi: { thanhPho } } = nguoiDung;
console.log(ten);     // "Minh Long"
console.log(thanhPho); // "Hồ Chí Minh"
```

### Destructuring trong Function Parameters

```javascript
// Destructuring trong tham số hàm
function gioiThieu({ ten, tuoi }) {
  return `Xin chào, tôi là ${ten}, ${tuoi} tuổi.`;
}

const sinhVien = { ten: "Minh Long", tuoi: 22 };
console.log(gioiThieu(sinhVien)); // "Xin chào, tôi là Minh Long, 22 tuổi."

// Với giá trị mặc định
function tinhDiem({ diem1 = 0, diem2 = 0, diem3 = 0 }) {
  return (diem1 + diem2 + diem3) / 3;
}

console.log(tinhDiem({ diem1: 8, diem2: 9 })); // 5.67
```

## Spread Operator (Toán tử trải rộng)

**Spread operator** (`...`) cho phép "trải rộng" các phần tử của mảng hoặc thuộc tính của object.

### Spread với Arrays

```javascript
const mang1 = [1, 2, 3];
const mang2 = [4, 5, 6];

// Nối mảng
const mangMoi = [...mang1, ...mang2];
console.log(mangMoi); // [1, 2, 3, 4, 5, 6]

// Sao chép mảng (shallow copy)
const mangBanSao = [...mang1];
mangBanSao.push(4);
console.log(mang1);      // [1, 2, 3] (không đổi)
console.log(mangBanSao); // [1, 2, 3, 4]

// Thêm phần tử
const mangThem = [0, ...mang1, 4];
console.log(mangThem); // [0, 1, 2, 3, 4]

// Truyền tham số cho hàm
function cong(a, b, c) {
  return a + b + c;
}

const so = [1, 2, 3];
console.log(cong(...so)); // 6
```

### Spread với Objects

```javascript
const nguoi1 = { ten: "Minh Long", tuoi: 22 };
const nguoi2 = { monHoc: "Lập trình mạng" };

// Gộp objects
const nguoiDayDu = { ...nguoi1, ...nguoi2 };
console.log(nguoiDayDu); 
// { ten: "Minh Long", tuoi: 22, monHoc: "Lập trình mạng" }

// Sao chép object (shallow copy)
const nguoiBanSao = { ...nguoi1 };
nguoiBanSao.tuoi = 23;
console.log(nguoi1.tuoi);      // 22 (không đổi)
console.log(nguoiBanSao.tuoi); // 23

// Ghi đè thuộc tính
const nguoiCapNhat = { ...nguoi1, tuoi: 23 };
console.log(nguoiCapNhat); // { ten: "Minh Long", tuoi: 23 }
```

## Ví dụ thực tế

### Ví dụ 1: Quản lý danh sách sinh viên

```javascript
// Danh sách sinh viên
const danhSachSinhVien = [
  { id: 1, ten: "Nguyễn Minh Long", diem: 8.5, monHoc: "Lập trình mạng" },
  { id: 2, ten: "Trần Văn A", diem: 7.0, monHoc: "Cơ sở dữ liệu" },
  { id: 3, ten: "Lê Thị B", diem: 9.0, monHoc: "Lập trình mạng" },
  { id: 4, ten: "Phạm Văn C", diem: 6.5, monHoc: "Mạng máy tính" }
];

// 1. Tìm sinh viên có điểm cao nhất
const sinhVienGioiNhat = danhSachSinhVien.reduce((max, sv) => 
  sv.diem > max.diem ? sv : max
);
console.log("Sinh viên giỏi nhất:", sinhVienGioiNhat.ten);

// 2. Lọc sinh viên học "Lập trình mạng"
const sinhVienLTM = danhSachSinhVien.filter(sv => sv.monHoc === "Lập trình mạng");
console.log("Sinh viên LTM:", sinhVienLTM.map(sv => sv.ten));

// 3. Tính điểm trung bình
const diemTrungBinh = danhSachSinhVien.reduce((tong, sv) => tong + sv.diem, 0) 
                     / danhSachSinhVien.length;
console.log("Điểm trung bình:", diemTrungBinh.toFixed(2));

// 4. Tạo danh sách tên sinh viên
const danhSachTen = danhSachSinhVien.map(sv => sv.ten);
console.log("Danh sách tên:", danhSachTen);
```

### Ví dụ 2: Xử lý dữ liệu API

```javascript
// Giả sử nhận dữ liệu từ API
const apiResponse = {
  status: "success",
  data: {
    users: [
      { id: 1, name: "Minh Long", email: "long@example.com" },
      { id: 2, name: "Văn A", email: "a@example.com" }
    ],
    total: 2
  }
};

// Destructuring để lấy dữ liệu
const { status, data: { users, total } } = apiResponse;

// Xử lý danh sách users
const userEmails = users.map(user => user.email);
console.log("Emails:", userEmails);

// Tìm user theo id
const user = users.find(u => u.id === 1);
console.log("User tìm thấy:", user);
```

### Ví dụ 3: Cập nhật state (React-style)

```javascript
// Giả sử có state object
let state = {
  user: { name: "Minh Long", age: 22 },
  posts: ["Bài 1", "Bài 2"],
  count: 0
};

// Cập nhật state không thay đổi object gốc (immutable)
function updateUser(newName) {
  state = {
    ...state,
    user: {
      ...state.user,
      name: newName
    }
  };
}

function addPost(newPost) {
  state = {
    ...state,
    posts: [...state.posts, newPost],
    count: state.count + 1
  };
}

updateUser("Nguyễn Minh Long");
addPost("Bài 3");

console.log(state);
// {
//   user: { name: "Nguyễn Minh Long", age: 22 },
//   posts: ["Bài 1", "Bài 2", "Bài 3"],
//   count: 1
// }
```

## Kết luận

Trong bài 4, bạn đã học được:

- ✅ **Objects**: Cách tạo, truy cập, và thao tác với objects
- ✅ **Arrays**: Cách làm việc với mảng, thêm/xóa phần tử
- ✅ **Array Methods**: `map`, `filter`, `reduce` và các phương thức khác
- ✅ **Destructuring**: Bóc tách dữ liệu từ objects và arrays
- ✅ **Spread Operator**: Trải rộng và sao chép dữ liệu

**Best Practices:**
- ✅ Dùng `const` cho objects và arrays (vì reference không đổi)
- ✅ Ưu tiên dùng `map`, `filter`, `reduce` thay vì vòng lặp `for`
- ✅ Dùng destructuring để code ngắn gọn và dễ đọc hơn
- ✅ Dùng spread operator để sao chép, tránh mutation

**Lưu ý quan trọng:**
- Objects và Arrays là **reference types** - khi gán, chỉ copy reference, không copy giá trị
- Dùng spread operator hoặc các phương thức như `slice()`, `concat()` để tạo bản sao mới

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Asynchronous JavaScript** - cách xử lý các tác vụ bất đồng bộ với Promises và Async/Await.
