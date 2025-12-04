---
title: "HTTP và RESTful API với Java"
date: 2025-01-12
lastmod: 2025-01-12
draft: false
author: "Nguyễn Minh Long"
description: "Giới thiệu HTTP protocol, REST principles và cách sử dụng Java HTTP Client (Java 11+) để gọi RESTful API với ví dụ thực tế."
tags:
  - Java
  - Networking
  - HTTP
  - REST
categories:
  - "Lập trình mạng"
featuredImage: "/images/profile/BackgroundWhite.png"
featuredImagePreview: "/images/profile/BackgroundWhite.png"
toc: true
math: false
code: true
---

## Giới thiệu

Sau khi đã hiểu về **Socket** và **TCP** ở bài trước, bài này sẽ giúp bạn nắm vững **HTTP** - giao thức nền tảng của web hiện đại, và cách sử dụng **Java HTTP Client** để gọi **RESTful API**.

Nội dung bài viết:

- HTTP protocol là gì và cách hoạt động
- REST principles (RESTful API)
- Java HTTP Client (Java 11+) - cách sử dụng
- Ví dụ thực tế: Gọi API lấy dữ liệu JSON

---

## 1. HTTP Protocol là gì?

**HTTP (HyperText Transfer Protocol)** là giao thức truyền tải siêu văn bản, được sử dụng để giao tiếp giữa **client** (trình duyệt, ứng dụng) và **server** (web server).

### 1.1. Đặc điểm của HTTP

- **Stateless**: Mỗi request độc lập, server không lưu trạng thái của client
- **Request-Response**: Client gửi request → Server trả về response
- **Text-based**: Dữ liệu được truyền dưới dạng text (có thể là HTML, JSON, XML, v.v.)

### 1.2. Cấu trúc HTTP Request

Một HTTP request bao gồm:

```
GET /api/users HTTP/1.1
Host: api.example.com
User-Agent: Java/11
Accept: application/json
```

- **Request Line**: Method (GET, POST, PUT, DELETE) + Path + HTTP Version
- **Headers**: Thông tin bổ sung (Host, Content-Type, Authorization, v.v.)
- **Body**: Dữ liệu gửi kèm (cho POST, PUT)

### 1.3. Cấu trúc HTTP Response

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 123

{"id": 1, "name": "Nguyễn Minh Long"}
```

- **Status Line**: HTTP Version + Status Code (200, 404, 500, v.v.) + Status Message
- **Headers**: Thông tin về response (Content-Type, Content-Length, v.v.)
- **Body**: Dữ liệu trả về (HTML, JSON, XML, v.v.)

### 1.4. HTTP Methods phổ biến

| Method | Mô tả | Ví dụ |
|--------|-------|-------|
| **GET** | Lấy dữ liệu | `GET /api/users` - Lấy danh sách users |
| **POST** | Tạo mới | `POST /api/users` - Tạo user mới |
| **PUT** | Cập nhật toàn bộ | `PUT /api/users/1` - Cập nhật user id=1 |
| **PATCH** | Cập nhật một phần | `PATCH /api/users/1` - Cập nhật tên user |
| **DELETE** | Xóa | `DELETE /api/users/1` - Xóa user id=1 |

---

## 2. REST và RESTful API

### 2.1. REST là gì?

**REST (Representational State Transfer)** là một kiến trúc phần mềm để thiết kế web services. API tuân theo nguyên tắc REST được gọi là **RESTful API**.

### 2.2. REST Principles

1. **Stateless**: Mỗi request chứa đầy đủ thông tin cần thiết
2. **Client-Server**: Tách biệt client và server
3. **Uniform Interface**: Sử dụng HTTP methods chuẩn (GET, POST, PUT, DELETE)
4. **Resource-based**: Mọi thứ đều là **resource** (users, posts, comments, v.v.)
5. **Representation**: Resource được biểu diễn dưới dạng JSON, XML, HTML

### 2.3. RESTful API Design

**URL Pattern:**
```
GET    /api/users          → Lấy danh sách users
GET    /api/users/1        → Lấy user có id=1
POST   /api/users          → Tạo user mới
PUT    /api/users/1        → Cập nhật user id=1
DELETE /api/users/1        → Xóa user id=1
```

**Response Format (thường dùng JSON):**
```json
{
  "id": 1,
  "name": "Nguyễn Minh Long",
  "email": "nguyenminhlongcntt@gmail.com"
}
```

---

## 3. Java HTTP Client (Java 11+)

Từ **Java 11**, Java cung cấp `java.net.http.HttpClient` - API hiện đại, dễ sử dụng hơn so với `HttpURLConnection` cũ.

### 3.1. Tạo HttpClient

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.time.Duration;

// Tạo HttpClient instance
HttpClient client = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(10))
    .build();
```

