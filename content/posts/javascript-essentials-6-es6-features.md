---
title: "ES6+ Features: Modules, Classes và More"
date: 2025-01-10
lastmod: 2025-01-10
draft: false
author: "Nguyễn Minh Long"
description: "Tìm hiểu các tính năng mới của ES6+: ES6 Modules (import/export), Classes, Template literals, Optional chaining và nhiều tính năng hiện đại khác trong JavaScript."
tags:
  - JavaScript
  - ES6
  - Tutorial
categories:
  - "JavaScript"
featuredImage: "/images/posts/javascript/javascript-es6.jpg"
featuredImagePreview: "/images/posts/javascript/javascript-es6-preview.jpg"
toc: true
ShowToc: true
math: false
code: true
---

## Giới thiệu

ES6 (ECMAScript 2015) và các phiên bản sau đó đã mang đến nhiều tính năng mới mạnh mẽ cho JavaScript, giúp code dễ đọc, dễ bảo trì và hiện đại hơn.

![JavaScript ES6+](/images/posts/javascript/javascript-es6.jpg)

*ES6+ Features - Các tính năng hiện đại của JavaScript*

Bài viết này sẽ giới thiệu:

- **ES6 Modules** - Cách tổ chức code với import/export
- **Classes** - Lập trình hướng đối tượng trong JavaScript
- **Template Literals** - Chuỗi với biểu thức nhúng
- **Optional Chaining** - Truy cập thuộc tính an toàn
- **Và nhiều tính năng khác**

## ES6 Modules (import/export)

**Modules** giúp tổ chức code thành các file riêng biệt, dễ quản lý và tái sử dụng.

### Export (Xuất)

```javascript
// math.js
// Named export
export function cong(a, b) {
  return a + b;
}

export function tru(a, b) {
  return a - b;
}

export const PI = 3.14159;

// Hoặc export ở cuối file
function nhan(a, b) {
  return a * b;
}

function chia(a, b) {
  return b !== 0 ? a / b : "Không thể chia cho 0";
}

export { nhan, chia };

// Default export (chỉ một default export mỗi file)
export default function tinhToan(operation, a, b) {
  switch(operation) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
    default: return "Phép toán không hợp lệ";
  }
}
```

### Import (Nhập)

```javascript
// main.js
// Named import
import { cong, tru, PI } from './math.js';

console.log(cong(5, 3)); // 8
console.log(tru(10, 4)); // 6
console.log(PI); // 3.14159

// Import tất cả
import * as math from './math.js';
console.log(math.cong(5, 3)); // 8
console.log(math.PI); // 3.14159

// Default import
import tinhToan from './math.js';
console.log(tinhToan('+', 5, 3)); // 8

// Import với alias (đổi tên)
import { cong as add, tru as subtract } from './math.js';
console.log(add(5, 3)); // 8

// Import cả default và named
import tinhToan, { cong, tru } from './math.js';
```

### Ví dụ thực tế

```javascript
// user.js
export class User {
  constructor(ten, email) {
    this.ten = ten;
    this.email = email;
  }
  
  gioiThieu() {
    return `Xin chào, tôi là ${this.ten}`;
  }
}

export function taoUser(ten, email) {
  return new User(ten, email);
}

// main.js
import { User, taoUser } from './user.js';

const user1 = new User("Minh Long", "long@example.com");
const user2 = taoUser("Văn A", "a@example.com");
```

## Classes (Lớp)

**Classes** cung cấp cú pháp rõ ràng hơn để tạo objects và làm việc với kế thừa.

### Class cơ bản

```javascript
// Cách cũ (ES5) - Constructor function
function SinhVien(ten, tuoi) {
  this.ten = ten;
  this.tuoi = tuoi;
}

SinhVien.prototype.gioiThieu = function() {
  return `Tôi là ${this.ten}, ${this.tuoi} tuổi`;
};

// Cách mới (ES6+) - Class
class SinhVien {
  constructor(ten, tuoi) {
    this.ten = ten;
    this.tuoi = tuoi;
  }
  
  gioiThieu() {
    return `Tôi là ${this.ten}, ${this.tuoi} tuổi`;
  }
}

const sv = new SinhVien("Minh Long", 22);
console.log(sv.gioiThieu()); // "Tôi là Minh Long, 22 tuổi"
```

