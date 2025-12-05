---
title: "Giới thiệu về Lập trình Mạng (Network Programming)"
date: 2025-01-11
lastmod: 2025-01-11
draft: false
author: "Nguyễn Minh Long"
description: "Tổng quan về lập trình mạng: Network Programming là gì, mô hình TCP/IP, khái niệm Socket và kiến trúc Client-Server - nền tảng quan trọng cho mọi lập trình viên mạng."
tags:
  - Networking
  - Java
  - Tutorial
categories:
  - "Lập trình mạng"
featuredImage: "/images/posts/networking/network-programming-intro.jpg"
featuredImagePreview: "/images/posts/networking/network-programming-intro-preview.jpg"
toc: true
ShowToc: true
math: false
code: true
---

## Giới thiệu

Trong thời đại kết nối toàn cầu, **Lập trình Mạng (Network Programming)** là kỹ năng quan trọng cho mọi lập trình viên. Bài viết này sẽ giới thiệu những khái niệm cơ bản nhất về lập trình mạng.

![Network Programming](/images/posts/networking/network-programming-intro.jpg)

*Network Programming - Kết nối các ứng dụng qua mạng*

Chúng ta sẽ tìm hiểu:

- **Network Programming là gì?** - Khái niệm và ứng dụng
- **Mô hình TCP/IP** - Cách dữ liệu được truyền qua mạng
- **Socket** - Công cụ cơ bản để giao tiếp mạng
- **Client-Server Architecture** - Kiến trúc phổ biến nhất

## Network Programming là gì?

**Network Programming (Lập trình Mạng)** là việc viết các chương trình có thể giao tiếp với nhau qua mạng máy tính (Internet, LAN, WAN).

### Tại sao cần Network Programming?

- **Giao tiếp giữa các máy tính**: Gửi/nhận dữ liệu giữa các máy tính khác nhau
- **Ứng dụng phân tán**: Chia sẻ tài nguyên và xử lý dữ liệu trên nhiều máy
- **Web Development**: Trang web, API, microservices
- **Real-time Communication**: Chat, video call, online gaming
- **IoT (Internet of Things)**: Kết nối các thiết bị thông minh

### Ví dụ thực tế

```java
// Ví dụ đơn giản: Client gửi tin nhắn đến Server
// Client
Socket socket = new Socket("localhost", 8080);
PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
out.println("Xin chào từ Client!");

// Server
ServerSocket serverSocket = new ServerSocket(8080);
Socket clientSocket = serverSocket.accept();
BufferedReader in = new BufferedReader(
    new InputStreamReader(clientSocket.getInputStream())
);
String message = in.readLine(); // "Xin chào từ Client!"
```

## Mô hình TCP/IP

**TCP/IP (Transmission Control Protocol/Internet Protocol)** là bộ giao thức chuẩn để truyền dữ liệu qua mạng Internet.

### 4 Tầng của TCP/IP

#### 1. Application Layer (Tầng Ứng dụng)

**Chức năng**: Cung cấp dịch vụ cho ứng dụng người dùng

**Ví dụ các giao thức**:
- **HTTP/HTTPS**: Web browsing
- **FTP**: File transfer
- **SMTP**: Email
- **DNS**: Domain name resolution
- **SSH**: Secure shell

```java
// HTTP request (Application Layer)
GET /api/users HTTP/1.1
Host: example.com
```

#### 2. Transport Layer (Tầng Vận chuyển)

**Chức năng**: Đảm bảo dữ liệu được truyền đúng và đầy đủ

**Hai giao thức chính**:

**TCP (Transmission Control Protocol)**:
- ✅ Đáng tin cậy (Reliable)
- ✅ Đảm bảo thứ tự (Ordered)
- ✅ Kiểm tra lỗi (Error checking)
- ⚠️ Chậm hơn UDP
- 📌 Dùng cho: Web, Email, File transfer

**UDP (User Datagram Protocol)**:
- ⚡ Nhanh hơn TCP
- ❌ Không đảm bảo độ tin cậy
- ❌ Không đảm bảo thứ tự
- 📌 Dùng cho: Video streaming, Online gaming, DNS

