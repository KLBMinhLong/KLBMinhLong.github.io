# Tài Liệu Cấu Trúc Nội Dung

## 1. Tổng Quan Nội Dung

### 1.1. Mục Tiêu
- Tối thiểu **9 bài viết** về Java & JavaScript
- Nội dung dựa trên các khóa học đã hoàn thành:
  - JavaScript Essentials 1
  - JavaScript Essentials 2
  - Networking Basics
- Tất cả bài viết bằng **tiếng Việt**
- Chủ đề chính: **Lập trình mạng (Network Programming)**

### 1.2. Đối Tượng Đọc
- Sinh viên IT
- Developers mới bắt đầu
- Người quan tâm đến Network Programming

### 1.3. Yêu Cầu Bắt Buộc Cho Mỗi Bài Viết
- ✅ **Mục lục** với anchor links ở đầu bài
- ✅ **Table of Contents (TOC)** tự động (sidebar) - bật trong front matter
- ✅ **Ảnh minh họa** (ít nhất 2-3 ảnh/bài)
- ✅ **Featured image** cho social sharing
- ✅ **Code examples** với comment tiếng Việt
- ✅ **Alt text** cho tất cả ảnh

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
- Sở thích/Đam mê: Lập trình mạng, Java, JavaScript, Lập trình phần mền, web, C++, react
- Kỹ năng:
  - Java
  - JavaScript
  - Network Programming
  - C++
  - Git,github,gitlab
  - Docker
- Chứng chỉ:
  - JavaScript Essentials 1
  - JavaScript Essentials 2
  - Networking Basics
- Liên hệ:
  - GitHub: @KLBMinhLong
  - Email: nguyenminhlongcntt@gmail.com
  - Facebook: https://www.facebook.com/long.nguyen.601773/
  - Linkedin :www.linkedin.com/in/minh-long-nguyễn-09984a333
  - Zalo: 0377241808
  - Số điện thoại:0377241808

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
toc: true              # Bật Table of Contents tự động (sidebar)
ShowToc: true          # Hiển thị TOC
math: false
code: true
---
```

**Lưu ý quan trọng:**
- `toc: true` và `ShowToc: true`: Bật mục lục tự động (Hugo PaperMod sẽ tạo TOC sidebar)
- `featuredImage`: Ảnh đại diện cho bài viết (1200x630px cho social sharing)
- `featuredImagePreview`: Ảnh preview nhỏ hơn (800x450px)

### 3.2. Cấu Trúc Nội Dung Bài Viết

**Template chuẩn với Mục lục:**
```markdown
# Tiêu đề bài viết

## Mục lục