### Getters và Setters

```javascript
class NguoiDung {
  constructor(ten, tuoi) {
    this._ten = ten;
    this._tuoi = tuoi;
  }
  
  // Getter
  get ten() {
    return this._ten;
  }
  
  // Setter
  set ten(tenMoi) {
    if (tenMoi.length < 2) {
      throw new Error("Tên phải có ít nhất 2 ký tự");
    }
    this._ten = tenMoi;
  }
  
  get tuoi() {
    return this._tuoi;
  }
  
  set tuoi(tuoiMoi) {
    if (tuoiMoi < 0 || tuoiMoi > 150) {
      throw new Error("Tuổi không hợp lệ");
    }
    this._tuoi = tuoiMoi;
  }
}

const nguoi = new NguoiDung("Minh Long", 22);
console.log(nguoi.ten); // "Minh Long"
nguoi.ten = "Nguyễn Minh Long";
console.log(nguoi.ten); // "Nguyễn Minh Long"
```

### Static Methods (Phương thức tĩnh)

```javascript
class MathUtils {
  // Static method - gọi trực tiếp từ class, không cần instance
  static cong(a, b) {
    return a + b;
  }
  
  static tinhBinhPhuong(x) {
    return x * x;
  }
}

// Gọi static method
console.log(MathUtils.cong(5, 3)); // 8
console.log(MathUtils.tinhBinhPhuong(4)); // 16

// Không thể gọi từ instance
const math = new MathUtils();
// math.cong(5, 3); // ❌ Lỗi: math.cong is not a function
```

### Inheritance (Kế thừa)

```javascript
// Class cha
class DongVat {
  constructor(ten) {
    this.ten = ten;
  }
  
  keu() {
    return "Một số tiếng kêu";
  }
  
  gioiThieu() {
    return `Tôi là ${this.ten}`;
  }
}

// Class con - kế thừa từ DongVat
class Cho extends DongVat {
  constructor(ten, giong) {
    super(ten); // Gọi constructor của class cha
    this.giong = giong;
  }
  
  // Override method
  keu() {
    return "Gâu gâu!";
  }
  
  // Method mới
  sua() {
    return `${this.ten} đang sủa: ${this.keu()}`;
  }
}

const cho = new Cho("Lucky", "Golden Retriever");
console.log(cho.gioiThieu()); // "Tôi là Lucky"
console.log(cho.keu()); // "Gâu gâu!"
console.log(cho.sua()); // "Lucky đang sủa: Gâu gâu!"
```

### Private Fields (ES2022+)

```javascript
class BankAccount {
  // Private field (bắt đầu bằng #)
  #balance = 0;
  
  constructor(soTaiKhoan) {
    this.soTaiKhoan = soTaiKhoan;
  }
  
  napTien(soTien) {
    if (soTien > 0) {
      this.#balance += soTien;
      return `Đã nạp ${soTien}. Số dư: ${this.#balance}`;
    }
    return "Số tiền không hợp lệ";
  }
  
  rutTien(soTien) {
    if (soTien > 0 && soTien <= this.#balance) {
      this.#balance -= soTien;
      return `Đã rút ${soTien}. Số dư: ${this.#balance}`;
    }
    return "Số tiền không hợp lệ hoặc không đủ";
  }
  
  kiemTraSoDu() {
    return this.#balance;
  }
}

const taiKhoan = new BankAccount("123456");
taiKhoan.napTien(1000);
console.log(taiKhoan.kiemTraSoDu()); // 1000
// console.log(taiKhoan.#balance); // ❌ Lỗi: Private field không thể truy cập từ bên ngoài
```

![JavaScript Classes](/images/posts/javascript/javascript-classes.jpg)

*Classes - Lập trình hướng đối tượng trong JavaScript*

## Template Literals

**Template Literals** cho phép nhúng biểu thức và xuống dòng trong chuỗi.

### Cú pháp cơ bản

```javascript
// Cách cũ
const ten = "Minh Long";
const tuoi = 22;
const cauChao = "Xin chào, tôi là " + ten + ", " + tuoi + " tuổi.";

