---
title: "Lập trình Socket trong Java: TCP Server/Client"
date: 2025-12-15
lastmod: 2025-12-15
draft: false
author: "Nguyễn Minh Long"
description: "Xây dựng TCP server/client trong Java với java.net.Socket và java.net.ServerSocket, kèm ví dụ echo server."
tags:
  - Java
  - Networking
  - Sockets
categories:
  - "Lập trình mạng"
featuredImage: "/images/posts/networking/TCPSocketFeyman.png"
featuredImagePreview: "/images/posts/networking/TCPSocketFeyman.png"
toc: true
ShowToc: true
math: false
code: true
---

## Giới thiệu

Trong lập trình mạng với Java, **socket** là "cửa" để chương trình của bạn nói chuyện với chương trình khác qua mạng.  
Trong bài này, mình sẽ dùng **phương pháp Feynman** (giải thích bằng hình ảnh và ví dụ đời thường) để giúp bạn hiểu rõ:

- Socket là gì và hoạt động như thế nào
- Sự khác nhau giữa **UDP socket** và **TCP socket**
- Cách dùng `java.net.ServerSocket` và `java.net.Socket` để tạo **TCP Echo Server** đơn giản
- Cách mở rộng server thành **đa luồng (multi-threading)** để phục vụ nhiều client

## 1. Socket là gì? (Hình Feyman: `SocketFeyman.png`)

Hãy tưởng tượng:

- **IP** giống như **địa chỉ toà nhà**  
- **Port** giống như **số phòng/căn hộ** trong tòa nhà

Khi bạn muốn gửi thư cho ai đó:

- Cần biết **địa chỉ nhà** + **số phòng** → tương ứng với **IP + port**
- Người nhận phải **mở cửa** để nhận thư → tương ứng với **server đang lắng nghe (listening)** trên port đó

Trong Java, socket được biểu diễn bởi hai lớp chính:

- `ServerSocket` – phía **server**, lắng nghe kết nối đến trên một port
- `Socket` – đại diện cho **kết nối 2 chiều** giữa client và server

> Hình `SocketFeyman.png` minh hoạ: Một tòa chung cư = địa chỉ IP, mỗi căn hộ = một port, socket = "cánh cửa cụ thể" mà hai bên dùng để giao tiếp.

![Socket là gì? - Minh họa bằng phương pháp Feynman](/images/posts/networking/SocketFeyman.png)

---

## 2. UDP vs TCP qua hình Feyman

### 2.1. UDP Socket – "Hét qua loa" (`UDPSocketFeyman.png`)

Với UDP, bạn có thể tưởng tượng:

- Bạn dùng **loa phóng thanh** hét một câu → ai trong vùng nghe được thì nghe, không có đảm bảo ai nhận được, nhận đủ hay không.
- Không cần bắt tay, không cần xác nhận.

Đặc điểm UDP:

- Không đảm bảo thứ tự gói tin
- Không đảm bảo đến nơi
- Nhanh, overhead thấp
- Phù hợp: streaming, video call, game real-time (chấp nhận mất vài gói)

> Hình `UDPSocketFeyman.png` minh họa: người gửi cầm loa nói, không quan tâm người nghe ở đâu, có nghe đủ hay không.

![UDP Socket - "Hét qua loa" - Minh họa bằng phương pháp Feynman](/images/posts/networking/UDPSocketFeyman.png)

### 2.2. TCP Socket – "Gửi hàng có ký nhận" (`TCPSocketFeyman.png`)

Với TCP, hãy tưởng tượng:

- Bạn dùng **dịch vụ giao hàng + ký nhận**:
  - Trước khi giao, bên giao hàng gọi điện xác nhận địa chỉ (bắt tay 3 bước – three-way handshake).
  - Mỗi kiện hàng có mã số, nếu thất lạc sẽ gửi lại.
  - Người nhận ký nhận → đảm bảo đã nhận.

Đặc điểm TCP:

- Đảm bảo thứ tự gói tin
- Đảm bảo đến nơi (hoặc báo lỗi)
- Kết nối theo phiên (connection-oriented)
- Phù hợp: HTTP, REST API, hầu hết ứng dụng web, chat, file transfer

> Hình `TCPSocketFeyman.png` minh họa: dòng chảy dữ liệu có kiểm soát giữa client và server với cơ chế bắt tay, xác nhận, gửi lại.

![TCP Socket - "Gửi hàng có ký nhận" - Minh họa bằng phương pháp Feynman](/images/posts/networking/TCPSocketFeyman.png)