### 3.2. GET Request - Lấy dữ liệu

```java
// Tạo request
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.github.com/users/KLBMinhLong"))
    .GET()
    .header("Accept", "application/json")
    .build();

// Gửi request và nhận response
HttpResponse<String> response = client.send(
    request, 
    HttpResponse.BodyHandlers.ofString()
);

// Kiểm tra status code
if (response.statusCode() == 200) {
    String jsonBody = response.body();
    System.out.println("Response: " + jsonBody);
} else {
    System.out.println("Error: " + response.statusCode());
}
```

### 3.3. POST Request - Gửi dữ liệu

```java
// Dữ liệu JSON cần gửi
String jsonData = """
    {
        "name": "Nguyễn Minh Long",
        "email": "nguyenminhlongcntt@gmail.com"
    }
    """;

// Tạo POST request
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .POST(HttpRequest.BodyPublishers.ofString(jsonData))
    .header("Content-Type", "application/json")
    .header("Accept", "application/json")
    .build();

// Gửi request
HttpResponse<String> response = client.send(
    request,
    HttpResponse.BodyHandlers.ofString()
);

System.out.println("Status: " + response.statusCode());
System.out.println("Response: " + response.body());
```

### 3.4. Async Request (Non-blocking)

```java
// Gửi request bất đồng bộ (không chặn thread)
client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
    .thenApply(HttpResponse::body)
    .thenAccept(System.out::println)
    .join(); // Đợi kết quả
```

---

## 4. Ví dụ thực tế: Gọi GitHub API

Ví dụ đầy đủ: Lấy thông tin user từ GitHub API và parse JSON.

### 4.1. Dependencies

Nếu muốn parse JSON dễ dàng, có thể dùng thư viện như **Jackson** hoặc **Gson**:

```xml
<!-- pom.xml (Maven) -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.15.2</version>
</dependency>
```

Hoặc dùng **Gson**:

```xml
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.10.1</version>
</dependency>
```

### 4.2. Ví dụ với Jackson

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class GitHubApiExample {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        
        // Tạo request
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.github.com/users/KLBMinhLong"))
            .GET()
            .header("Accept", "application/json")
            .build();
        
        // Gửi request
        HttpResponse<String> response = client.send(
            request,
            HttpResponse.BodyHandlers.ofString()
        );
        
        if (response.statusCode() == 200) {
            // Parse JSON
            ObjectMapper mapper = new ObjectMapper();
            GitHubUser user = mapper.readValue(
                response.body(), 
                GitHubUser.class
            );
            
            System.out.println("Username: " + user.getLogin());
            System.out.println("Name: " + user.getName());
            System.out.println("Bio: " + user.getBio());
            System.out.println("Public Repos: " + user.getPublicRepos());
        } else {
            System.out.println("Error: " + response.statusCode());
        }
    }
}

// Class để map JSON response
class GitHubUser {
    private String login;
    private String name;
    private String bio;
    private int public_repos;
    
