---
title: "Biến, Kiểu Dữ Liệu và Toán Tử trong JavaScript"
date: 2025-01-06
lastmod: 2025-01-06
draft: false
author: "Nguyễn Minh Long"
description: "Tìm hiểu về biến (var, let, const), kiểu dữ liệu nguyên thủy và toán tử trong JavaScript - nền tảng quan trọng cho mọi lập trình viên JavaScript."
tags:
  - JavaScript
  - Fundamentals
  - Tutorial
categories:
  - "JavaScript"
featuredImage: "/images/posts/javascript/javascript-variables.jpg"
featuredImagePreview: "/images/posts/javascript/javascript-variables-preview.jpg"
toc: true
ShowToc: true
math: false
code: true
---


## Giới thiệu

Sau khi đã hiểu JavaScript là gì và cách chạy JavaScript, bài viết này sẽ đi sâu vào **nền tảng cốt lõi** của ngôn ngữ: **biến, kiểu dữ liệu và toán tử**.

![JavaScript Variables](/images/posts/javascript/javascript-variables.jpg)

*Biến là nền tảng của mọi chương trình JavaScript*

Đây là những khái niệm cơ bản nhất mà mọi lập trình viên JavaScript cần nắm vững. Chúng ta sẽ tìm hiểu:

- Cách khai báo và sử dụng biến (`var`, `let`, `const`)
- Các kiểu dữ liệu nguyên thủy trong JavaScript
- Các toán tử để thao tác với dữ liệu

## Biến trong JavaScript

**Biến (Variable)** là một "hộp chứa" để lưu trữ dữ liệu. Bạn có thể đặt tên cho biến và gán giá trị vào đó, sau đó sử dụng tên biến để truy cập giá trị.

### Khai báo biến với var, let, const

JavaScript có **3 cách** để khai báo biến:

#### 1. `var` (cách cũ, không khuyến nghị)

```javascript
// Khai báo biến với var
var ten = "Minh Long";
var tuoi = 22;
var laSinhVien = true;

// Có thể khai báo lại
var ten = "Nguyễn Minh Long"; // OK với var
```

**Đặc điểm:**
- Có thể khai báo lại nhiều lần
- Có function scope (phạm vi hàm)
- Có hoisting (đưa khai báo lên đầu)

#### 2. `let` (khuyến nghị cho biến có thể thay đổi)

```javascript
// Khai báo biến với let
let diemSo = 85;
let monHoc = "Lập trình mạng";

// Có thể gán lại giá trị
diemSo = 90; // OK

// Không thể khai báo lại trong cùng scope
let diemSo = 95; // ❌ Lỗi: Identifier 'diemSo' has already been declared
```

**Đặc điểm:**
- Không thể khai báo lại trong cùng scope
- Có block scope (phạm vi khối)
- Phải khai báo trước khi sử dụng

#### 3. `const` (khuyến nghị cho hằng số)

```javascript
// Khai báo hằng số với const
const PI = 3.14159;
const TEN_TRUONG = "HUTECH";
const EMAIL = "nguyenminhlongcntt@gmail.com";

// Không thể gán lại giá trị
PI = 3.14; // ❌ Lỗi: Assignment to constant variable
```

**Đặc điểm:**
- Không thể gán lại giá trị
- Phải khởi tạo ngay khi khai báo
- Có block scope
- Khuyến nghị dùng cho giá trị không đổi

![Variable Declaration](/images/posts/javascript/browser-console.jpg)

*So sánh var, let và const trong JavaScript*

### So sánh var, let và const

| Đặc điểm | `var` | `let` | `const` |
|----------|-------|-------|---------|
| Khai báo lại | ✅ Được phép | ❌ Không được | ❌ Không được |
| Gán lại giá trị | ✅ Được phép | ✅ Được phép | ❌ Không được |
| Scope | Function | Block | Block |
| Hoisting | ✅ Có (undefined) | ✅ Có (TDZ) | ✅ Có (TDZ) |
| Khởi tạo | Không bắt buộc | Không bắt buộc | **Bắt buộc** |

**Khuyến nghị:**
- ✅ Dùng `const` mặc định (cho hầu hết trường hợp)
- ✅ Dùng `let` khi cần thay đổi giá trị
- ❌ Tránh dùng `var` (trừ khi làm việc với code cũ)

### Hoisting và Scope

**Hoisting** là cơ chế JavaScript "đưa" khai báo biến lên đầu scope trước khi thực thi code.

```javascript
// Ví dụ hoisting với var
console.log(x); // undefined (không lỗi!)
var x = 5;

// Tương đương với:
var x; // Hoisted lên đầu
console.log(x); // undefined
x = 5;
```

```javascript
// Ví dụ với let/const (Temporal Dead Zone)
console.log(y); // ❌ Lỗi: Cannot access 'y' before initialization
let y = 10;

// const cũng tương tự
console.log(z); // ❌ Lỗi
const z = 20;
```