---

## 3. Kiến trúc TCP Server/Client đơn giản

Kiến trúc cơ bản:

1. **Server**:
   - Tạo `ServerSocket` trên một port (ví dụ 5000)
   - Gọi `accept()` để **chờ client kết nối**
   - Khi có client mới, `accept()` trả về một `Socket`
   - Dùng `InputStream` / `OutputStream` của `Socket` để đọc/ghi dữ liệu
2. **Client**:
   - Tạo `Socket` trỏ tới `IP + port` của server
   - Gửi dữ liệu qua `OutputStream`
   - Nhận phản hồi từ `InputStream`

Trong bài này, ta sẽ làm **Echo Server**: client gửi gì, server trả lại đúng chuỗi đó.

---

## 4. Ví dụ: TCP Echo Server trong Java

### 4.1. TCP Server (single-thread)

Dưới đây là ví dụ TCP Server đơn giản từ code thực tế:

```java
import java.io.*;
import java.net.*;

public class SocketServerExample {
    public static void main(String[] args) {
        try {
            // Tạo ServerSocket và lắng nghe cổng 1234
            ServerSocket serverSocket = new ServerSocket(1234);
            System.out.println("Server đã khởi động và đang lắng nghe cổng 1234...");
            
            // Chấp nhận kết nối từ Client
            Socket clientSocket = serverSocket.accept();
            System.out.println("Client đã kết nối!");
            
            // Lấy luồng vào và ra để giao tiếp với Client
            InputStream inputStream = clientSocket.getInputStream();
            BufferedReader in = new BufferedReader(
                new InputStreamReader(inputStream)
            );
            OutputStream outputStream = clientSocket.getOutputStream();
            PrintWriter out = new PrintWriter(outputStream, true);
            
            // Đọc dữ liệu từ Client và gửi phản hồi
            String clientMessage = in.readLine();
            System.out.println("Client: " + clientMessage);
            out.println("Xin chào, Client!");
            
            // Đóng kết nối
            clientSocket.close();
            serverSocket.close();
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**Giải thích nhanh:**

- `ServerSocket serverSocket = new ServerSocket(1234)` – mở "cửa" lắng nghe trên port 1234.
- `accept()` – block cho đến khi có client kết nối, trả về một `Socket` mới.
- `BufferedReader` + `PrintWriter` – đọc/ghi text line-by-line.
- `in.readLine()` – đọc một dòng từ client.
- `out.println()` – gửi một dòng đến client.

### 4.2. TCP Client

Ví dụ TCP Client tương ứng:

```java
import java.io.*;
import java.net.*;

