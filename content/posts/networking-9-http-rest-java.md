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
featuredImage: "/images/posts/networking/http-rest-api.jpg"
featuredImagePreview: "/images/posts/networking/http-rest-api-preview.jpg"
toc: true
ShowToc: true
math: false
code: true
---

# HTTP và RESTful API với Java

## Giới thiệu

Sau khi đã hiểu về **Socket** và **TCP** ở bài trước, bài này sẽ giúp bạn nắm vững **HTTP** - giao thức nền tảng của web hiện đại, và cách sử dụng **Java HTTP Client** để gọi **RESTful API**.

![HTTP và RESTful API](/images/posts/networking/http-rest-api.jpg)

*HTTP và RESTful API - Giao thức nền tảng của web hiện đại*

Nội dung bài viết:

- HTTP protocol là gì và cách hoạt động
- REST principles (RESTful API)
- Java HTTP Client (Java 11+) - cách sử dụng
- Ví dụ thực tế: Gọi API lấy dữ liệu JSON

## HTTP Protocol là gì?

**HTTP (HyperText Transfer Protocol)** là giao thức truyền tải siêu văn bản, được sử dụng để giao tiếp giữa **client** (trình duyệt, ứng dụng) và **server** (web server).

![HTTP Protocol](/images/posts/networking/http-protocol.jpg)

*HTTP Protocol - Giao thức truyền tải dữ liệu trên web*

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

## REST và RESTful API

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

![RESTful API](/images/posts/networking/restful-api.jpg)

*RESTful API - Kiến trúc API phổ biến nhất*

## Java HTTP Client (Java 11+)

Từ **Java 11**, Java cung cấp `java.net.http.HttpClient` - API hiện đại, dễ sử dụng hơn so với `HttpURLConnection` cũ.

### 3.1. Tạo HttpClient

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.time.Duration;
import java.util.List;
import java.util.concurrent.CompletableFuture;

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

### 3.4. PUT Request - Cập nhật dữ liệu

```java
// Dữ liệu JSON cần cập nhật
String jsonData = """
    {
        "name": "Nguyễn Minh Long",
        "email": "newemail@example.com"
    }
    """;

// Tạo PUT request
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users/1"))
    .PUT(HttpRequest.BodyPublishers.ofString(jsonData))
    .header("Content-Type", "application/json")
    .header("Accept", "application/json")
    .build();

HttpResponse<String> response = client.send(
    request,
    HttpResponse.BodyHandlers.ofString()
);

System.out.println("Status: " + response.statusCode());
System.out.println("Response: " + response.body());
```

### 3.5. DELETE Request - Xóa dữ liệu

```java
// Tạo DELETE request
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users/1"))
    .DELETE()
    .header("Accept", "application/json")
    .build();

HttpResponse<String> response = client.send(
    request,
    HttpResponse.BodyHandlers.ofString()
);

if (response.statusCode() == 200 || response.statusCode() == 204) {
    System.out.println("Xóa thành công!");
} else {
    System.out.println("Lỗi: " + response.statusCode());
}
```

### 3.6. Async Request (Non-blocking)

```java
import java.util.concurrent.CompletableFuture;

// Gửi request bất đồng bộ (không chặn thread)
CompletableFuture<HttpResponse<String>> future = client.sendAsync(
    request, 
    HttpResponse.BodyHandlers.ofString()
);

future.thenApply(HttpResponse::body)
    .thenAccept(body -> {
        System.out.println("Response: " + body);
    })
    .exceptionally(e -> {
        System.err.println("Error: " + e.getMessage());
        return null;
    });

// Đợi kết quả (nếu cần)
future.join();
```

### 3.7. Gửi nhiều request đồng thời