// Template Literals (ES6+)
const cauChaoMoi = `Xin chào, tôi là ${ten}, ${tuoi} tuổi.`;

console.log(cauChaoMoi); // "Xin chào, tôi là Minh Long, 22 tuổi."
```

### Multi-line Strings (Chuỗi nhiều dòng)

```javascript
// Cách cũ
const thongBao = "Dòng 1\n" +
                 "Dòng 2\n" +
                 "Dòng 3";

// Template Literals
const thongBaoMoi = `
Dòng 1
Dòng 2
Dòng 3
`;

console.log(thongBaoMoi);
// Dòng 1
// Dòng 2
// Dòng 3
```

### Biểu thức trong Template Literals

```javascript
const a = 10;
const b = 5;

console.log(`${a} + ${b} = ${a + b}`); // "10 + 5 = 15"
console.log(`${a} * ${b} = ${a * b}`); // "10 * 5 = 50"

// Gọi hàm
function tinhTong(x, y) {
  return x + y;
}

console.log(`Tổng: ${tinhTong(10, 20)}`); // "Tổng: 30"

// Điều kiện
const diem = 8.5;
console.log(`Điểm: ${diem >= 8 ? "Xuất sắc" : "Khá"}`); // "Điểm: Xuất sắc"
```

### Tagged Template Literals

```javascript
// Tagged template - xử lý template literal bằng hàm
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] ? `<strong>${values[i]}</strong>` : '';
    return result + str + value;
  }, '');
}

const ten = "Minh Long";
const tuoi = 22;
const html = highlight`Xin chào, tôi là ${ten}, ${tuoi} tuổi.`;
console.log(html);
// "Xin chào, tôi là <strong>Minh Long</strong>, <strong>22</strong> tuổi."
```

## Optional Chaining (?.)

**Optional Chaining** cho phép truy cập thuộc tính an toàn, tránh lỗi khi object là `null` hoặc `undefined`.

### Cú pháp cơ bản

```javascript
const user = {
  name: "Minh Long",
  address: {
    city: "Hồ Chí Minh",
    district: "Quận 7"
  }
};

// Cách cũ - phải kiểm tra từng cấp
if (user && user.address && user.address.city) {
  console.log(user.address.city);
}

// Optional Chaining (ES2020+)
console.log(user?.address?.city); // "Hồ Chí Minh"
console.log(user?.address?.street); // undefined (không lỗi)

// Với object không tồn tại
const user2 = null;
console.log(user2?.address?.city); // undefined (không lỗi)
```

### Với Arrays

```javascript
const users = [
  { name: "Minh Long", hobbies: ["Đọc sách", "Lập trình"] }
];

// Truy cập phần tử mảng an toàn
console.log(users?.[0]?.name); // "Minh Long"
console.log(users?.[0]?.hobbies?.[0]); // "Đọc sách"
console.log(users?.[10]?.name); // undefined (không lỗi)
```

### Với Functions

```javascript
const user = {
  name: "Minh Long",
  greet: function() {
    return `Xin chào, tôi là ${this.name}`;
  }
};

// Gọi method an toàn
console.log(user?.greet?.()); // "Xin chào, tôi là Minh Long"

const user2 = null;
console.log(user2?.greet?.()); // undefined (không lỗi)
```

### Nullish Coalescing (??)

```javascript
// Nullish Coalescing - trả về giá trị bên phải nếu bên trái là null hoặc undefined
const user = {
  name: "Minh Long",
  age: null
};

// || trả về giá trị mặc định nếu falsy (0, '', false, null, undefined)
console.log(user.age || 0); // 0 (vì null là falsy)

// ?? chỉ trả về giá trị mặc định nếu null hoặc undefined
console.log(user.age ?? 0); // 0
console.log(user.name ?? "Khách"); // "Minh Long" (không phải null/undefined)

