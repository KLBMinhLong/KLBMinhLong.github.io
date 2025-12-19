---
title: "Xây dựng Ứng dụng Chat Multi-threading với Java Socket"
date: 2025-12-18
lastmod: 2025-12-18
draft: false
author: "Nguyễn Minh Long"
description: "Học cách xây dựng ứng dụng chat đa luồng với Java Socket, xử lý nhiều client đồng thời, broadcast message và logging."
tags:
  - Java
  - Networking
  - Multi-threading
  - Sockets
categories:
  - "Lập trình mạng"
featuredImage: "/images/posts/networking/multi-threading-chat.jpg"
featuredImagePreview: "/images/posts/networking/multi-threading-chat-preview.jpg"
toc: true
ShowToc: true
math: false
code: true
---

## Giới thiệu

Trong bài viết này, chúng ta sẽ xây dựng một **ứng dụng chat đa luồng (multi-threading)** hoàn chỉnh sử dụng Java Socket. Ứng dụng này cho phép nhiều client kết nối đồng thời và chat với nhau thông qua server.

**Những gì bạn sẽ học:**

- Cách xử lý nhiều client cùng lúc với multi-threading
- Broadcast message đến tất cả client
- Quản lý danh sách client kết nối
- Logging tin nhắn vào file
- Thread-safe operations

---

## 1. Kiến trúc Ứng dụng

### 1.1. Mô hình Client-Server

```
┌─────────┐      ┌─────────┐      ┌─────────┐
│ Client1 │──────┤         │──────│ Client2 │
└─────────┘      │ Server  │      └─────────┘
                 │         │
┌─────────┐      │         │      ┌─────────┐
│ Client3 │──────┤         │──────│ Client4 │
└─────────┘      └─────────┘      └─────────┘
```

**Luồng hoạt động:**

1. Server lắng nghe trên một port (ví dụ: 9999)
2. Mỗi client kết nối → Server tạo một thread riêng để xử lý
3. Client gửi tin nhắn → Server nhận và broadcast đến tất cả client khác
4. Client có thể gửi "exit" để ngắt kết nối

### 1.2. Các thành phần chính

- **Server**: 
  - `Chat_Server3`: Main server, quản lý kết nối
  - `ClientHandler3`: Xử lý từng client riêng biệt
  
- **Client**: 
  - `Chat_Client3`: Client application với thread đọc tin nhắn

---

## 2. Server: Chat_Server3

### 2.1. Code đầy đủ

```java
import java.io.*;
import java.net.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Chat_Server3 {
    private static final int PortNumber = 9999;
    private static final String LOG_FILE = "chat_log.txt";

    // Hiển thị địa chỉ IP của server
    private static void displayServerIPAddress() {
        try {
            Enumeration<NetworkInterface> networkInterfaces = 
                NetworkInterface.getNetworkInterfaces();
            while (networkInterfaces.hasMoreElements()) {
                NetworkInterface networkInterface = networkInterfaces.nextElement();
                Enumeration<InetAddress> inetAddresses = 
                    networkInterface.getInetAddresses();
                while (inetAddresses.hasMoreElements()) {
                    InetAddress inetAddress = inetAddresses.nextElement();
                    // Lọc địa chỉ IP local (không phải loopback)
                    if (!inetAddress.isLoopbackAddress() && 
                        inetAddress.isSiteLocalAddress()) {
                        String serverIP = inetAddress.getHostAddress();
                        System.out.println("Địa chỉ IP của Server: " + serverIP);
                    }
                }
            }
        } catch (SocketException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        try {
            // Hiển thị địa chỉ IP của server
            displayServerIPAddress();

            // Tạo ServerSocket lắng nghe trên port 9999
            ServerSocket serverSocket = new ServerSocket(PortNumber);
            System.out.println("Server is listening...");

            // Danh sách các client handler
            ArrayList<ClientHandler3> clientHandlers = new ArrayList<>();

            // Thread pool để quản lý các thread
            ExecutorService executor = Executors.newCachedThreadPool();

            while (true) {
                // Chờ client kết nối
                Socket clientSocket = serverSocket.accept();
                System.out.println("Client connected: " + 
                    clientSocket.getInetAddress());

                // Tạo handler mới cho client
                ClientHandler3 clientHandler = new ClientHandler3(
                    clientSocket, clientHandlers
                );
                clientHandlers.add(clientHandler);
                
                // Chạy handler trên thread pool
                executor.execute(clientHandler);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Log tin nhắn vào file
    public static synchronized void logMessage(String senderName, String message) {
        try (PrintWriter logWriter = new PrintWriter(
                new BufferedWriter(
                    new FileWriter(LOG_FILE, true)
                )
            )) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String timestamp = sdf.format(new Date());
            logWriter.println(timestamp + " - " + senderName + ": " + message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 2.2. Giải thích Server

**Các thành phần quan trọng:**

1. **`displayServerIPAddress()`**: 
   - Tìm và hiển thị địa chỉ IP local của server
   - Giúp client biết địa chỉ để kết nối

2. **`ArrayList<ClientHandler3>`**: 
   - Lưu danh sách tất cả client đang kết nối
   - Dùng để broadcast message

3. **`ExecutorService`**: 
   - Thread pool để quản lý các thread
   - Hiệu quả hơn việc tạo thread mới mỗi lần

4. **`logMessage()`**: 
   - Ghi log tin nhắn vào file `chat_log.txt`
   - Dùng `synchronized` để thread-safe

---

## 3. ClientHandler3: Xử lý từng Client

### 3.1. Code đầy đủ

```java
class ClientHandler3 implements Runnable {
    private Socket clientSocket;
    private String clientName;
    private BufferedReader in;
    private PrintWriter out;
    private ArrayList<ClientHandler3> clientHandlers;