```java
// TCP - Đảm bảo dữ liệu đến đúng
Socket tcpSocket = new Socket("example.com", 80);

// UDP - Nhanh nhưng không đảm bảo
DatagramSocket udpSocket = new DatagramSocket();
```

#### 3. Internet Layer (Tầng Mạng)

**Chức năng**: Định tuyến dữ liệu qua mạng

**Giao thức chính**: **IP (Internet Protocol)**
- Địa chỉ IP: Xác định máy tính trên mạng
- IPv4: `192.168.1.1` (32-bit)
- IPv6: `2001:0db8:85a3:0000:0000:8a2e:0370:7334` (128-bit)

```java
// Lấy địa chỉ IP
InetAddress address = InetAddress.getByName("example.com");
System.out.println("IP: " + address.getHostAddress());
```

#### 4. Network Access Layer (Tầng Truy cập Mạng)

**Chức năng**: Truyền dữ liệu qua phần cứng mạng (Ethernet, WiFi)

**Ví dụ**: Ethernet, WiFi, Bluetooth

### So sánh TCP và UDP

| Đặc điểm | TCP | UDP |
|----------|-----|-----|
| **Độ tin cậy** | ✅ Đảm bảo | ❌ Không đảm bảo |
| **Thứ tự** | ✅ Đảm bảo | ❌ Không đảm bảo |
| **Tốc độ** | ⚠️ Chậm hơn | ⚡ Nhanh hơn |
| **Kết nối** | ✅ Có kết nối (Connection-oriented) | ❌ Không kết nối (Connectionless) |
| **Overhead** | ⚠️ Nhiều hơn | ✅ Ít hơn |
| **Ứng dụng** | Web, Email, FTP | Video, Gaming, DNS |

![TCP vs UDP](/images/posts/networking/tcp-vs-udp.jpg)

*So sánh TCP và UDP - Hai giao thức vận chuyển chính*

## Socket

**Socket** là điểm cuối (endpoint) của kết nối mạng, cho phép hai chương trình giao tiếp với nhau.

### Khái niệm Socket

**Socket = IP Address + Port Number**

- **IP Address**: Xác định máy tính trên mạng
- **Port Number**: Xác định ứng dụng trên máy tính đó

**Ví dụ**: `192.168.1.1:8080`
- IP: `192.168.1.1` (máy tính)
- Port: `8080` (ứng dụng)

### Ví dụ thực tế

```
Tòa nhà (IP Address: 192.168.1.1)
├── Căn hộ 80 (Port 80 - Web Server)
├── Căn hộ 443 (Port 443 - HTTPS)
├── Căn hộ 3306 (Port 3306 - MySQL)
└── Căn hộ 8080 (Port 8080 - Custom App)
```

### Các loại Socket

#### 1. Stream Socket (TCP Socket)

```java
// Server Socket
ServerSocket serverSocket = new ServerSocket(8080);
Socket clientSocket = serverSocket.accept();

// Client Socket
Socket socket = new Socket("localhost", 8080);
```

**Đặc điểm**:
- Dùng TCP
- Đảm bảo độ tin cậy
- Có kết nối (connection-oriented)

#### 2. Datagram Socket (UDP Socket)

```java
// UDP Socket
DatagramSocket socket = new DatagramSocket();
DatagramPacket packet = new DatagramPacket(
    data, data.length, address, port
);
socket.send(packet);
```

**Đặc điểm**:
- Dùng UDP
- Không đảm bảo độ tin cậy
- Không kết nối (connectionless)

### Port Numbers

**Port** là số từ 0-65535 để xác định ứng dụng:

- **0-1023**: Well-known ports (HTTP: 80, HTTPS: 443, SSH: 22)
- **1024-49151**: Registered ports
- **49152-65535**: Dynamic/Private ports

**Một số port phổ biến**:
- `80`: HTTP
- `443`: HTTPS
- `22`: SSH
- `25`: SMTP (Email)
- `3306`: MySQL
- `5432`: PostgreSQL
- `8080`: HTTP Alternative

## Client-Server Architecture

**Client-Server** là kiến trúc phổ biến nhất trong lập trình mạng.

### Khái niệm

- **Server**: Máy tính cung cấp dịch vụ, chờ và xử lý yêu cầu
- **Client**: Máy tính yêu cầu dịch vụ, gửi request và nhận response