1. [Giới thiệu](#giới-thiệu)
2. [Nội dung chính](#nội-dung-chính)
   - [Phần 1: ...](#phần-1-)
   - [Phần 2: ...](#phần-2-)
3. [Ví dụ thực tế](#ví-dụ-thực-tế)
4. [Kết luận](#kết-luận)

---

## Giới thiệu

![Ảnh minh họa](/images/posts/ten-thu-muc/ten-anh.jpg)

*Caption cho ảnh - Mô tả ngắn gọn*

- Vấn đề/Chủ đề bài viết
- Mục tiêu bài viết

## Nội dung chính

### Phần 1: ...

![Ảnh minh họa phần 1](/images/posts/ten-thu-muc/anh-1.jpg)

*Mô tả ảnh*

Nội dung phần 1...

### Phần 2: ...

Nội dung phần 2...

## Ví dụ thực tế

- Code examples
- Screenshots (nếu có)

## Kết luận

- Tóm tắt
- Bài học rút ra
- Tài liệu tham khảo
```

**Quy tắc về Mục lục:**
- **Bắt buộc**: Mỗi bài viết phải có section "Mục lục" ở đầu với các anchor links
- Anchor links dùng format: `[Tên mục](#tên-mục-chuyển-thành-kebab-case)`
- Hugo sẽ tự động tạo TOC sidebar nếu `toc: true` và `ShowToc: true`
- Mục lục trong nội dung giúp người đọc dễ điều hướng

**Cách tạo anchor links:**
1. Lấy tiêu đề section (ví dụ: "JavaScript là gì?")
2. Chuyển thành lowercase và thay khoảng trắng bằng dấu gạch ngang
3. Bỏ dấu tiếng Việt (ă→a, â→a, đ→d, ê→e, ô→o, ơ→o, ư→u)
4. Ví dụ: "JavaScript là gì?" → `#javascript-la-gi`

**Ví dụ anchor links:**
- `## JavaScript là gì?` → `[JavaScript là gì?](#javascript-la-gi)`
- `### 1. JavaScript trong trình duyệt` → `[1. JavaScript trong trình duyệt](#1-javascript-trong-trinh-duyet)`
- `## Chuẩn bị môi trường học JavaScript` → `[Chuẩn bị môi trường học JavaScript](#chuẩn-bị-môi-trường-học-javascript)`

**Lưu ý:** Hugo tự động tạo anchor cho headings, nhưng có thể cần điều chỉnh cho tiếng Việt. Test trên local để đảm bảo links hoạt động đúng.

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
- **Hình ảnh minh họa:**
  - Sử dụng 3 hình minh họa Feyman để giải thích trực quan:
    - `static/images/posts/networking/UDPSocketFeyman.png` — Minh họa cơ chế gửi gói tin của UDP Socket
    - `static/images/posts/networking/TCPSocketFeyman.png` — Minh họa bắt tay 3 bước & độ tin cậy của TCP Socket
    - `static/images/posts/networking/SocketFeyman.png` — Minh họa khái niệm Socket = IP + Port (toà chung cư / căn hộ)
  - Trong front matter có thể đặt:
    - `featuredImage: "/images/posts/networking/TCPSocketFeyman.png"`
    - `featuredImagePreview: "/images/posts/networking/TCPSocketFeyman.png"`

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

### 4.3. Các Bài Viết Theo Sở Trường Khác

Dựa trên phần kỹ năng ở About (`Java`, `JavaScript`, `Network Programming`, `C++`, `Git/GitHub/GitLab`, `Docker`, `Web`, `React`), đề xuất thêm một số bài:

#### Bài 13: "Lập trình C++ Cơ Bản cho Sinh viên IT"
- **Tags:** C++, Basics, Programming
- **Nội dung:**
  - Cấu trúc chương trình C++
  - Biến, kiểu dữ liệu, toán tử
  - Điều kiện, vòng lặp
  - Hàm và chia nhỏ chương trình

#### Bài 14: "Quy trình làm việc với Git, GitHub và GitLab"
- **Tags:** Git, GitHub, GitLab, Workflow
- **Nội dung:**
  - Khái niệm repository, commit, branch
  - Git workflow cơ bản (feature branch, pull request/merge request)
  - Làm việc nhóm với GitHub/GitLab
  - Một số lệnh Git hay dùng

#### Bài 15: "Giới thiệu Docker cho Developer Backend/DevOps"
- **Tags:** Docker, DevOps, Container
- **Nội dung:**
  - Docker là gì, khác gì so với VM
  - Image, container, volume, network
  - Viết Dockerfile đơn giản cho ứng dụng Java/Node.js
  - Push image lên Docker Hub

#### Bài 16: "React cho Người đã Biết JavaScript"
- **Tags:** React, JavaScript, Frontend
- **Nội dung:**
  - Component, props, state
  - JSX & render UI
  - Event handling
  - Fetch API & hiển thị dữ liệu

#### Bài 17: "Xây dựng Ứng dụng Web Fullstack Nhỏ"
- **Tags:** Web Development, JavaScript, Networking
- **Nội dung:**
  - Thiết kế API (REST) đơn giản
  - Backend (Java hoặc Node.js) cung cấp API
  - Frontend (React hoặc HTML/JS thuần) gọi API
  - Triển khai local / demo

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
│   │   ├── GrayscaleVersion.png      # Ảnh chân dung trắng đen (dùng cho About/Hero)
│   │   └── BackgroundWhite.png      # Phiên bản background trắng
│   ├── certificates/
│   │   ├── NetworkingBasicsUpdate20251118-32-7k75aj.pdf
│   │   ├── JavaScriptEssentials1Update20251118-31-d62o4j.pdf
│   │   └── JavaScriptEssentials2Update20251121-32-bxp5cb.pdf
│   └── posts/
│       └── networking/
│           ├── UDPSocketFeyman.png
│           ├── TCPSocketFeyman.png
│           └── SocketFeyman.png
└── favicon.ico
```

> Lưu ý: Hiện tại các file ảnh/PDF đang nằm ở root của repository (`*.png`, `*.pdf`).  
> Khi triển khai thực tế, hãy **di chuyển thủ công** các file này vào đúng thư mục trong `static/` như cấu trúc trên.

### 7.2. Image Guidelines

**Format:**
- JPG (cho photos)
- PNG (cho graphics, logos)
- WebP (tối ưu nhất, nhưng cần hỗ trợ browser)

**Kích thước:**
- Featured image: `1200x630px` (Facebook/Twitter)
- Preview: `800x450px`
- Inline images: Max width `800px`, height tự động
- Logo/Icon: `240px` width hoặc nhỏ hơn

**Tối ưu hóa:**
- Compress trước khi upload (dùng TinyPNG, ImageOptim, hoặc Squoosh)
- Đặt tên file rõ ràng: `javascript-logo.png`, `browser-console.jpg`
- Alt text: Luôn có mô tả cho accessibility

**Cách thêm ảnh vào bài viết:**

1. **Lưu ảnh vào thư mục phù hợp:**
   ```
   static/images/posts/
   ├── javascript/
   │   ├── javascript-logo.png
   │   ├── browser-console.jpg
   │   └── nodejs-logo.png
   ├── networking/
   │   ├── socket-diagram.png
   │   └── tcp-handshake.jpg
   └── java/
       └── java-logo.png
   ```

2. **Sử dụng trong Markdown:**
   ```markdown
   ![Mô tả ảnh](/images/posts/javascript/javascript-logo.png)
   
   *Caption cho ảnh - Giải thích thêm về ảnh*
   ```

3. **Với HTML để tùy chỉnh kích thước:**
   ```html
   <img src="/images/posts/javascript/javascript-logo.png" 
        alt="JavaScript Logo" 
        style="max-width: 400px; height: auto; display: block; margin: 1rem auto;" />
   ```

4. **Tìm ảnh miễn phí:**
   - **Unsplash**: https://unsplash.com (ảnh chất lượng cao, free)
   - **Pexels**: https://pexels.com (ảnh free)
   - **Wikimedia Commons**: https://commons.wikimedia.org (logos, diagrams)
   - **Flaticon**: https://flaticon.com (icons, cần credit)

**Lưu ý:**
- Nên tải ảnh về local thay vì dùng URL bên ngoài (tránh broken links)
- Luôn có alt text và caption để dễ hiểu
- Kiểm tra kích thước file (nên < 500KB cho mỗi ảnh)

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

**Format chuẩn:**
- Luôn có comment tiếng Việt giải thích
- Syntax highlighting đúng ngôn ngữ
- Code blocks với 3 backticks và tên ngôn ngữ

**Ví dụ JavaScript:**
````markdown
```javascript
// Hàm chào hỏi
function greet(name) {
  return `Xin chào, ${name}!`;
}

// Sử dụng hàm
console.log(greet("Minh Long"));
```
````

**Ví dụ Java:**
````markdown
```java
// Class HelloWorld
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Xin chào, Minh Long!");
    }
}
```
````

### 9.4. Checklist Trước Khi Publish

**Mỗi bài viết cần có:**
- [ ] Mục lục với anchor links ở đầu bài
- [ ] `toc: true` và `ShowToc: true` trong front matter
- [ ] Featured image và preview image
- [ ] Ít nhất 2-3 ảnh minh họa trong nội dung
- [ ] Alt text cho tất cả ảnh
- [ ] Caption cho ảnh quan trọng
- [ ] Code examples có comment tiếng Việt
- [ ] Description trong front matter (150-160 ký tự)
- [ ] Tags và categories phù hợp
- [ ] Kiểm tra lỗi chính tả
- [ ] Test trên local server trước khi push

---

## 10. Quy Trình Viết Bài Viết

### 10.1. Bước 1: Chuẩn bị
1. Tạo file markdown: `hugo new posts/ten-bai-viet.md`
2. Tạo thư mục ảnh: `static/images/posts/ten-thu-muc/`
3. Tìm và tải ảnh minh họa (2-3 ảnh) từ:
   - Unsplash: https://unsplash.com
   - Pexels: https://pexels.com
   - Wikimedia Commons: https://commons.wikimedia.org
4. Tạo featured image (1200x630px) hoặc tìm ảnh phù hợp

### 10.2. Bước 2: Viết nội dung
1. Điền front matter đầy đủ (xem 3.1)
2. Viết mục lục với anchor links (xem 3.2)
3. Viết nội dung theo template
4. Thêm ảnh minh họa vào các phần quan trọng
5. Thêm code examples với comment tiếng Việt

### 10.3. Bước 3: Review
1. Kiểm tra checklist (xem 9.4)
2. Test trên local: `hugo server -D`
3. Kiểm tra TOC hiển thị đúng (sidebar bên phải)
4. Kiểm tra ảnh load đúng
5. Kiểm tra code examples format đúng
6. Kiểm tra anchor links trong mục lục hoạt động

### 10.4. Bước 4: Publish
1. Commit: `git add .`
2. Commit message: `feat: thêm bài viết [tên bài]`
3. Push: `git push origin main`
4. GitHub Actions tự động deploy
5. Kiểm tra trên production: `https://klbminhlong.github.io/posts/ten-bai-viet/`

---

## 11. Ví Dụ Bài Viết Hoàn Chỉnh

Xem file `content/posts/javascript-essentials-1-gioi-thieu.md` để tham khảo:
- Cấu trúc mục lục
- Cách thêm ảnh minh họa
- Format code examples
- Front matter đầy đủ

---

**Ngày tạo:** 2025-01-XX  
**Người tạo:** Nguyễn Minh Long  
**Phiên bản:** 2.0 (Cập nhật: Thêm mục lục, ảnh minh họa, checklist, quy trình viết bài)