    public ClientHandler3(Socket clientSocket, 
                         ArrayList<ClientHandler3> clientHandlers) {
        this.clientSocket = clientSocket;
        this.clientHandlers = clientHandlers;
    }

    @Override
    public void run() {
        try {
            // Tạo input/output streams
            in = new BufferedReader(
                new InputStreamReader(clientSocket.getInputStream())
            );
            out = new PrintWriter(
                clientSocket.getOutputStream(), true
            );

            // Đọc tên client từ tin nhắn đầu tiên
            clientName = in.readLine();
            System.out.println("Client name: " + clientName);

            // Đọc và broadcast tin nhắn
            while (true) {
                String message = in.readLine();
                if (message == null) {
                    break; // Client đã ngắt kết nối
                }
                if (message.equalsIgnoreCase("exit")) {
                    broadcastMessage(clientName + " has exited the chat.");
                    System.out.println(clientName + " has exited the chat.");
                    break;
                }
                
                // Log tin nhắn
                Chat_Server3.logMessage(clientName, message);
                
                // Broadcast đến tất cả client khác
                broadcastMessage(clientName + ": " + message);
            }

            // Xóa client khỏi danh sách
            clientHandlers.remove(this);

            // Đóng kết nối
            clientSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Broadcast message đến tất cả client
    public void broadcastMessage(String message) {
        for (ClientHandler3 clientHandler : clientHandlers) {
            clientHandler.sendMessage(message);
        }
    }

    // Gửi message đến client này
    public void sendMessage(String message) {
        out.println(message);
    }
}
```

### 3.2. Giải thích ClientHandler

**Luồng xử lý:**

1. **Nhận tên client**: Đọc dòng đầu tiên làm tên client
2. **Vòng lặp đọc tin nhắn**: 
   - Đọc tin nhắn từ client
   - Nếu `null` → client đã ngắt kết nối
   - Nếu "exit" → thông báo và thoát
3. **Logging**: Ghi tin nhắn vào file
4. **Broadcast**: Gửi tin nhắn đến tất cả client khác
5. **Cleanup**: Xóa khỏi danh sách và đóng socket

---

## 4. Client: Chat_Client3

### 4.1. Code đầy đủ

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class Chat_Client3 {
    public static void main(String[] args) {
        try {
            final int PortNumber = 9999;
            BufferedReader inputReader = new BufferedReader(
                new InputStreamReader(System.in)
            );

            // Nhập địa chỉ IP server
            System.out.print("Enter Server IP Address: ");
            String serverIP = inputReader.readLine();

            // Tạo socket kết nối đến server
            Socket clientSocket = new Socket(serverIP, PortNumber);

            // Tạo input/output streams
            BufferedReader in = new BufferedReader(
                new InputStreamReader(clientSocket.getInputStream())
            );
            PrintWriter out = new PrintWriter(
                clientSocket.getOutputStream(), true
            );

            // Nhập tên client
            System.out.print("Enter your name: ");
            String clientName = inputReader.readLine();

            // Gửi tên đến server
            out.println(clientName);

            // Tạo thread riêng để đọc tin nhắn từ server
            Thread readThread = new Thread(() -> {
                try {
                    while (true) {
                        String response = in.readLine();
                        if (response == null) break; // Server đóng
                        System.out.println(response);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
            readThread.start();

            // Gửi tin nhắn đến server
            while (true) {
                String message = inputReader.readLine();
                out.println(message);
                if (message.equalsIgnoreCase("exit")) {
                    break;
                }
            }

            // Đóng kết nối
            clientSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 4.2. Giải thích Client

**Điểm quan trọng:**

1. **Thread đọc tin nhắn**: 
   - Tạo thread riêng để đọc tin nhắn từ server
   - Cho phép gửi và nhận tin nhắn đồng thời

2. **Gửi tên trước**: 
   - Gửi tên client ngay sau khi kết nối
   - Server dùng tên này để hiển thị

3. **Vòng lặp gửi tin nhắn**: 
   - Đọc từ console và gửi đến server
   - Gõ "exit" để thoát

---

## 5. Cách chạy Ứng dụng

### 5.1. Chạy Server

```bash
# Compile
javac Chat_Server3.java

# Run
java Chat_Server3
```

**Output:**
```
Địa chỉ IP của Server: 192.168.1.100
Server is listening...
```

### 5.2. Chạy Client (nhiều terminal)

**Terminal 1:**
```bash
javac Chat_Client3.java
java Chat_Client3
# Nhập IP: 192.168.1.100
# Nhập tên: Alice
```

**Terminal 2:**
```bash
java Chat_Client3
# Nhập IP: 192.168.1.100
# Nhập tên: Bob
```

**Terminal 3:**
```bash
java Chat_Client3
# Nhập IP: 192.168.1.100
# Nhập tên: Charlie
```

### 5.3. Sử dụng

- Mỗi client gõ tin nhắn và nhấn Enter
- Tin nhắn sẽ được broadcast đến tất cả client khác
- Gõ "exit" để thoát

**Ví dụ:**
```
Alice: Xin chào mọi người!
Bob: Chào Alice!
Charlie: Hello!
```

---

## 6. Tính năng nâng cao

### 6.1. Logging vào File

Server tự động ghi tất cả tin nhắn vào file `chat_log.txt`:

```
2025-01-19 10:30:15 - Alice: Xin chào mọi người!
2025-01-19 10:30:20 - Bob: Chào Alice!
2025-01-19 10:30:25 - Charlie: Hello!
```

### 6.2. Thread Pool

Sử dụng `ExecutorService` thay vì tạo thread mới:

```java
ExecutorService executor = Executors.newCachedThreadPool();
executor.execute(clientHandler);
```

**Lợi ích:**
- Quản lý thread hiệu quả hơn
- Tái sử dụng thread
- Giới hạn số thread tối đa

### 6.3. Thread-Safe Operations

Dùng `synchronized` cho các thao tác shared:

```java
public static synchronized void logMessage(String senderName, String message) {
    // Thread-safe logging
}
```

---

## 7. Best Practices

### 7.1. Luôn đóng Socket và Streams

```java
try (Socket socket = new Socket(serverIP, port);
     BufferedReader in = new BufferedReader(...);
     PrintWriter out = new PrintWriter(...)) {
    // Sử dụng
} // Tự động đóng
```

### 7.2. Xử lý Exception đầy đủ

```java
try {
    // Socket operations
} catch (IOException e) {
    System.err.println("Lỗi: " + e.getMessage());
    e.printStackTrace();
}
```

### 7.3. Dùng Thread Pool

```java
// ✅ Tốt
ExecutorService executor = Executors.newCachedThreadPool();
executor.execute(handler);

// ❌ Không tốt (tạo quá nhiều thread)
new Thread(handler).start();
```

### 7.4. Thread-Safe Collections

```java
// ✅ Tốt - Thread-safe
List<ClientHandler> handlers = Collections.synchronizedList(
    new ArrayList<>()
);

// Hoặc dùng CopyOnWriteArrayList
List<ClientHandler> handlers = new CopyOnWriteArrayList<>();
```

---

## 8. Mở rộng Ứng dụng

### 8.1. Thêm tính năng

- **Private message**: Gửi tin nhắn riêng giữa 2 người
- **Room/Chat groups**: Tạo các phòng chat riêng
- **File transfer**: Gửi file qua socket
- **Emoji support**: Hỗ trợ emoji
- **User authentication**: Xác thực người dùng

### 8.2. Cải thiện UI

- **GUI với Java Swing**: Giao diện đồ họa
- **Web interface**: Dùng WebSocket (xem bài 10)
- **Mobile app**: Kết nối đến server

---

## 9. Kết luận

Trong bài này, bạn đã học được:

- ✅ **Multi-threading với Socket**: Xử lý nhiều client đồng thời
- ✅ **Broadcast message**: Gửi tin nhắn đến tất cả client
- ✅ **Thread Pool**: Quản lý thread hiệu quả
- ✅ **Logging**: Ghi log tin nhắn vào file
- ✅ **Client-Server Architecture**: Kiến trúc ứng dụng chat

**Các khái niệm quan trọng:**

- Mỗi client cần một thread riêng để xử lý
- Dùng thread pool thay vì tạo thread mới mỗi lần
- Thread-safe operations cho shared resources
- Luôn đóng socket và streams sau khi dùng

**Bài tập thực hành:**

1. Thêm tính năng private message
2. Tạo room chat riêng
3. Thêm GUI với Java Swing
4. Implement file transfer

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **WebSocket trong JavaScript** - cách xây dựng ứng dụng real-time communication trên web!