**Scope (Phạm vi):**

```javascript
// Block scope với let/const
if (true) {
  let bienTrongBlock = "Chỉ tồn tại trong block này";
  const hangSoTrongBlock = 100;
}

console.log(bienTrongBlock); // ❌ Lỗi: bienTrongBlock is not defined

// Function scope với var
function testVar() {
  if (true) {
    var bienVar = "Có thể truy cập trong toàn bộ function";
  }
  console.log(bienVar); // ✅ OK: "Có thể truy cập trong toàn bộ function"
}
```

## Kiểu Dữ Liệu (Data Types)

JavaScript có **7 kiểu dữ liệu nguyên thủy (Primitive Types)** và **1 kiểu dữ liệu đối tượng (Object)**.

### Primitive Types

#### 1. `number` - Số

```javascript
let soNguyen = 42;
let soThuc = 3.14;
let soAm = -10;
let voCung = Infinity;
let khongPhaiSo = NaN; // Not a Number

// Kiểm tra kiểu
console.log(typeof soNguyen); // "number"
console.log(typeof soThuc);   // "number"
console.log(typeof NaN);      // "number" (đặc biệt!)
```

#### 2. `string` - Chuỗi

```javascript
let ten = "Minh Long";
let hoTen = 'Nguyễn Minh Long';
let cauChao = `Xin chào, tôi là ${ten}`; // Template literal

// Nối chuỗi
let fullName = ho + " " + ten;
let message = `Tên: ${hoTen}, Tuổi: ${22}`;

console.log(typeof ten); // "string"
```

#### 3. `boolean` - Logic

```javascript
let laSinhVien = true;
let daTotNghiep = false;

// Kết quả so sánh
let ketQua = 10 > 5; // true
let bangNhau = 5 === 5; // true

console.log(typeof laSinhVien); // "boolean"
```

#### 4. `undefined` - Chưa được gán

```javascript
let bienChuaGan;
console.log(bienChuaGan); // undefined
console.log(typeof bienChuaGan); // "undefined"
```

#### 5. `null` - Rỗng

```javascript
let giaTriRong = null;
console.log(giaTriRong); // null
console.log(typeof giaTriRong); // "object" (bug của JavaScript!)
```

#### 6. `symbol` - Ký hiệu (ES6+)

```javascript
// Tạo symbol duy nhất
let id1 = Symbol("id");
let id2 = Symbol("id");

console.log(id1 === id2); // false (mỗi symbol là duy nhất)
```

#### 7. `bigint` - Số nguyên lớn (ES2020+)

```javascript
// Cho số nguyên lớn hơn Number.MAX_SAFE_INTEGER
let soLon = 9007199254740991n; // Thêm 'n' ở cuối
let soLonKhac = BigInt("9007199254740991");

console.log(typeof soLon); // "bigint"
```

![JavaScript Data Types](/images/posts/javascript/javascript-datatypes.jpg)

*Các kiểu dữ liệu trong JavaScript*

### Type Checking và Type Coercion

**Type Checking (Kiểm tra kiểu):**

```javascript
// Sử dụng typeof
console.log(typeof 42);           // "number"
console.log(typeof "hello");      // "string"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof null);         // "object" (bug!)
console.log(typeof []);           // "object"
console.log(typeof {});           // "object"
console.log(typeof function(){}); // "function"
```

**Type Coercion (Chuyển đổi kiểu tự động):**

JavaScript tự động chuyển đổi kiểu trong một số trường hợp:

```javascript
// Chuyển đổi tự động
console.log("5" + 3);    // "53" (string)
console.log("5" - 3);    // 2 (number)
console.log("5" * "2");  // 10 (number)
console.log("10" / "2"); // 5 (number)

// So sánh với == (loose equality) - có coercion
console.log(5 == "5");   // true (chuyển "5" thành 5)
console.log(0 == false); // true (chuyển false thành 0)

// So sánh với === (strict equality) - không có coercion
console.log(5 === "5");   // false (khác kiểu)
console.log(0 === false); // false (khác kiểu)
```

**Khuyến nghị:** Luôn dùng `===` và `!==` thay vì `==` và `!=` để tránh lỗi do type coercion.

## Toán Tử (Operators)

Toán tử là các ký hiệu dùng để thực hiện phép toán hoặc thao tác trên dữ liệu.

### Toán tử số học

```javascript
let a = 10;
let b = 3;

console.log(a + b);  // 13 (cộng)
console.log(a - b);  // 7 (trừ)
console.log(a * b);  // 30 (nhân)
console.log(a / b);  // 3.333... (chia)
console.log(a % b);  // 1 (chia lấy dư)
console.log(a ** b); // 1000 (lũy thừa, ES2016+)

// Toán tử tăng/giảm
let count = 5;
count++;        // Tăng 1 (sau khi dùng)
++count;        // Tăng 1 (trước khi dùng)
count--;        // Giảm 1
--count;        // Giảm 1

console.log(count); // 5
```

