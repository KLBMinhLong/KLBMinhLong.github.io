---
title: "Functions và Scope trong JavaScript"
date: 2025-01-07
lastmod: 2025-01-07
draft: false
author: "Nguyễn Minh Long"
description: "Tìm hiểu về Functions (hàm) trong JavaScript: function declarations, expressions, arrow functions, scope, hoisting và closures - kiến thức cốt lõi cho mọi lập trình viên JavaScript."
tags:
  - JavaScript
  - Functions
  - Tutorial
categories:
  - "JavaScript"
featuredImage: "/images/posts/javascript/javascript-functions.jpg"
featuredImagePreview: "/images/posts/javascript/javascript-functions-preview.jpg"
toc: true
ShowToc: true
math: false
code: true
---
## Giới thiệu

Sau khi đã nắm vững biến, kiểu dữ liệu và toán tử, bài viết này sẽ giới thiệu về **Functions (Hàm)** - một trong những khái niệm quan trọng nhất trong JavaScript.

![JavaScript Functions](/images/posts/javascript/javascript-functions.jpg)

*Functions - Khối xây dựng cơ bản của mọi chương trình JavaScript*

Chúng ta sẽ tìm hiểu:

- Các cách khai báo hàm: function declarations, expressions
- Arrow functions (ES6+)
- Scope (phạm vi) và cách biến được truy cập
- Hoisting - cơ chế đặc biệt của JavaScript
- Closures - hàm có thể "nhớ" môi trường xung quanh

## Functions là gì?

**Function (Hàm)** là một khối code có thể tái sử dụng, thực hiện một tác vụ cụ thể. Hàm giúp:

- Tổ chức code tốt hơn
- Tránh lặp lại code (DRY - Don't Repeat Yourself)
- Dễ bảo trì và debug

### Cú pháp cơ bản

```javascript
// Hàm đơn giản
function chaoHoi() {
  console.log("Xin chào!");
}

// Gọi hàm
chaoHoi(); // "Xin chào!"
```

## Function Declarations vs Expressions

JavaScript có nhiều cách để tạo hàm, mỗi cách có đặc điểm riêng.

### Function Declaration (Khai báo hàm)

```javascript
// Function declaration
function tinhTong(a, b) {
  return a + b;
}

console.log(tinhTong(5, 3)); // 8

// Có thể gọi trước khi khai báo (hoisting)
console.log(tinhBinhPhuong(4)); // 16

function tinhBinhPhuong(x) {
  return x * x;
}
```

**Đặc điểm:**
- Có hoisting - có thể gọi trước khi khai báo
- Có tên hàm (named function)
- Tạo function scope

### Function Expression (Biểu thức hàm)

```javascript
// Function expression
const tinhHieu = function(a, b) {
  return a - b;
};

console.log(tinhHieu(10, 3)); // 7

// Không thể gọi trước khi khai báo
// console.log(tinhTich(2, 3)); // ❌ Lỗi: Cannot access before initialization

const tinhTich = function(x, y) {
  return x * y;
};
```

**Đặc điểm:**
- Không có hoisting (giống như biến `const`/`let`)
- Có thể là anonymous (không tên) hoặc named
- Linh hoạt hơn, có thể gán vào biến

### Named Function Expression

```javascript
// Named function expression
const tinhThuong = function chia(a, b) {
  if (b === 0) {
    return "Không thể chia cho 0";
  }
  return a / b;
};

console.log(tinhThuong(10, 2)); // 5
// console.log(chia(10, 2)); // ❌ Lỗi: chia is not defined (chỉ dùng được trong hàm)
```

## Arrow Functions (ES6+)

**Arrow functions** là cú pháp ngắn gọn hơn để viết hàm, được giới thiệu trong ES6.

### Cú pháp cơ bản

```javascript
// Cách cũ (function expression)
const chao1 = function(ten) {
  return `Xin chào, ${ten}!`;
};

// Arrow function (cách mới)
const chao2 = (ten) => {
  return `Xin chào, ${ten}!`;
};

// Arrow function ngắn gọn (khi chỉ có 1 câu lệnh return)
const chao3 = (ten) => `Xin chào, ${ten}!`;

console.log(chao3("Minh Long")); // "Xin chào, Minh Long!"
```

### Các trường hợp đặc biệt

```javascript
// 1 tham số - có thể bỏ dấu ngoặc
const binhPhuong = x => x * x;

// Không có tham số - phải có dấu ngoặc
const layThoiGian = () => new Date();

// Nhiều tham số - phải có dấu ngoặc
const tinhTong = (a, b, c) => a + b + c;

// Nhiều dòng - phải có dấu ngoặc nhọn và return
const tinhDiemTrungBinh = (diem1, diem2, diem3) => {
  const tong = diem1 + diem2 + diem3;
  return tong / 3;
};
```

### Arrow Functions vs Regular Functions

```javascript
const obj = {
  ten: "Minh Long",
  
  // Regular function - có this
  gioiThieu1: function() {
    return `Tôi là ${this.ten}`;
  },
  
  // Arrow function - không có this riêng
  gioiThieu2: () => {
    return `Tôi là ${this.ten}`; // this là undefined hoặc window
  }
};

console.log(obj.gioiThieu1()); // "Tôi là Minh Long"
console.log(obj.gioiThieu2()); // "Tôi là undefined"
```

**Khác biệt quan trọng:**
- Arrow functions **không có `this` riêng** - kế thừa `this` từ scope bên ngoài
- Arrow functions **không có `arguments` object**
- Arrow functions **không thể dùng làm constructor** (không có `new`)

## Scope (Phạm vi)

**Scope** xác định nơi biến có thể được truy cập trong code.

### Global Scope

```javascript
// Biến global - có thể truy cập ở mọi nơi
const tenGlobal = "Minh Long";

function ham1() {
  console.log(tenGlobal); // "Minh Long"
}

function ham2() {
  console.log(tenGlobal); // "Minh Long"
}

ham1();
ham2();
```

### Function Scope

```javascript
function hamTest() {
  // Biến function scope - chỉ truy cập được trong hàm này
  const bienTrongHam = "Chỉ trong hàm";
  console.log(bienTrongHam); // "Chỉ trong hàm"
}

// console.log(bienTrongHam); // ❌ Lỗi: bienTrongHam is not defined

hamTest();
```

### Block Scope (ES6+)

```javascript
if (true) {
  // Block scope với let/const
  let bienBlock = "Chỉ trong block";
  const hangSoBlock = 100;
  
  console.log(bienBlock); // "Chỉ trong block"
}

// console.log(bienBlock); // ❌ Lỗi: bienBlock is not defined

// var không có block scope
if (true) {
  var bienVar = "Có thể truy cập ngoài block";
}

console.log(bienVar); // "Có thể truy cập ngoài block" (với var)
```

### Scope Chain (Chuỗi phạm vi)

```javascript
const bienGlobal = "Global";

function hamNgoai() {
  const bienNgoai = "Ngoài";
  
  function hamTrong() {
    const bienTrong = "Trong";
    
    // Có thể truy cập tất cả biến ở scope bên ngoài
    console.log(bienTrong);  // "Trong"
    console.log(bienNgoai);  // "Ngoài"
    console.log(bienGlobal); // "Global"
  }
  
  hamTrong();
  // console.log(bienTrong); // ❌ Lỗi: không thể truy cập biến trong scope con
}

hamNgoai();
```

![JavaScript Scope](/images/posts/javascript/javascript-scope.jpg)

*Scope Chain - Cách JavaScript tìm kiếm biến*

## Hoisting

**Hoisting** là cơ chế JavaScript "đưa" khai báo lên đầu scope trước khi thực thi code.

### Hoisting với Function Declaration

```javascript
// Có thể gọi trước khi khai báo
console.log(tinhTong(5, 3)); // 8

function tinhTong(a, b) {
  return a + b;
}

// JavaScript "di chuyển" function declaration lên đầu:
// function tinhTong(a, b) { ... }
// console.log(tinhTong(5, 3));
```

### Hoisting với var

```javascript
console.log(x); // undefined (không lỗi!)
var x = 5;

// Tương đương với:
// var x; // Hoisted
// console.log(x); // undefined
// x = 5;
```

### Hoisting với let/const (Temporal Dead Zone)

```javascript
// console.log(y); // ❌ Lỗi: Cannot access 'y' before initialization
let y = 10;

// let/const có hoisting nhưng không thể truy cập trước khi khai báo
// (Temporal Dead Zone - TDZ)
```

### Hoisting với Function Expression

```javascript
// console.log(tinhHieu(10, 3)); // ❌ Lỗi: Cannot access before initialization

const tinhHieu = function(a, b) {
  return a - b;
};

// Function expression không có hoisting (giống let/const)
```

## Closures (Đóng gói)

**Closure** là khả năng của hàm "nhớ" và truy cập biến từ scope bên ngoài, ngay cả sau khi hàm bên ngoài đã kết thúc.

### Ví dụ cơ bản

```javascript
function hamNgoai() {
  const bienNgoai = "Tôi là biến ngoài";
  
  function hamTrong() {
    // Closure: hamTrong "nhớ" bienNgoai
    console.log(bienNgoai);
  }
  
  return hamTrong; // Trả về hàm, không gọi hàm
}

const hamDaTao = hamNgoai();
// hamNgoai đã kết thúc, nhưng hamDaTao vẫn nhớ bienNgoai
hamDaTao(); // "Tôi là biến ngoài"
```

### Ứng dụng thực tế: Tạo Counter

```javascript
function taoCounter() {
  let count = 0; // Biến private
  
  return {
    // Closure: các hàm này "nhớ" biến count
    tang: function() {
      count++;
      return count;
    },
    giam: function() {
      count--;
      return count;
    },
    layGiaTri: function() {
      return count;
    }
  };
}

const counter1 = taoCounter();
const counter2 = taoCounter(); // Mỗi counter có count riêng

console.log(counter1.tang()); // 1
console.log(counter1.tang()); // 2
console.log(counter2.tang()); // 1 (riêng biệt)
console.log(counter1.layGiaTri()); // 2
```

### Ứng dụng: Module Pattern

```javascript
const moduleSinhVien = (function() {
  // Biến private
  let danhSachSinhVien = [];
  
  // Trả về object với các method public
  return {
    themSinhVien: function(ten) {
      danhSachSinhVien.push(ten);
    },
    layDanhSach: function() {
      return [...danhSachSinhVien]; // Trả về bản sao
    },
    xoaSinhVien: function(ten) {
      danhSachSinhVien = danhSachSinhVien.filter(sv => sv !== ten);
    }
  };
})();

moduleSinhVien.themSinhVien("Minh Long");
moduleSinhVien.themSinhVien("Văn A");
console.log(moduleSinhVien.layDanhSach()); // ["Minh Long", "Văn A"]
// danhSachSinhVien không thể truy cập trực tiếp từ bên ngoài
```

### Lưu ý về Closures trong vòng lặp

```javascript
// Vấn đề với var
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // In ra 3, 3, 3 (không phải 0, 1, 2)
  }, 100);
}

// Giải pháp 1: Dùng let (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // In ra 0, 1, 2
  }, 100);
}

// Giải pháp 2: Dùng IIFE (Immediately Invoked Function Expression)
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // In ra 0, 1, 2
    }, 100);
  })(i);
}
```

## IIFE (Immediately Invoked Function Expression)

**IIFE** là hàm được gọi ngay sau khi khai báo.

```javascript
// Cú pháp IIFE
(function() {
  console.log("Hàm này chạy ngay!");
})();

// Với tham số
(function(ten) {
  console.log(`Xin chào, ${ten}!`);
})("Minh Long");

// Arrow function IIFE
(() => {
  console.log("Arrow function IIFE");
})();
```

**Ứng dụng:**
- Tạo scope riêng biệt
- Tránh ô nhiễm global scope
- Module pattern

## Default Parameters (Tham số mặc định)

```javascript
// ES5 - Cách cũ
function chao(ten) {
  ten = ten || "Khách"; // Giá trị mặc định
  return `Xin chào, ${ten}!`;
}

// ES6+ - Cách mới
function chaoMoi(ten = "Khách") {
  return `Xin chào, ${ten}!`;
}

console.log(chaoMoi()); // "Xin chào, Khách!"
console.log(chaoMoi("Minh Long")); // "Xin chào, Minh Long!"

// Nhiều tham số mặc định
function tinhDiem(diem1 = 0, diem2 = 0, diem3 = 0) {
  return (diem1 + diem2 + diem3) / 3;
}

console.log(tinhDiem(8, 9)); // 5.67 (diem3 = 0)
```

## Rest Parameters và Arguments

### Rest Parameters (ES6+)

```javascript
// Rest parameters - gom các tham số còn lại thành mảng
function tinhTong(...cacSo) {
  return cacSo.reduce((tong, so) => tong + so, 0);
}

console.log(tinhTong(1, 2, 3)); // 6
console.log(tinhTong(1, 2, 3, 4, 5)); // 15

// Rest phải là tham số cuối cùng
function gioiThieu(ten, ...monHoc) {
  console.log(`${ten} học các môn: ${monHoc.join(", ")}`);
}

gioiThieu("Minh Long", "Toán", "Lý", "Hóa");
// "Minh Long học các môn: Toán, Lý, Hóa"
```

### Arguments Object (Cách cũ)

```javascript
// arguments - object đặc biệt (chỉ có trong regular function)
function tinhTongCu() {
  let tong = 0;
  for (let i = 0; i < arguments.length; i++) {
    tong += arguments[i];
  }
  return tong;
}

console.log(tinhTongCu(1, 2, 3)); // 6

// Arrow function không có arguments
const tinhTongArrow = () => {
  // console.log(arguments); // ❌ Lỗi: arguments is not defined
};
```

## Ví dụ thực tế

### Ví dụ 1: Tạo hàm tính điểm trung bình

```javascript
function tinhDiemTrungBinh(...diem) {
  if (diem.length === 0) {
    return 0;
  }
  
  const tong = diem.reduce((sum, d) => sum + d, 0);
  return tong / diem.length;
}

console.log(tinhDiemTrungBinh(8, 9, 7.5)); // 8.17
console.log(tinhDiemTrungBinh(8, 9, 7.5, 8.5, 9)); // 8.4
```

### Ví dụ 2: Tạo hàm debounce (trì hoãn)

```javascript
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    // Closure: nhớ func và delay
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Sử dụng
const timKiem = debounce(function(query) {
  console.log(`Đang tìm kiếm: ${query}`);
}, 300);

// Chỉ gọi hàm sau 300ms kể từ lần gọi cuối
timKiem("JavaScript");
timKiem("JavaScript Functions");
// Chỉ in "Đang tìm kiếm: JavaScript Functions" một lần
```

### Ví dụ 3: Tạo hàm curry

```javascript
// Curry function - chuyển hàm nhiều tham số thành chuỗi hàm một tham số
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

// Hàm gốc
function cong(a, b, c) {
  return a + b + c;
}

// Curry hóa
const congCurry = curry(cong);

console.log(congCurry(1)(2)(3)); // 6
console.log(congCurry(1, 2)(3)); // 6
console.log(congCurry(1)(2, 3)); // 6
```

### Ví dụ 4: Tạo module quản lý sinh viên

```javascript
const QuanLySinhVien = (function() {
  // Dữ liệu private
  let danhSachSinhVien = [];
  let idCounter = 1;
  
  // API public
  return {
    themSinhVien: function(ten, tuoi) {
      const sinhVien = {
        id: idCounter++,
        ten: ten,
        tuoi: tuoi
      };
      danhSachSinhVien.push(sinhVien);
      return sinhVien;
    },
    
    timSinhVien: function(id) {
      return danhSachSinhVien.find(sv => sv.id === id);
    },
    
    layTatCa: function() {
      return [...danhSachSinhVien]; // Trả về bản sao
    },
    
    xoaSinhVien: function(id) {
      danhSachSinhVien = danhSachSinhVien.filter(sv => sv.id !== id);
    },
    
    demSoLuong: function() {
      return danhSachSinhVien.length;
    }
  };
})();

// Sử dụng
QuanLySinhVien.themSinhVien("Minh Long", 22);
QuanLySinhVien.themSinhVien("Văn A", 20);
console.log(QuanLySinhVien.layTatCa());
console.log(QuanLySinhVien.demSoLuong()); // 2
```

## Kết luận

Trong bài 3, bạn đã học được:

- ✅ **Function Declarations vs Expressions**: Các cách khai báo hàm và sự khác biệt
- ✅ **Arrow Functions**: Cú pháp ngắn gọn, nhưng khác biệt về `this`
- ✅ **Scope**: Global, function, block scope và scope chain
- ✅ **Hoisting**: Cơ chế đưa khai báo lên đầu scope
- ✅ **Closures**: Hàm "nhớ" biến từ scope bên ngoài
- ✅ **IIFE**: Hàm được gọi ngay
- ✅ **Default Parameters, Rest Parameters**: Tham số mặc định và gom tham số

**Best Practices:**
- ✅ Ưu tiên dùng `const` với function expressions
- ✅ Dùng arrow functions cho callbacks ngắn
- ✅ Dùng regular functions khi cần `this` riêng
- ✅ Hiểu rõ scope để tránh lỗi
- ✅ Sử dụng closures để tạo private variables

**Lưu ý quan trọng:**
- Arrow functions không có `this`, `arguments` riêng
- `var` có function scope, `let`/`const` có block scope
- Closures giúp tạo private variables và module pattern

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Objects và Arrays** - cấu trúc dữ liệu quan trọng nhất trong JavaScript.
