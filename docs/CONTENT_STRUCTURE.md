# Tài Liệu Cấu Trúc Nội Dung

## 1. Tổng Quan Nội Dung

### 1.1. Mục Tiêu
- Tối thiểu **9 bài viết** về Java & JavaScript
- Nội dung dựa trên các khóa học đã hoàn thành:
  - JavaScript Essentials 1
  - JavaScript Essentials 2
  - Networking Basics
  - I2CS (nếu có)
- Tất cả bài viết bằng **tiếng Việt**
- Chủ đề chính: **Lập trình mạng (Network Programming)**

### 1.2. Đối Tượng Đọc
- Sinh viên IT
- Developers mới bắt đầu
- Người quan tâm đến Network Programming

---

## 2. Cấu Trúc Trang

### 2.1. Trang Home (`content/_index.md`)

**Nội dung:**
- Hero section:
  - Tên: "Nguyễn Minh Long"
  - Vị trí: "Sinh viên năm 4 HUTECH"
  - Tagline: "Chia sẻ kiến thức về Lập trình mạng, Java & JavaScript"
- Section "Về tôi" (ngắn gọn)
- Section "Bài viết mới nhất" (3-5 bài gần nhất)
- Section "Chứng chỉ" (nếu có ảnh)

**Front Matter:**
```yaml
---
title: "Home"
date: 2025-01-XX
type: "page"
---
```

### 2.2. Trang About (`content/about.md`)

**Nội dung:**
- Giới thiệu bản thân
- Học vấn: HUTECH, năm 4
- Sở thích/Đam mê: Lập trình mạng, Java, JavaScript
- Kỹ năng:
  - Java
  - JavaScript
  - Network Programming
  - (có thể thêm HTML, CSS, Git, etc.)
- Chứng chỉ:
  - JavaScript Essentials 1
  - JavaScript Essentials 2
  - Networking Basics
  - (có thể thêm ảnh chứng chỉ sau)
- Liên hệ:
  - GitHub: @KLBMinhLong
  - Email: (nếu muốn công khai)

**Front Matter:**
```yaml
---
title: "About"
date: 2025-01-XX
type: "page"
---
```

### 2.3. Trang Blog Listing (`content/posts/_index.md`)

**Nội dung:**
- Tiêu đề: "Blog"
- Mô tả ngắn: "Các bài viết về Lập trình mạng, Java & JavaScript"
- Tự động hiển thị danh sách bài viết từ thư mục `posts/`

**Front Matter:**
```yaml
---
title: "Blog"
date: 2025-01-XX
type: "posts"
---
```

---

## 3. Cấu Trúc Bài Viết

### 3.1. Front Matter Template

```yaml
---
title: "Tiêu đề bài viết"
date: 2025-01-XX
lastmod: 2025-01-XX
draft: false
author: "Nguyễn Minh Long"
description: "Mô tả ngắn gọn về bài viết (150-160 ký tự cho SEO)"
tags:
  - Java
  - JavaScript
  - Networking
categories:
  - "Lập trình mạng"
  - "JavaScript"
featuredImage: "/images/posts/ten-anh.jpg"
featuredImagePreview: "/images/posts/ten-anh-preview.jpg"
toc: true
math: false
code: true
---
```

### 3.2. Cấu Trúc Nội Dung Bài Viết

**Template chuẩn:**
```markdown
# Tiêu đề bài viết

## Giới thiệu
- Vấn đề/Chủ đề bài viết
- Mục tiêu bài viết

## Nội dung chính
### Phần 1: ...
### Phần 2: ...
### Phần 3: ...

## Ví dụ thực tế
- Code examples
- Screenshots (nếu có)

## Kết luận
- Tóm tắt
- Bài học rút ra
- Tài liệu tham khảo

---
**Tác giả:** Nguyễn Minh Long  
**Ngày đăng:** DD/MM/YYYY
```

---

## 4. Danh Sách Bài Viết Đề Xuất (9+ bài)

### 4.1. JavaScript Essentials Series

#### Bài 1: "Giới thiệu về JavaScript và Môi trường Chạy"
- **Tags:** JavaScript, Basics
- **Nội dung:**
  - JavaScript là gì?
  - V8 Engine, Node.js
  - Browser vs Node.js
  - Cài đặt môi trường

#### Bài 2: "Biến, Kiểu Dữ Liệu và Toán Tử trong JavaScript"
- **Tags:** JavaScript, Fundamentals
- **Nội dung:**
  - `var`, `let`, `const`
  - Primitive types
  - Type coercion
  - Operators

#### Bài 3: "Functions và Scope trong JavaScript"
- **Tags:** JavaScript, Functions
- **Nội dung:**
  - Function declarations vs expressions
  - Arrow functions
  - Scope và hoisting
  - Closures

#### Bài 4: "Objects và Arrays trong JavaScript"
- **Tags:** JavaScript, Data Structures
- **Nội dung:**
  - Object literals
  - Array methods (map, filter, reduce)
  - Destructuring
  - Spread operator

#### Bài 5: "Asynchronous JavaScript: Promises và Async/Await"
- **Tags:** JavaScript, Async
- **Nội dung:**
  - Callbacks
  - Promises
  - Async/await
  - Error handling