### Luồng hoạt động

```
1. Server khởi động và lắng nghe trên một port
2. Client kết nối đến Server
3. Client gửi Request
4. Server xử lý Request
5. Server gửi Response về Client
6. Client nhận Response
7. Đóng kết nối (hoặc giữ kết nối)
```

### Ví dụ đơn giản

```java
// Server
public class SimpleServer {
    public static void main(String[] args) throws IOException {
        // Tạo ServerSocket lắng nghe trên port 8080
        ServerSocket serverSocket = new ServerSocket(8080);
        System.out.println("Server đang lắng nghe trên port 8080...");
        
        // Chờ client kết nối
        Socket clientSocket = serverSocket.accept();
        System.out.println("Client đã kết nối!");
        
        // Đọc dữ liệu từ client
        BufferedReader in = new BufferedReader(
            new InputStreamReader(clientSocket.getInputStream())
        );
        String message = in.readLine();
        System.out.println("Nhận từ client: " + message);
        
        // Gửi phản hồi
        PrintWriter out = new PrintWriter(
            clientSocket.getOutputStream(), true
        );
        out.println("Server đã nhận: " + message);
        
        // Đóng kết nối
        clientSocket.close();
        serverSocket.close();
    }
}
```

```java
// Client
public class SimpleClient {
    public static void main(String[] args) throws IOException {
        // Kết nối đến server
        Socket socket = new Socket("localhost", 8080);
        
        // Gửi dữ liệu
        PrintWriter out = new PrintWriter(
            socket.getOutputStream(), true
        );
        out.println("Xin chào từ Client!");
        
        // Nhận phản hồi
        BufferedReader in = new BufferedReader(
            new InputStreamReader(socket.getInputStream())
        );
        String response = in.readLine();
        System.out.println("Nhận từ server: " + response);
        
        // Đóng kết nối
        socket.close();
    }
}
```

### Multi-threaded Server

Để xử lý nhiều client cùng lúc, server cần dùng multi-threading:

```java
public class MultiThreadedServer {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(8080);
        System.out.println("Server đang lắng nghe...");
        
        while (true) {
            // Chờ client kết nối
            Socket clientSocket = serverSocket.accept();
            
            // Tạo thread mới cho mỗi client
            new Thread(() -> {
                try {
                    handleClient(clientSocket);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }
    
    private static void handleClient(Socket clientSocket) 
            throws IOException {
        BufferedReader in = new BufferedReader(
            new InputStreamReader(clientSocket.getInputStream())
        );
        PrintWriter out = new PrintWriter(
            clientSocket.getOutputStream(), true
        );
        
        String message;
        while ((message = in.readLine()) != null) {
            System.out.println("Nhận: " + message);
            out.println("Echo: " + message);
        }
        
        clientSocket.close();
    }
}
```

![Client-Server Architecture](/images/posts/networking/client-server.jpg)

*Client-Server Architecture - Kiến trúc phổ biến nhất*

## Các khái niệm quan trọng khác

### IP Address

**IP Address (Địa chỉ IP)** xác định máy tính trên mạng:

- **IPv4**: 32-bit, ví dụ: `192.168.1.1`
- **IPv6**: 128-bit, ví dụ: `2001:0db8:85a3::8a2e:0370:7334`
- **Localhost**: `127.0.0.1` (máy tính hiện tại)

### DNS (Domain Name System)

**DNS** chuyển đổi tên miền thành địa chỉ IP:

```
example.com → 93.184.216.34
google.com → 142.250.191.14
```

```java
// Resolve domain name to IP
InetAddress address = InetAddress.getByName("google.com");
System.out.println("IP: " + address.getHostAddress());
```

### Firewall

**Firewall** bảo vệ mạng bằng cách kiểm soát traffic:
- Cho phép hoặc chặn kết nối
- Lọc theo port, IP, protocol

### NAT (Network Address Translation)

**NAT** cho phép nhiều thiết bị dùng chung một IP công cộng:
- Router có IP công cộng
- Các thiết bị trong mạng có IP riêng
- NAT chuyển đổi giữa IP công cộng và IP riêng

## Ví dụ thực tế

### Ví dụ 1: Echo Server (TCP)

