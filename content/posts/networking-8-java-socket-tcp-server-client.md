---
title: "Lập trình Socket trong Java: TCP Server/Client"
date: 2025-01-11
lastmod: 2025-01-11
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
math: false
code: true
---

## Giới thiệu

Trong lập trình mạng với Java, **socket** là “cửa” để chương trình của bạn nói chuyện với chương trình khác qua mạng.  
Trong bài này, mình sẽ dùng **phương pháp Feyman** (giải thích bằng hình ảnh và ví dụ đời thường) để giúp bạn hiểu rõ:

- Socket là gì và hoạt động như thế nào
- Sự khác nhau giữa **UDP socket** và **TCP socket**
- Cách dùng `java.net.ServerSocket` và `java.net.Socket` để tạo **TCP Echo Server** đơn giản
- Cách mở rộng server thành **đa luồng (multi-threading)** để phục vụ nhiều client

---

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

> Hình `SocketFeyman.png` minh hoạ: Một tòa chung cư = địa chỉ IP, mỗi căn hộ = một port, socket = “cánh cửa cụ thể” mà hai bên dùng để giao tiếp.

---

## 2. UDP vs TCP qua hình Feyman

### 2.1. UDP Socket – “Hét qua loa” (`UDPSocketFeyman.png`)

Với UDP, bạn có thể tưởng tượng:

- Bạn dùng **loa phóng thanh** hét một câu → ai trong vùng nghe được thì nghe, không có đảm bảo ai nhận được, nhận đủ hay không.
- Không cần bắt tay, không cần xác nhận.

Đặc điểm UDP:

- Không đảm bảo thứ tự gói tin
- Không đảm bảo đến nơi
- Nhanh, overhead thấp
- Phù hợp: streaming, video call, game real-time (chấp nhận mất vài gói)

> Hình `UDPSocketFeyman.png` minh họa: người gửi cầm loa nói, không quan tâm người nghe ở đâu, có nghe đủ hay không.

### 2.2. TCP Socket – “Gửi hàng có ký nhận” (`TCPSocketFeyman.png`)

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

Giải thích nhanh:

- `ServerSocket serverSocket = new ServerSocket(port)` – mở “cửa” lắng nghe trên port 5000.
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
```

Chạy thử:

1. Run `EchoServer` trước (server lắng nghe).
2. Run `EchoClient`, gõ vài dòng text → server in log và client nhận lại `"Echo: ..."`.

---

## 5. Nâng cấp: Multi-threaded Server

Server hiện tại chỉ xử lý **từng client lần lượt** (block trong vòng `while`).  
Trong thực tế, ta muốn **nhiều client có thể kết nối cùng lúc**. Cách đơn giản:

- Mỗi khi `accept()` trả về một `Socket` mới, ta tạo một **Thread** hoặc **Runnable** để xử lý client đó.

Ví dụ rút gọn:

```java
public class MultiThreadedEchoServer {
    public static void main(String[] args) {
        int port = 5000;

        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println(\"Multi-threaded Echo server đang chạy trên port \" + port);

            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println(\"Client mới: \" + clientSocket.getInetAddress());

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
                System.out.println(\"[\" + clientSocket.getInetAddress() + \"] \" + line);
                out.println(\"Echo: \" + line);
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

Ý tưởng:

- **Main thread** chỉ lo `accept()` và tạo `ClientHandler`.
- Mỗi `ClientHandler` chạy trên một thread riêng, đọc/ghi với client tương ứng.

---

## 6. Tóm tắt theo phương pháp Feyman

1. **Socket là gì?**  
   - Giống như **cửa của một căn hộ** trong một toà nhà (IP + port).  
   - Client và server nói chuyện qua “cánh cửa” này.

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

## 7. Hướng phát triển tiếp theo

Từ ví dụ socket đơn giản này, bạn có thể:

- Xây dựng **chat room** mini dùng TCP (nhiều client, broadcast message).  
- Kết hợp với **JavaFX** hoặc **ứng dụng web** để có giao diện đẹp hơn.  
- Tìm hiểu thêm về **NIO (java.nio)** để xử lý nhiều kết nối hiệu quả hơn (non-blocking IO).

Trong bài tiếp theo, mình sẽ chuyển sang chủ đề **HTTP và RESTful API với Java**, nơi TCP/socket được “đóng gói” bên dưới giao thức HTTP quen thuộc.