#### Bài 6: "ES6+ Features: Modules, Classes và More"
- **Tags:** JavaScript, ES6
- **Nội dung:**
  - ES6 Modules (import/export)
  - Classes
  - Template literals
  - Optional chaining

### 4.2. Networking & Java Series

#### Bài 7: "Giới thiệu về Lập trình Mạng (Network Programming)"
- **Tags:** Networking, Java
- **Nội dung:**
  - Network Programming là gì?
  - TCP/IP model
  - Sockets
  - Client-Server architecture

#### Bài 8: "Lập trình Socket trong Java: TCP Server/Client"
- **Tags:** Java, Networking, Sockets
- **Nội dung:**
  - `java.net.Socket`
  - `java.net.ServerSocket`
  - Ví dụ: Echo server
  - Multi-threading cho server

#### Bài 9: "HTTP và RESTful API với Java"
- **Tags:** Java, Networking, HTTP, REST
- **Nội dung:**
  - HTTP protocol
  - REST principles
  - Java HTTP Client (Java 11+)
  - Ví dụ: Gọi API

#### Bài 10: "WebSocket trong JavaScript: Real-time Communication"
- **Tags:** JavaScript, Networking, WebSocket
- **Nội dung:**
  - WebSocket vs HTTP
  - WebSocket API
  - Ví dụ: Chat application
  - Socket.io (optional)

#### Bài 11: "Xử lý JSON trong Java và JavaScript"
- **Tags:** Java, JavaScript, JSON
- **Nội dung:**
  - JSON format
  - JSON trong JavaScript (native)
  - JSON trong Java (Jackson, Gson)
  - Ví dụ: Parse và stringify

#### Bài 12: "CORS và Các Vấn đề Bảo Mật trong Web Development"
- **Tags:** JavaScript, Networking, Security
- **Nội dung:**
  - CORS là gì?
  - Same-origin policy
  - Cách xử lý CORS
  - Best practices

---

## 5. Categories và Tags

### 5.1. Categories (Chủ đề chính)
- **Lập trình mạng** (Networking)
- **JavaScript**
- **Java**
- **Web Development**

### 5.2. Tags (Từ khóa chi tiết)
- `JavaScript`
- `Java`
- `Networking`
- `Sockets`
- `HTTP`
- `REST`
- `WebSocket`
- `Async`
- `ES6`
- `Basics`
- `Tutorial`

---

## 6. Metadata và SEO

### 6.1. Meta Tags (tự động qua Hugo)
- `title`: Tiêu đề bài viết
- `description`: Mô tả (150-160 ký tự)
- `keywords`: Tags
- `author`: Nguyễn Minh Long
- `og:title`, `og:description`, `og:image`: Open Graph
- `twitter:card`: Twitter Card

### 6.2. Structured Data (JSON-LD)
- Article schema
- Person schema (cho About page)
- Blog schema

---

## 7. Images và Assets

### 7.1. Cấu Trúc Thư Mục
```
static/
├── images/
│   ├── profile/
│   │   └── avatar.jpg
│   ├── certificates/
│   │   ├── javascript-essentials-1.jpg
│   │   ├── javascript-essentials-2.jpg
│   │   └── networking-basics.jpg
│   └── posts/
│       ├── post-1-featured.jpg
│       ├── post-1-preview.jpg
│       └── ...
└── favicon.ico
```

### 7.2. Image Guidelines
- **Format:** JPG (cho photos), PNG (cho graphics), WebP (tối ưu)
- **Size:** 
  - Featured image: `1200x630px` (Facebook/Twitter)
  - Preview: `800x450px`
  - Inline: Max width `800px`
- **Optimization:** Compress trước khi upload
- **Alt text:** Luôn có mô tả cho accessibility

---

## 8. Content Calendar (Đề xuất)

**Tuần 1-2:**
- Setup website
- Viết bài 1, 2, 3 (JavaScript basics)

**Tuần 3-4:**
- Viết bài 4, 5, 6 (JavaScript advanced)

**Tuần 5-6:**
- Viết bài 7, 8, 9 (Networking & Java)

**Tuần 7-8:**
- Viết bài 10, 11, 12 (nếu cần thêm)
- Review và chỉnh sửa
- Tối ưu SEO

---

## 9. Writing Guidelines

### 9.1. Tone và Style
- **Tone:** Thân thiện, dễ hiểu
- **Style:** Giải thích rõ ràng, có ví dụ
- **Độ dài:** 800-1500 từ/bài
- **Code examples:** Có comments tiếng Việt

### 9.2. Formatting
- Sử dụng headings để phân cấp
- Code blocks với syntax highlighting
- Lists cho các điểm quan trọng
- Blockquotes cho tips/notes
- Tables cho so sánh (nếu cần)

### 9.3. Code Examples
```javascript
// Ví dụ code JavaScript
function greet(name) {
  return `Xin chào, ${name}!`;
}

console.log(greet("Minh Long"));
```

```java
// Ví dụ code Java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Xin chào, Minh Long!");
    }
}
```

---

**Ngày tạo:** 2025-01-XX  
**Người tạo:** Nguyễn Minh Long  
**Phiên bản:** 1.0