// Kết hợp với Optional Chaining
console.log(user?.address?.city ?? "Chưa có địa chỉ"); // "Chưa có địa chỉ"
```

## Destructuring (Nâng cao)

### Destructuring với Default Values

```javascript
// Arrays
const [a = 1, b = 2, c = 3] = [10];
console.log(a, b, c); // 10, 2, 3

// Objects
const { ten = "Khách", tuoi = 0 } = { ten: "Minh Long" };
console.log(ten, tuoi); // "Minh Long", 0
```

### Nested Destructuring

```javascript
const user = {
  name: "Minh Long",
  address: {
    city: "Hồ Chí Minh",
    district: "Quận 7"
  },
  hobbies: ["Đọc sách", "Lập trình"]
};

// Nested destructuring
const {
  name,
  address: { city, district },
  hobbies: [hobby1, hobby2]
} = user;

console.log(name); // "Minh Long"
console.log(city); // "Hồ Chí Minh"
console.log(hobby1); // "Đọc sách"
```

## Spread và Rest (Nâng cao)

### Spread với Objects

```javascript
const user1 = { name: "Minh Long", age: 22 };
const user2 = { ...user1, age: 23, city: "HCM" };

console.log(user2); // { name: "Minh Long", age: 23, city: "HCM" }

// Merge objects
const defaults = { theme: "dark", language: "vi" };
const user = { name: "Minh Long" };
const config = { ...defaults, ...user };
console.log(config); // { theme: "dark", language: "vi", name: "Minh Long" }
```

## Arrow Functions (Nhắc lại)

```javascript
// Arrow functions với destructuring
const users = [
  { name: "Minh Long", age: 22 },
  { name: "Văn A", age: 20 }
];

// Destructuring trong arrow function
const names = users.map(({ name }) => name);
console.log(names); // ["Minh Long", "Văn A"]

// Với default parameters
const greet = ({ name = "Khách", age = 0 } = {}) => {
  return `Xin chào, tôi là ${name}, ${age} tuổi`;
};

console.log(greet()); // "Xin chào, tôi là Khách, 0 tuổi"
console.log(greet({ name: "Minh Long" })); // "Xin chào, tôi là Minh Long, 0 tuổi"
```

## Ví dụ thực tế

### Ví dụ 1: Module quản lý sinh viên

```javascript
// Student.js
export class Student {
  constructor(ten, tuoi, monHoc) {
    this.ten = ten;
    this.tuoi = tuoi;
    this.monHoc = monHoc;
    this.diem = [];
  }
  
  themDiem(diem) {
    this.diem.push(diem);
  }
  
  tinhDiemTrungBinh() {
    if (this.diem.length === 0) return 0;
    const tong = this.diem.reduce((sum, d) => sum + d, 0);
    return tong / this.diem.length;
  }
  
  gioiThieu() {
    return `Tôi là ${this.ten}, ${this.tuoi} tuổi, học ${this.monHoc}`;
  }
}

// main.js
import { Student } from './Student.js';

const sv = new Student("Minh Long", 22, "Lập trình mạng");
sv.themDiem(8.5);
sv.themDiem(9.0);
sv.themDiem(7.5);

console.log(sv.gioiThieu());
console.log(`Điểm trung bình: ${sv.tinhDiemTrungBinh().toFixed(2)}`);
```

### Ví dụ 2: Xử lý dữ liệu API với Optional Chaining

```javascript
// Giả sử nhận dữ liệu từ API
const apiResponse = {
  status: "success",
  data: {
    users: [
      {
        name: "Minh Long",
        profile: {
          email: "long@example.com",
          social: {
            github: "KLBMinhLong"
          }
        }
      }
    ]
  }
};

// Truy cập an toàn với Optional Chaining
const github = apiResponse?.data?.users?.[0]?.profile?.social?.github;
console.log(github ?? "Chưa có GitHub"); // "KLBMinhLong"