    // Getters và Setters
    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    
    public int getPublicRepos() { return public_repos; }
    public void setPublicRepos(int public_repos) { 
        this.public_repos = public_repos; 
    }
}
```

### 4.3. Ví dụ với Gson (đơn giản hơn)

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;

// Parse JSON thành JsonObject
Gson gson = new Gson();
JsonObject jsonObject = gson.fromJson(response.body(), JsonObject.class);

String login = jsonObject.get("login").getAsString();
String name = jsonObject.get("name").getAsString();
int repos = jsonObject.get("public_repos").getAsInt();

System.out.println("User: " + login);
System.out.println("Name: " + name);
System.out.println("Repos: " + repos);
```

---

## 5. Xử lý lỗi và Best Practices

### 5.1. Xử lý lỗi HTTP

```java
HttpResponse<String> response = client.send(request, 
    HttpResponse.BodyHandlers.ofString());

int statusCode = response.statusCode();

if (statusCode >= 200 && statusCode < 300) {
    // Success
    System.out.println("Success: " + response.body());
} else if (statusCode == 404) {
    System.out.println("Resource not found");
} else if (statusCode == 401) {
    System.out.println("Unauthorized - Check your credentials");
} else if (statusCode >= 500) {
    System.out.println("Server error");
} else {
    System.out.println("Error: " + statusCode);
}
```

### 5.2. Timeout và Retry

```java
HttpClient client = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(10))
    .build();

// Retry logic (có thể wrap trong method)
int maxRetries = 3;
for (int i = 0; i < maxRetries; i++) {
    try {
        HttpResponse<String> response = client.send(request,
            HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() == 200) {
            return response.body();
        }
    } catch (Exception e) {
        if (i == maxRetries - 1) throw e;
        Thread.sleep(1000); // Đợi 1 giây trước khi retry
    }
}
```

### 5.3. Best Practices

1. **Luôn kiểm tra status code** trước khi parse response
2. **Sử dụng timeout** để tránh chờ đợi vô hạn
3. **Xử lý exception** (IOException, InterruptedException)
4. **Reuse HttpClient** - tạo một instance và dùng lại
5. **Dùng async** cho nhiều request đồng thời
6. **Parse JSON an toàn** - kiểm tra null, validate data

---

## 6. So sánh với Socket (Bài 8)

| Đặc điểm | Socket (TCP) | HTTP |
|----------|--------------|------|
| **Protocol** | TCP (Transport) | HTTP (Application) |
| **Connection** | Persistent | Stateless (mỗi request độc lập) |
| **Data Format** | Raw bytes | Text-based (JSON, XML, HTML) |
| **Use Case** | Real-time, chat, game | Web API, RESTful services |
| **Complexity** | Phức tạp hơn | Đơn giản hơn (high-level) |

**HTTP được xây dựng trên TCP** - khi bạn gọi HTTP API, thực chất là:
1. Tạo TCP connection đến server
2. Gửi HTTP request qua TCP
3. Nhận HTTP response qua TCP
4. Đóng connection (hoặc giữ lại cho keep-alive)

---

## 7. Kết luận

Trong bài này, bạn đã học:

- ✅ **HTTP protocol**: Request-Response, Methods, Status Codes
- ✅ **REST principles**: Resource-based, Stateless, Uniform Interface
- ✅ **Java HTTP Client**: Cách tạo request, gửi GET/POST, xử lý response
- ✅ **Parse JSON**: Sử dụng Jackson hoặc Gson
- ✅ **Best practices**: Error handling, timeout, retry

**Bài tiếp theo** sẽ giới thiệu **WebSocket** - giao thức cho real-time communication, khác với HTTP request-response truyền thống.

---

## Tài liệu tham khảo

- [Java HTTP Client Documentation](https://docs.oracle.com/en/java/javase/11/docs/api/java.net.http/java/net/http/HttpClient.html)
- [REST API Tutorial](https://restfulapi.net/)
- [HTTP Methods - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [Jackson JSON Library](https://github.com/FasterXML/jackson)
- [Gson Library](https://github.com/google/gson)

---

**Tác giả:** Nguyễn Minh Long  
**Ngày đăng:** 12/01/2025