```java
import java.util.List;
import java.util.concurrent.CompletableFuture;

List<HttpRequest> requests = List.of(
    HttpRequest.newBuilder()
        .uri(URI.create("https://api.example.com/users/1"))
        .GET()
        .build(),
    HttpRequest.newBuilder()
        .uri(URI.create("https://api.example.com/users/2"))
        .GET()
        .build(),
    HttpRequest.newBuilder()
        .uri(URI.create("https://api.example.com/users/3"))
        .GET()
        .build()
);

// Gửi tất cả request đồng thời
List<CompletableFuture<HttpResponse<String>>> futures = requests.stream()
    .map(request -> client.sendAsync(
        request, 
        HttpResponse.BodyHandlers.ofString()
    ))
    .toList();

// Đợi tất cả hoàn thành
CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
    .thenRun(() -> {
        futures.forEach(future -> {
            try {
                HttpResponse<String> response = future.get();
                System.out.println("Response: " + response.body());
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    })
    .join();
```

## Ví dụ thực tế: Gọi GitHub API

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

### 4.4. Ví dụ: Tạo User mới (POST)

```java
public class CreateUserExample {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        
        // Dữ liệu user mới
        String jsonData = """
            {
                "name": "Nguyễn Minh Long",
                "email": "nguyenminhlongcntt@gmail.com",
                "age": 22
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
        
        if (response.statusCode() == 201) {
            System.out.println("Tạo user thành công!");
            System.out.println("Response: " + response.body());
        } else {
            System.out.println("Lỗi: " + response.statusCode());
            System.out.println("Message: " + response.body());
        }
    }
}
```

### 4.5. Ví dụ: Cập nhật User (PUT)

```java
public class UpdateUserExample {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        
        // Dữ liệu cập nhật
        String jsonData = """
            {
                "name": "Nguyễn Minh Long",
                "email": "newemail@example.com",
                "age": 23
            }
            """;
        
        // Tạo PUT request
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.example.com/users/1"))
            .PUT(HttpRequest.BodyPublishers.ofString(jsonData))
            .header("Content-Type", "application/json")
            .header("Accept", "application/json")
            .build();
        
        HttpResponse<String> response = client.send(
            request,
            HttpResponse.BodyHandlers.ofString()
        );
        
        if (response.statusCode() == 200) {
            System.out.println("Cập nhật thành công!");
        } else {
            System.out.println("Lỗi: " + response.statusCode());
        }
    }
}
```

### 4.6. Ví dụ: Xóa User (DELETE)

```java
public class DeleteUserExample {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        
        // Tạo DELETE request
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.example.com/users/1"))
            .DELETE()
            .header("Accept", "application/json")
            .build();
        
        HttpResponse<String> response = client.send(
            request,
            HttpResponse.BodyHandlers.ofString()
        );
        
        if (response.statusCode() == 200 || response.statusCode() == 204) {
            System.out.println("Xóa user thành công!");
        } else if (response.statusCode() == 404) {
            System.out.println("User không tồn tại!");
        } else {
            System.out.println("Lỗi: " + response.statusCode());
        }
    }
}
```

## Xử lý lỗi và Best Practices

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

## So sánh với Socket (Bài 8)

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

## Kết luận

Trong bài 9, bạn đã học được:

- ✅ **HTTP Protocol**: Request-Response, Methods, Status Codes, Headers
- ✅ **REST Principles**: Resource-based, Stateless, Uniform Interface
- ✅ **RESTful API Design**: URL patterns, HTTP methods, JSON format
- ✅ **Java HTTP Client**: Cách tạo request, gửi GET/POST/PUT/DELETE, xử lý response
- ✅ **Async Requests**: Non-blocking với sendAsync()
- ✅ **Parse JSON**: Sử dụng Jackson hoặc Gson
- ✅ **Error Handling**: Xử lý status codes, timeout, retry logic
- ✅ **Best Practices**: Reuse HttpClient, xử lý exception, validate data

**Best Practices:**
- ✅ Luôn kiểm tra status code trước khi parse response
- ✅ Sử dụng timeout để tránh chờ đợi vô hạn
- ✅ Reuse HttpClient instance
- ✅ Dùng async cho nhiều request đồng thời
- ✅ Parse JSON an toàn với validation

**Lưu ý quan trọng:**
- HTTP được xây dựng trên TCP
- HTTP là stateless, mỗi request độc lập
- RESTful API sử dụng HTTP methods chuẩn
- Java HTTP Client chỉ có từ Java 11+

Với kiến thức về HTTP và RESTful API, bạn đã sẵn sàng xây dựng và sử dụng các web services hiện đại!
