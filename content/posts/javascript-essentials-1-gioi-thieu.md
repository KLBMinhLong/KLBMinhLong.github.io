---
title: "Giới thiệu về JavaScript và Môi trường Chạy"
date: 2025-01-05
lastmod: 2025-01-05
draft: false
author: "Nguyễn Minh Long"
description: "Tổng quan về JavaScript, môi trường chạy (browser, Node.js) và cách chuẩn bị môi trường để bắt đầu học JavaScript Essentials 1."
tags:
  - JavaScript
  - Basics
  - Tutorial
categories:
  - "JavaScript"
featuredImage: "/images/posts/javascript/javascript-intro.jpg"
featuredImagePreview: "/images/posts/javascript/javascript-intro-preview.jpg"
toc: true
ShowToc: true
math: false
code: true
---

## Giới thiệu

Trong series **JavaScript Essentials 1**, mình sẽ ghi lại các kiến thức quan trọng nhất khi bắt đầu với JavaScript: cú pháp, kiểu dữ liệu, hàm, cách suy nghĩ thuật toán, v.v.

Bài viết đầu tiên tập trung vào:

- JavaScript là gì và dùng để làm gì
- Các môi trường chạy JavaScript (trình duyệt, Node.js)
- Cách chuẩn bị môi trường lập trình để học hiệu quả

## JavaScript là gì?

![JavaScript Logo](/images/posts/javascript/javascript-logo.png)

*Logo JavaScript - Ngôn ngữ lập trình phổ biến nhất thế giới*

JavaScript là **ngôn ngữ lập trình chạy chủ yếu trên trình duyệt web**, dùng để:

- Làm cho trang web **tương tác** (bấm nút, hiện popup, validate form, animation,…)
- Kết nối với **server/API** để lấy dữ liệu động
- Xử lý logic, tính toán, thao tác với DOM (cây HTML)

Điểm quan trọng:

- Là **ngôn ngữ thông dịch** (interpreted) – mã JS được engine (V8, SpiderMonkey,…) đọc và chạy trực tiếp, không cần compile như C/C++.
- Là **ngôn ngữ đa nền tảng** – chạy được trên hầu hết browser, và cả ngoài browser (qua Node.js).
- Có cộng đồng cực lớn, rất nhiều thư viện & framework (React, Vue, Angular,…).

## Môi trường chạy JavaScript

### 1. JavaScript trong trình duyệt (Browser)

![Browser JavaScript](/images/posts/javascript/browser-javascript.jpg)

*JavaScript chạy trong trình duyệt web*

Khi mở một trang web, trình duyệt sẽ:

1. Tải file HTML, CSS, JavaScript từ server.
2. Dùng engine JavaScript (ví dụ: **V8** trong Chrome/Edge, **SpiderMonkey** trong Firefox) để thực thi các file `.js`.
3. Cho phép JavaScript tương tác với:
   - **DOM** (Document Object Model): đọc/ghi nội dung HTML, thay đổi style,…
   - **Web APIs**: `fetch`, `localStorage`, `setTimeout`, `addEventListener`,…

Ví dụ đơn giản – hiển thị thông báo khi nhấn nút:

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>Demo JS trên trình duyệt</title>
  </head>
  <body>
    <button onclick="sayHello()">Nhấn vào em</button>

    <script>
      function sayHello() {
        alert("Xin chào từ JavaScript trên trình duyệt!");
      }
    </script>
  </body>
</html>
```

Chỉ cần mở file này trong trình duyệt là chạy được, không cần cài gì thêm.

### 2. JavaScript với Node.js

![Node.js Logo](/images/posts/javascript/nodejs-logo.png)

*Node.js - Chạy JavaScript trên server*

**Node.js** giúp chạy JavaScript **ngoài trình duyệt**, thường dùng cho:

- Backend (REST API, WebSocket server,…)
- CLI tools, script tự động hoá

Node.js cũng dùng engine **V8**, nhưng thay vì DOM/Web APIs, bạn có:

- **Module hệ thống**: `fs` (file), `http`, `path`,…
- Các package từ **npm**.

Ví dụ: file `hello.js` chạy bằng Node:

```javascript
// hello.js
console.log("Xin chào từ Node.js!");
```

Chạy trong terminal:

```bash
node hello.js
```

Kết quả: in ra dòng chữ trên console, không cần trình duyệt.

### 3. So sánh nhanh: Browser vs Node.js

|                      | Browser JavaScript                 | Node.js JavaScript                            |
|----------------------|------------------------------------|-----------------------------------------------|
| Môi trường           | Trình duyệt (Chrome, Firefox,…)   | Server / máy local (CLI)                      |
| API có sẵn           | DOM, `window`, `document`, `fetch`| File system, network, process, module system  |
| Ứng dụng thường gặp  | Frontend web, UI tương tác        | Backend, API, script, tools                   |
| Cách chạy            | Mở file HTML trong browser        | `node file.js` trong terminal                 |

Khi học **JavaScript Essentials 1**, phần lớn ví dụ sẽ thiên về **core language** (biến, kiểu dữ liệu, hàm, toán tử), nên bạn có thể dùng **cả browser console hoặc Node.js** đều được.

## Chuẩn bị môi trường học JavaScript

### Bước 1: Cài VS Code (hoặc editor bạn thích)

![VS Code](/images/posts/javascript/vscode.jpg)

*Visual Studio Code - Editor phổ biến cho JavaScript*

- Truy cập `https://code.visualstudio.com/`
- Cài đặt VS Code cho Windows
- Cài thêm extensions gợi ý:
  - **ESLint** (sau này dùng kiểm tra code)
  - **Prettier** (format code)

### Bước 2: Cài Node.js (khuyến nghị)

- Truy cập `https://nodejs.org/`
- Tải bản **LTS** và cài đặt
- Mở terminal, kiểm tra:

```bash
node -v
npm -v
```

Nếu hiện version là ok.

### Bước 3: Tạo folder project nhỏ

```bash
mkdir js-essentials-1
cd js-essentials-1
code .
```

Tạo file `index.html` để test trong browser và file `main.js` để test với Node.

## Cách chạy nhanh JavaScript khi học

### 1. Dùng Console trong trình duyệt

![Browser Console](/images/posts/javascript/browser-console.jpg)

*Developer Console trong trình duyệt - Công cụ mạnh mẽ để test JavaScript*

1. Mở bất kỳ trang web nào (hoặc file `index.html` của bạn).
2. Nhấn `F12` → tab **Console**.
3. Gõ thử:

```javascript
console.log("Xin chào JavaScript!");
1 + 2 * 3;
```

Phù hợp để test nhanh các đoạn code ngắn.

### 2. Dùng Node.js trong terminal

Chạy trực tiếp file:

```bash
node main.js
```

Hoặc mở REPL:

```bash
node
// rồi gõ JS trực tiếp
```

## Kết luận

Trong bài 1, bạn đã:

- Hiểu **JavaScript là gì** và vì sao nó quan trọng trong web hiện đại.
- Phân biệt được **JavaScript trên trình duyệt** và **JavaScript với Node.js**.
- Biết cách **chuẩn bị môi trường học**: VS Code, Node.js, browser console.

Trong các bài tiếp theo, chúng ta sẽ đi sâu vào:

- **Biến, kiểu dữ liệu và toán tử** (Bài 2)
- **Hàm và scope** (Bài 3)
- **Objects & Arrays** (Bài 4)  

Bạn có thể bắt đầu tạo folder project và thử chạy vài dòng `console.log` ngay bây giờ để “làm nóng tay” trước khi sang Bài 2.