### Toán tử so sánh

```javascript
let x = 10;
let y = 5;

// So sánh số
console.log(x > y);   // true
console.log(x < y);   // false
console.log(x >= y);  // true
console.log(x <= y);  // false

// So sánh bằng (strict)
console.log(x === y); // false
console.log(x !== y); // true

// So sánh bằng (loose - tránh dùng)
console.log(x == y);  // false
console.log(x != y);  // true
```

### Toán tử logic

```javascript
let diem = 85;
let coBaiTap = true;

// AND (&&) - cả hai đều true
if (diem >= 80 && coBaiTap) {
  console.log("Đạt yêu cầu!");
}

// OR (||) - một trong hai true
if (diem >= 90 || coBaiTap) {
  console.log("Có thể được ưu tiên");
}

// NOT (!) - đảo ngược
if (!coBaiTap) {
  console.log("Chưa làm bài tập");
}

// Truthy và Falsy
console.log(!!"hello");    // true (truthy)
console.log(!!"");         // false (falsy)
console.log(!!0);          // false (falsy)
console.log(!!null);       // false (falsy)
console.log(!!undefined);  // false (falsy)
```

**Falsy values:** `false`, `0`, `""`, `null`, `undefined`, `NaN`  
**Truthy values:** Tất cả giá trị khác (bao gồm `[]`, `{}`)

### Toán tử gán

```javascript
let num = 10;

num += 5;  // num = num + 5 → 15
num -= 3;  // num = num - 3 → 12
num *= 2;  // num = num * 2 → 24
num /= 4;  // num = num / 4 → 6
num %= 4;  // num = num % 4 → 2

console.log(num); // 2
```

## Ví dụ thực tế

### Ví dụ 1: Tính điểm trung bình

```javascript
// Khai báo điểm các môn
const diemToan = 8.5;
const diemLy = 7.5;
const diemHoa = 9.0;

// Tính điểm trung bình
const diemTrungBinh = (diemToan + diemLy + diemHoa) / 3;

// Kiểm tra kết quả
if (diemTrungBinh >= 8.0) {
  console.log(`Điểm trung bình: ${diemTrungBinh.toFixed(2)} - Xuất sắc!`);
} else if (diemTrungBinh >= 6.5) {
  console.log(`Điểm trung bình: ${diemTrungBinh.toFixed(2)} - Khá`);
} else {
  console.log(`Điểm trung bình: ${diemTrungBinh.toFixed(2)} - Cần cố gắng`);
}
```

### Ví dụ 2: Xử lý thông tin người dùng

```javascript
// Thông tin người dùng
let hoTen = "Nguyễn Minh Long";
let tuoi = 22;
let laSinhVien = true;
let monHocYeuThich = "Lập trình mạng";

// Tạo thông báo
let thongBao = `Xin chào, tôi là ${hoTen}, ${tuoi} tuổi. `;
thongBao += laSinhVien ? "Tôi là sinh viên. " : "Tôi không phải sinh viên. ";
thongBao += `Môn học yêu thích của tôi là ${monHocYeuThich}.`;

console.log(thongBao);
// "Xin chào, tôi là Nguyễn Minh Long, 22 tuổi. Tôi là sinh viên. Môn học yêu thích của tôi là Lập trình mạng."
```

### Ví dụ 3: Kiểm tra điều kiện phức tạp

```javascript
// Điều kiện đăng ký khóa học
const tuoi = 20;
const coKinhNghiem = false;
const coChungChi = true;

// Có thể đăng ký nếu: (tuổi >= 18) HOẶC (có kinh nghiệm VÀ có chứng chỉ)
const coTheDangKy = (tuoi >= 18) || (coKinhNghiem && coChungChi);

if (coTheDangKy) {
  console.log("Bạn có thể đăng ký khóa học!");
} else {
  console.log("Bạn chưa đủ điều kiện đăng ký.");
}
```

## Kết luận

Trong bài 2, bạn đã học được:

- ✅ **Biến**: Cách khai báo với `var`, `let`, `const` và khi nào dùng cái nào
- ✅ **Kiểu dữ liệu**: 7 primitive types và cách kiểm tra kiểu
- ✅ **Toán tử**: Số học, so sánh, logic, gán và cách sử dụng
- ✅ **Type coercion**: Hiểu cách JavaScript chuyển đổi kiểu tự động

**Best Practices:**
- ✅ Luôn dùng `const` mặc định, chỉ dùng `let` khi cần thay đổi
- ✅ Luôn dùng `===` và `!==` thay vì `==` và `!=`
- ✅ Đặt tên biến rõ ràng, có ý nghĩa
- ✅ Khởi tạo biến ngay khi khai báo

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Functions và Scope** - cách tổ chức code thành các hàm có thể tái sử dụng.
