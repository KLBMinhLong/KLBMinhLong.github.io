---
title: "Lập trình Socket trong Java: TCP Server/Client"
date: 2025-01-12
lastmod: 2025-01-12
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

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class EchoServer {
    public static void main(String[] args) {
        int port = 5000;

        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Echo server đang lắng nghe trên port " + port);

            while (true) {
                // Chờ một client kết nối
                Socket clientSocket = serverSocket.accept();
                System.out.println("Client mới kết nối từ " + clientSocket.getInetAddress());

                // Tạo reader/writer cho socket
                BufferedReader in = new BufferedReader(
                        new InputStreamReader(clientSocket.getInputStream()));
                PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);

                String line;
                while ((line = in.readLine()) != null) {
                    System.out.println("Nhận từ client: " + line);
                    // Gửi lại đúng nội dung cho client
                    out.println("Echo: " + line);
                }

                clientSocket.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

**Giải thích nhanh:**

- `ServerSocket serverSocket = new ServerSocket(port)` – mở "cửa" lắng nghe trên port 5000.
- `accept()` – block cho đến khi có client kết nối.
- `BufferedReader` + `PrintWriter` – đọc/ghi text line-by-line.
- Vòng `while ((line = in.readLine()) != null)` – đọc liên tục cho đến khi client đóng kết nối.

### 4.2. TCP Client

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

public class EchoClient {
    public static void main(String[] args) {
        String host = "localhost";
        int port = 5000;

        try (Socket socket = new Socket(host, port);
             BufferedReader in = new BufferedReader(
                     new InputStreamReader(socket.getInputStream()));
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
             Scanner scanner = new Scanner(System.in)) {

            System.out.println("Đã kết nối tới server " + host + ":" + port);
            System.out.println("Nhập message (gõ 'exit' để thoát):");

            while (true) {
                System.out.print("> ");
                String msg = scanner.nextLine();
                if ("exit".equalsIgnoreCase(msg)) {
                    break;
                }

                // Gửi tới server
                out.println(msg);

                // Nhận lại từ server
                String response = in.readLine();
                System.out.println("Server trả lời: " + response);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        }
    }
}
```

**Chạy thử:**

1. Run `EchoServer` trước (server lắng nghe).
2. Run `EchoClient`, gõ vài dòng text → server in log và client nhận lại `"Echo: ..."`.

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

## 6. UDP Socket (Tham khảo)

Ngoài TCP, Java cũng hỗ trợ UDP Socket với `DatagramSocket` và `DatagramPacket`:

```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

// UDP Server
public class UDPServer {
    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket(5000);
        byte[] buffer = new byte[1024];
        
        while (true) {
            DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
            socket.receive(packet);
            
            String message = new String(packet.getData(), 0, packet.getLength());
            System.out.println("Nhận: " + message);
            
            // Gửi lại
            InetAddress clientAddress = packet.getAddress();
            int clientPort = packet.getPort();
            byte[] response = ("Echo: " + message).getBytes();
            DatagramPacket responsePacket = new DatagramPacket(
                response, response.length, clientAddress, clientPort
            );
            socket.send(responsePacket);
        }
    }
}

// UDP Client
public class UDPClient {
    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket();
        InetAddress serverAddress = InetAddress.getByName("localhost");
        
        String message = "Xin chào từ UDP Client!";
        byte[] data = message.getBytes();
        DatagramPacket packet = new DatagramPacket(
            data, data.length, serverAddress, 5000
        );
        socket.send(packet);
        
        // Nhận phản hồi
        byte[] buffer = new byte[1024];
        DatagramPacket response = new DatagramPacket(buffer, buffer.length);
        socket.receive(response);
        
        String responseMessage = new String(
            response.getData(), 0, response.getLength()
        );
        System.out.println("Nhận từ server: " + responseMessage);
        
        socket.close();
    }
}
```

## 7. Tóm tắt theo phương pháp Feynman

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

## 8. Best Practices

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

## 9. Kết luận

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