// Nếu không có dữ liệu
const apiResponse2 = null;
const github2 = apiResponse2?.data?.users?.[0]?.profile?.social?.github;
console.log(github2 ?? "Chưa có GitHub"); // "Chưa có GitHub"
```

### Ví dụ 3: Template Literals cho HTML

```javascript
function taoCardSinhVien({ ten, tuoi, diem }) {
  return `
    <div class="card">
      <h3>${ten}</h3>
      <p>Tuổi: ${tuoi}</p>
      <p>Điểm: ${diem >= 8 ? '<span class="excellent">Xuất sắc</span>' : '<span class="good">Khá</span>'}</p>
    </div>
  `;
}

const sinhVien = {
  ten: "Minh Long",
  tuoi: 22,
  diem: 8.5
};

console.log(taoCardSinhVien(sinhVien));
```

### Ví dụ 4: Class với Inheritance

```javascript
// Base class
class Vehicle {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
  
  start() {
    return `${this.brand} ${this.model} đã khởi động`;
  }
  
  stop() {
    return `${this.brand} ${this.model} đã dừng`;
  }
}

// Derived class
class Car extends Vehicle {
  constructor(brand, model, doors) {
    super(brand, model);
    this.doors = doors;
  }
  
  honk() {
    return "Bíp bíp!";
  }
  
  getInfo() {
    return `${this.brand} ${this.model} - ${this.doors} cửa`;
  }
}

class Motorcycle extends Vehicle {
  constructor(brand, model) {
    super(brand, model);
  }
  
  wheelie() {
    return "Đang làm wheelie!";
  }
}

const car = new Car("Toyota", "Camry", 4);
console.log(car.start()); // "Toyota Camry đã khởi động"
console.log(car.honk()); // "Bíp bíp!"
console.log(car.getInfo()); // "Toyota Camry - 4 cửa"

const bike = new Motorcycle("Honda", "CBR");
console.log(bike.start()); // "Honda CBR đã khởi động"
console.log(bike.wheelie()); // "Đang làm wheelie!"
```

## Best Practices

### 1. Sử dụng Modules để tổ chức code

```javascript
// ✅ Tốt - Tách thành modules
// utils/math.js
export function cong(a, b) { return a + b; }

// utils/string.js
export function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

// main.js
import { cong } from './utils/math.js';
import { capitalize } from './utils/string.js';
```

### 2. Sử dụng Classes cho OOP

```javascript
// ✅ Tốt - Dùng class thay vì constructor function
class User {
  constructor(name) {
    this.name = name;
  }
}
```

### 3. Sử dụng Template Literals thay vì nối chuỗi

```javascript
// ❌ Không tốt
const message = "Xin chào, " + name + ", bạn " + age + " tuổi";

// ✅ Tốt
const message = `Xin chào, ${name}, bạn ${age} tuổi`;
```

### 4. Sử dụng Optional Chaining để tránh lỗi

```javascript
// ❌ Không tốt
if (user && user.address && user.address.city) {
  console.log(user.address.city);
}

// ✅ Tốt
console.log(user?.address?.city);
```

## Kết luận

Trong bài 6, bạn đã học được:

- ✅ **ES6 Modules**: Tổ chức code với import/export
- ✅ **Classes**: Lập trình hướng đối tượng với cú pháp rõ ràng
- ✅ **Template Literals**: Chuỗi với biểu thức nhúng và nhiều dòng
- ✅ **Optional Chaining**: Truy cập thuộc tính an toàn
- ✅ **Nullish Coalescing**: Giá trị mặc định chỉ cho null/undefined
- ✅ **Destructuring & Spread nâng cao**: Bóc tách và trải rộng dữ liệu

**Best Practices:**
- ✅ Sử dụng modules để tổ chức code
- ✅ Dùng classes cho OOP
- ✅ Template literals thay vì nối chuỗi
- ✅ Optional chaining để tránh lỗi
- ✅ Private fields để bảo vệ dữ liệu

**Lưu ý quan trọng:**
- Modules cần server hoặc bundler (không chạy trực tiếp trong browser)
- Classes chỉ là syntax sugar, vẫn dựa trên prototype
- Optional chaining chỉ có từ ES2020
- Private fields (#) chỉ có từ ES2022

Với kiến thức về ES6+ Features, bạn đã có đủ công cụ để viết code JavaScript hiện đại, dễ đọc và bảo trì!