```java
// Echo Server - Trả lại tin nhắn của client
public class EchoServer {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(8080);
        System.out.println("Echo Server đang chạy...");
        
        while (true) {
            Socket clientSocket = serverSocket.accept();
            new Thread(() -> {
                try {
                    BufferedReader in = new BufferedReader(
                        new InputStreamReader(clientSocket.getInputStream())
                    );
                    PrintWriter out = new PrintWriter(
                        clientSocket.getOutputStream(), true
                    );
                    
                    String input;
                    while ((input = in.readLine()) != null) {
                        System.out.println("Nhận: " + input);
                        out.println("Echo: " + input);
                    }
                    
                    clientSocket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }
}
```

### Ví dụ 2: Time Server

```java
// Time Server - Gửi thời gian hiện tại
public class TimeServer {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(8080);
        System.out.println("Time Server đang chạy...");
        
        while (true) {
            Socket clientSocket = serverSocket.accept();
            PrintWriter out = new PrintWriter(
                clientSocket.getOutputStream(), true
            );
            
            // Gửi thời gian hiện tại
            out.println(new Date().toString());
            
            clientSocket.close();
        }
    }
}
```

### Ví dụ 3: Simple HTTP-like Server

```java
// Simple HTTP-like Server
public class SimpleHTTPServer {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(8080);
        System.out.println("HTTP Server đang chạy trên port 8080...");
        
        while (true) {
            Socket clientSocket = serverSocket.accept();
            new Thread(() -> {
                try {
                    BufferedReader in = new BufferedReader(
                        new InputStreamReader(clientSocket.getInputStream())
                    );
                    PrintWriter out = new PrintWriter(
                        clientSocket.getOutputStream(), true
                    );
                    
                    // Đọc HTTP request
                    String request = in.readLine();
                    System.out.println("Request: " + request);
                    
                    // Gửi HTTP response
                    out.println("HTTP/1.1 200 OK");
                    out.println("Content-Type: text/html");
                    out.println();
                    out.println("<h1>Xin chào từ Server!</h1>");
                    
                    clientSocket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }
}
```

## Best Practices

### 1. Luôn đóng Socket

```java
// ✅ Tốt - Dùng try-with-resources
try (Socket socket = new Socket("localhost", 8080)) {
    // Sử dụng socket
} // Tự động đóng

// ❌ Không tốt - Quên đóng
Socket socket = new Socket("localhost", 8080);
// socket.close(); // Quên đóng!
```

### 2. Xử lý Exception

```java
try {
    Socket socket = new Socket("localhost", 8080);
    // ...
} catch (IOException e) {
    System.err.println("Lỗi kết nối: " + e.getMessage());
    e.printStackTrace();
}
```

### 3. Dùng Multi-threading cho Server

```java
// ✅ Tốt - Xử lý nhiều client
while (true) {
    Socket clientSocket = serverSocket.accept();
    new Thread(() -> handleClient(clientSocket)).start();
}
```

### 4. Timeout cho Socket

```java
Socket socket = new Socket();
socket.connect(new InetSocketAddress("localhost", 8080), 5000); // 5 giây timeout
```

## Kết luận

Trong bài 7, bạn đã học được:

- ✅ **Network Programming**: Khái niệm và ứng dụng
- ✅ **TCP/IP Model**: 4 tầng và chức năng của mỗi tầng
- ✅ **TCP vs UDP**: So sánh và khi nào dùng cái nào
- ✅ **Socket**: Khái niệm và các loại socket
- ✅ **Client-Server Architecture**: Kiến trúc và luồng hoạt động
- ✅ **Port Numbers**: Các port phổ biến và cách sử dụng

**Best Practices:**
- ✅ Luôn đóng socket sau khi sử dụng
- ✅ Xử lý exception đầy đủ
- ✅ Dùng multi-threading cho server
- ✅ Set timeout cho kết nối

**Lưu ý quan trọng:**
- TCP đảm bảo độ tin cậy, UDP nhanh hơn nhưng không đảm bảo
- Socket = IP + Port
- Server lắng nghe, Client kết nối
- Cần multi-threading để xử lý nhiều client

Trong bài tiếp theo, chúng ta sẽ đi sâu vào **Lập trình Socket trong Java** - cách tạo TCP Server/Client và UDP Server/Client với code chi tiết!