public class SocketClientExample {
    public static void main(String[] args) {
        try {
            // Thông tin máy chủ cần kết nối
            String serverAddress = "localhost"; // Hoặc IP cụ thể như "172.20.10.3"
            int serverPort = 1234;
            
            // Tạo kết nối tới máy chủ
            Socket socket = new Socket(serverAddress, serverPort);
            
            // Lấy luồng vào và ra để giao tiếp với Server
            InputStream inputStream = socket.getInputStream();
            BufferedReader in = new BufferedReader(
                new InputStreamReader(inputStream)
            );
            OutputStream outputStream = socket.getOutputStream();
            PrintWriter out = new PrintWriter(outputStream, true);
            
            // Gửi thông điệp tới Server
            out.println("Xin chào, Server!");
            
            // Đọc phản hồi từ Server và in ra màn hình
            String serverResponse = in.readLine();
            System.out.println("Server: " + serverResponse);
            
            // Đóng kết nối
            socket.close();
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**Chạy thử:**

1. **Chạy Server trước**: 
   ```bash
   javac SocketServerExample.java
   java SocketServerExample
   ```
   Server sẽ in: `"Server đã khởi động và đang lắng nghe cổng 1234..."`

2. **Chạy Client** (trong terminal khác):
   ```bash
   javac SocketClientExample.java
   java SocketClientExample
   ```
   Client sẽ gửi "Xin chào, Server!" và nhận phản hồi "Xin chào, Client!"

**Lưu ý:**
- Nếu chạy trên máy khác, thay `"localhost"` bằng địa chỉ IP của máy chạy server.
- Đảm bảo firewall không chặn port 1234.

---

## 5. Nâng cấp: Multi-threaded Server

Server hiện tại chỉ xử lý **từng client lần lượt** (block trong vòng `while`).  
Trong thực tế, ta muốn **nhiều client có thể kết nối cùng lúc**. Cách đơn giản:

- Mỗi khi `accept()` trả về một `Socket` mới, ta tạo một **Thread** hoặc **Runnable** để xử lý client đó.

**Ví dụ đầy đủ:**

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class MultiThreadedEchoServer {
    public static void main(String[] args) {
        int port = 5000;

        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Multi-threaded Echo server đang chạy trên port " + port);

            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("Client mới: " + clientSocket.getInetAddress());

                // Tạo thread mới để xử lý client
                new Thread(new ClientHandler(clientSocket)).start();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class ClientHandler implements Runnable {
    private final Socket clientSocket;

    ClientHandler(Socket socket) {
        this.clientSocket = socket;
    }

    @Override
    public void run() {
        try (BufferedReader in = new BufferedReader(
                    new InputStreamReader(clientSocket.getInputStream()));
             PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true)) {

            String line;
            while ((line = in.readLine()) != null) {
                System.out.println("[" + clientSocket.getInetAddress() + "] " + line);
                out.println("Echo: " + line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                clientSocket.close();
            } catch (Exception ignored) {}
        }
    }
}
```

**Ý tưởng:**

- **Main thread** chỉ lo `accept()` và tạo `ClientHandler`.
- Mỗi `ClientHandler` chạy trên một thread riêng, đọc/ghi với client tương ứng.

---

## 6. Mô phỏng trực quan TCP và UDP

Để hiểu rõ hơn về sự khác biệt giữa TCP và UDP, bạn có thể xem mô phỏng tương tác dưới đây:

{{< tcp_udp_simulation >}}

**Cách sử dụng mô phỏng:**

1. **Chọn giao thức**: Chọn TCP hoặc UDP từ dropdown
2. **Bắt đầu**: Nhấn nút "Bắt đầu" để xem quá trình truyền dữ liệu
3. **Mô phỏng mất gói (TCP)**: Khi đang chạy TCP, nhấn "Mô phỏng Mất gói" để xem cơ chế retransmission
4. **Điều chỉnh tốc độ**: Dùng slider để thay đổi tốc độ mô phỏng

**Những gì bạn sẽ thấy:**

- **TCP**: Bắt tay 3 bước (SYN, SYN-ACK, ACK), truyền dữ liệu với ACK, xử lý mất gói tin, đóng kết nối (FIN)
- **UDP**: Gửi dữ liệu ngay lập tức, không có handshake, có thể mất gói tin hoặc sai thứ tự

---

## 7. UDP Socket (Tham khảo)

Ngoài TCP, Java cũng hỗ trợ UDP Socket với `DatagramSocket` và `DatagramPacket`:

### 7.1. UDP Server

```java
import java.io.*;
import java.net.*;

class UDPServer {
    public static void main(String args[]) throws Exception {
        // Tạo DatagramSocket lắng nghe trên port 9876
        DatagramSocket serverSocket = new DatagramSocket(9876);

        byte[] receiveData = new byte[1024];
        byte[] sendData = new byte[1024];

        while (true) {
            // Tạo packet để nhận dữ liệu
            DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
            serverSocket.receive(receivePacket);
            
            // Chuyển đổi byte thành String
            String sentence = new String(receivePacket.getData());
            System.out.println("RECEIVED: " + sentence);

            // Lấy thông tin client (IP và port)
            InetAddress IPAddress = receivePacket.getAddress();
            int port = receivePacket.getPort();
            
            // Xử lý dữ liệu (ví dụ: chuyển thành chữ hoa)
            String capitalizedSentence = sentence.toUpperCase();
            sendData = capitalizedSentence.getBytes();

            // Tạo và gửi packet phản hồi
            DatagramPacket sendPacket = new DatagramPacket(
                sendData, sendData.length, IPAddress, port
            );
            serverSocket.send(sendPacket);
        }
    }
}
```

### 7.2. UDP Client

```java
import java.io.*;
import java.net.*;

class UDPClient {
    public static void main(String args[]) throws Exception {
        // Tạo DatagramSocket cho client
        BufferedReader inFromUser = new BufferedReader(
            new InputStreamReader(System.in)
        );
        DatagramSocket clientSocket = new DatagramSocket();
        
        // Địa chỉ server
        InetAddress IPAddress = InetAddress.getByName("localhost");

        byte[] sendData = new byte[1024];
        byte[] receiveData = new byte[1024];

        // Nhập message từ người dùng
        System.out.print("Enter message: ");
        String sentence = inFromUser.readLine();
        sendData = sentence.getBytes();

        // Tạo và gửi packet
        DatagramPacket sendPacket = new DatagramPacket(
            sendData, sendData.length, IPAddress, 9876
        );
        clientSocket.send(sendPacket);

        // Nhận phản hồi từ server
        DatagramPacket receivePacket = new DatagramPacket(
            receiveData, receiveData.length
        );
        clientSocket.receive(receivePacket);
        
        String modifiedSentence = new String(receivePacket.getData());
        System.out.println("FROM SERVER: " + modifiedSentence);
        
        clientSocket.close();
    }
}
```

**So sánh UDP và TCP:**

| Đặc điểm | UDP | TCP |
|----------|-----|-----|
| **Kết nối** | Không cần (Connectionless) | Cần thiết lập (Connection-oriented) |
| **Độ tin cậy** | Không đảm bảo | Đảm bảo |
| **Thứ tự** | Không đảm bảo | Đảm bảo |
| **Tốc độ** | Nhanh hơn | Chậm hơn |
| **Overhead** | Thấp | Cao |
| **API Java** | `DatagramSocket`, `DatagramPacket` | `Socket`, `ServerSocket` |

## 8. Tóm tắt theo phương pháp Feynman

1. **Socket là gì?**  
   - Giống như **cửa của một căn hộ** trong một toà nhà (IP + port).  
   - Client và server nói chuyện qua "cánh cửa" này.

2. **UDP vs TCP?**  
   - UDP: **hét qua loa** – nhanh, không đảm bảo, phù hợp streaming.  
   - TCP: **gửi hàng có ký nhận** – bắt tay, đảm bảo thứ tự và tin cậy.

3. **Java Socket API:**  
   - `ServerSocket` (server) + `Socket` (client/kết nối).  
   - Dùng stream (`InputStream` / `OutputStream`) để đọc/ghi dữ liệu.

4. **Echo Server:**  
   - Là ví dụ kinh điển để kiểm tra kết nối.  
   - Dễ mở rộng lên multi-thread để phục vụ nhiều client.

---

## 9. Best Practices

### 1. Luôn đóng Socket và Streams

```java
// ✅ Tốt - Dùng try-with-resources
try (Socket socket = new Socket("localhost", 5000);
     BufferedReader in = new BufferedReader(...);
     PrintWriter out = new PrintWriter(...)) {
    // Sử dụng socket
} // Tự động đóng

// ❌ Không tốt - Quên đóng
Socket socket = new Socket("localhost", 5000);
// socket.close(); // Quên đóng!
```

### 2. Xử lý Exception đầy đủ

```java
try {
    Socket socket = new Socket("localhost", 5000);
    // ...
} catch (IOException e) {
    System.err.println("Lỗi kết nối: " + e.getMessage());
    e.printStackTrace();
}
```

### 3. Set Timeout cho Socket

```java
Socket socket = new Socket();
socket.connect(new InetSocketAddress("localhost", 5000), 5000); // 5 giây timeout
```

### 4. Dùng Thread Pool cho Multi-threaded Server

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

ExecutorService threadPool = Executors.newFixedThreadPool(10);

while (true) {
    Socket clientSocket = serverSocket.accept();
    threadPool.execute(new ClientHandler(clientSocket));
}
```

## 10. Kết luận

Trong bài 8, bạn đã học được:

- ✅ **Socket là gì**: IP + Port, "cửa" để giao tiếp mạng
- ✅ **TCP vs UDP**: TCP đảm bảo, UDP nhanh
- ✅ **java.net.Socket & ServerSocket**: Cách tạo TCP connection
- ✅ **Echo Server**: Ví dụ cơ bản về TCP Server/Client
- ✅ **Multi-threading**: Xử lý nhiều client cùng lúc
- ✅ **UDP Socket**: Cách sử dụng DatagramSocket

**Best Practices:**
- ✅ Luôn đóng socket và streams
- ✅ Xử lý exception đầy đủ
- ✅ Set timeout cho kết nối
- ✅ Dùng thread pool cho multi-threaded server

**Lưu ý quan trọng:**
- TCP đảm bảo độ tin cậy, UDP nhanh nhưng không đảm bảo
- ServerSocket.accept() block cho đến khi có client kết nối
- Cần multi-threading để xử lý nhiều client
- Luôn đóng socket sau khi sử dụng

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **HTTP và RESTful API với Java** - cách sử dụng HTTP Client để gọi API và xây dựng RESTful services.