---
title: "WebSocket trong JavaScript: Real-time Communication"
date: 2025-01-13
lastmod: 2025-01-13
draft: false
author: "Nguyễn Minh Long"
description: "Tìm hiểu WebSocket trong JavaScript: So sánh với HTTP, WebSocket API, cách xây dựng ứng dụng real-time như chat, và giới thiệu Socket.io."
tags:
  - JavaScript
  - Networking
  - WebSocket
  - Tutorial
categories:
  - "Lập trình mạng"
featuredImage: "/images/posts/networking/websocket-intro.jpg"
featuredImagePreview: "/images/posts/networking/websocket-intro-preview.jpg"
toc: true
ShowToc: true
math: false
code: true
---

# WebSocket trong JavaScript: Real-time Communication

## Giới thiệu

Sau khi đã hiểu về **HTTP** (request-response), bài này sẽ giới thiệu **WebSocket** - giao thức cho phép giao tiếp **real-time, hai chiều** giữa client và server.

![WebSocket](/images/posts/networking/websocket-intro.jpg)

*WebSocket - Giao thức cho real-time communication*

Chúng ta sẽ tìm hiểu:

- **WebSocket vs HTTP**: Sự khác biệt và khi nào dùng cái nào
- **WebSocket API**: Cách sử dụng WebSocket trong JavaScript
- **Ví dụ thực tế**: Xây dựng ứng dụng chat đơn giản
- **Socket.io**: Thư viện mạnh mẽ cho WebSocket (optional)

## WebSocket vs HTTP

### HTTP (Request-Response)

**HTTP** hoạt động theo mô hình **request-response**:

```
Client → Request → Server
Client ← Response ← Server
```

**Đặc điểm:**
- ❌ Client phải gửi request trước, server mới trả về response
- ❌ Server không thể gửi dữ liệu cho client trừ khi client yêu cầu
- ❌ Mỗi request tạo connection mới (hoặc dùng keep-alive)
- ✅ Đơn giản, dễ hiểu
- ✅ Phù hợp: Web pages, REST API, form submission

**Ví dụ HTTP:**
```javascript
// Client phải gửi request
fetch('/api/messages')
  .then(response => response.json())
  .then(data => console.log(data));

// Server không thể tự động gửi dữ liệu mới cho client
```

### WebSocket (Full-Duplex)

**WebSocket** cho phép giao tiếp **hai chiều, real-time**:

```
Client ←→ WebSocket Connection ←→ Server
        (Cả hai có thể gửi bất cứ lúc nào)
```

**Đặc điểm:**
- ✅ **Full-duplex**: Cả client và server có thể gửi dữ liệu bất cứ lúc nào
- ✅ **Persistent connection**: Kết nối được giữ mở
- ✅ **Real-time**: Dữ liệu được gửi ngay lập tức
- ✅ **Low overhead**: Ít overhead hơn HTTP (sau khi handshake)
- ✅ Phù hợp: Chat, real-time gaming, live updates, notifications

![WebSocket vs HTTP](/images/posts/networking/websocket-vs-http.jpg)

*So sánh WebSocket và HTTP - Full-duplex vs Request-Response*

### Khi nào dùng WebSocket?

**Dùng WebSocket khi:**
- ✅ Cần real-time communication (chat, notifications)
- ✅ Server cần push dữ liệu cho client
- ✅ Cần giao tiếp hai chiều liên tục
- ✅ Cần low latency (gaming, trading)

**Dùng HTTP khi:**
- ✅ Request-response đơn giản
- ✅ Không cần real-time
- ✅ Stateless operations
- ✅ RESTful API

## WebSocket API trong JavaScript

### Tạo WebSocket Connection

```javascript
// Tạo WebSocket connection
const socket = new WebSocket('ws://localhost:8080');

// Hoặc với SSL (WSS)
const secureSocket = new WebSocket('wss://example.com');
```

### WebSocket Events

```javascript
const socket = new WebSocket('ws://localhost:8080');

// 1. Khi kết nối được mở
socket.onopen = function(event) {
    console.log('WebSocket connection opened');
    // Gửi dữ liệu ngay sau khi kết nối
    socket.send('Xin chào từ client!');
};

// 2. Khi nhận được message từ server
socket.onmessage = function(event) {
    console.log('Nhận từ server:', event.data);
    // event.data có thể là string, Blob, hoặc ArrayBuffer
};

// 3. Khi có lỗi xảy ra
socket.onerror = function(error) {
    console.error('WebSocket error:', error);
};

// 4. Khi kết nối bị đóng
socket.onclose = function(event) {
    console.log('WebSocket connection closed');
    console.log('Code:', event.code);
    console.log('Reason:', event.reason);
    console.log('Was clean:', event.wasClean);
};
```

### Gửi dữ liệu

```javascript
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function() {
    // Gửi string
    socket.send('Hello Server!');
    
    // Gửi JSON
    const data = { type: 'message', content: 'Xin chào' };
    socket.send(JSON.stringify(data));
    
    // Gửi Blob
    const blob = new Blob(['Hello'], { type: 'text/plain' });
    socket.send(blob);
    
    // Gửi ArrayBuffer
    const buffer = new ArrayBuffer(8);
    socket.send(buffer);
};
```

### Đóng kết nối

```javascript
// Đóng kết nối
socket.close();

// Đóng với code và reason
socket.close(1000, 'Normal closure');

// Kiểm tra trạng thái
console.log(socket.readyState);
// 0: CONNECTING
// 1: OPEN
// 2: CLOSING
// 3: CLOSED
```

## Ví dụ: Simple Chat Application

### Client Side (JavaScript)

```javascript
// chat-client.js
class ChatClient {
    constructor(url) {
        this.socket = new WebSocket(url);
        this.setupEventHandlers();
    }
    
    setupEventHandlers() {
        this.socket.onopen = () => {
            console.log('Đã kết nối đến server!');
            this.showMessage('System', 'Đã kết nối đến server');
        };
        
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.showMessage(message.user, message.text);
        };
        
        this.socket.onerror = (error) => {
            console.error('Lỗi:', error);
            this.showMessage('System', 'Có lỗi xảy ra');
        };
        
        this.socket.onclose = () => {
            console.log('Đã ngắt kết nối');
            this.showMessage('System', 'Đã ngắt kết nối');
        };
    }
    
    sendMessage(user, text) {
        if (this.socket.readyState === WebSocket.OPEN) {
            const message = {
                user: user,
                text: text,
                timestamp: new Date().toISOString()
            };
            this.socket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket chưa kết nối');
        }
    }
    
    showMessage(user, text) {
        const messagesDiv = document.getElementById('messages');
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${user}:</strong> ${text}`;
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
    
    close() {
        this.socket.close();
    }
}

// Sử dụng
const chat = new ChatClient('ws://localhost:8080');

document.getElementById('sendButton').addEventListener('click', () => {
    const input = document.getElementById('messageInput');
    const user = document.getElementById('usernameInput').value || 'Anonymous';
    chat.sendMessage(user, input.value);
    input.value = '';
});
```

### HTML

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>WebSocket Chat</title>
    <style>
        #messages {
            border: 1px solid #ccc;
            height: 400px;
            overflow-y: auto;
            padding: 10px;
            margin-bottom: 10px;
        }
        #messageInput {
            width: 70%;
            padding: 5px;
        }
        #sendButton {
            width: 25%;
            padding: 5px;
        }
    </style>
</head>
<body>
    <h1>WebSocket Chat</h1>
    <input type="text" id="usernameInput" placeholder="Tên của bạn" />
    <div id="messages"></div>
    <input type="text" id="messageInput" placeholder="Nhập tin nhắn..." />
    <button id="sendButton">Gửi</button>
    
    <script src="chat-client.js"></script>
</body>
</html>
```

### Server Side (Node.js với ws library)

```javascript
// chat-server.js
const WebSocket = require('ws');

// Tạo WebSocket server trên port 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket server đang chạy trên ws://localhost:8080');

// Khi có client kết nối
wss.on('connection', function connection(ws, req) {
    const clientIp = req.socket.remoteAddress;
    console.log('Client mới kết nối từ:', clientIp);
    
    // Gửi welcome message
    ws.send(JSON.stringify({
        user: 'System',
        text: 'Chào mừng đến với chat room!',
        timestamp: new Date().toISOString()
    }));
    
    // Khi nhận được message từ client
    ws.on('message', function incoming(message) {
        console.log('Nhận:', message.toString());
        
        try {
            const data = JSON.parse(message);
            
            // Broadcast message đến tất cả clients
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        user: data.user,
                        text: data.text,
                        timestamp: data.timestamp
                    }));
                }
            });
        } catch (error) {
            console.error('Lỗi parse message:', error);
        }
    });
    
    // Khi client ngắt kết nối
    ws.on('close', function() {
        console.log('Client đã ngắt kết nối:', clientIp);
    });
    
    // Xử lý lỗi
    ws.on('error', function(error) {
        console.error('WebSocket error:', error);
    });
});
```

**Cài đặt và chạy:**
```bash
npm init -y
npm install ws
node chat-server.js
```

## Ví dụ nâng cao: Real-time Notifications

```javascript
// notification-client.js
class NotificationClient {
    constructor(url) {
        this.socket = new WebSocket(url);
        this.setupHandlers();
    }
    
    setupHandlers() {
        this.socket.onopen = () => {
            console.log('Notification service connected');
            // Đăng ký user ID
            this.socket.send(JSON.stringify({
                type: 'register',
                userId: this.getUserId()
            }));
        };
        
        this.socket.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            this.showNotification(notification);
        };
    }
    
    getUserId() {
        // Lấy user ID từ localStorage hoặc cookie
        return localStorage.getItem('userId') || 'anonymous';
    }
    
    showNotification(notification) {
        // Hiển thị notification
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(notification.title, {
                body: notification.message,
                icon: notification.icon
            });
        }
    }
}

// Sử dụng
const notificationClient = new NotificationClient('wss://api.example.com/notifications');
```

## Reconnection Logic

WebSocket có thể bị ngắt kết nối. Cần implement reconnection:

```javascript
class ReconnectingWebSocket {
    constructor(url, options = {}) {
        this.url = url;
        this.reconnectInterval = options.reconnectInterval || 3000;
        this.maxReconnectAttempts = options.maxReconnectAttempts || 5;
        this.reconnectAttempts = 0;
        this.socket = null;
        this.connect();
    }
    
    connect() {
        this.socket = new WebSocket(this.url);
        
        this.socket.onopen = () => {
            console.log('WebSocket connected');
            this.reconnectAttempts = 0;
            this.onopen && this.onopen();
        };
        
        this.socket.onmessage = (event) => {
            this.onmessage && this.onmessage(event);
        };
        
        this.socket.onerror = (error) => {
            this.onerror && this.onerror(error);
        };
        
        this.socket.onclose = () => {
            console.log('WebSocket closed');
            this.onclose && this.onclose();
            this.reconnect();
        };
    }
    
    reconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
            
            setTimeout(() => {
                this.connect();
            }, this.reconnectInterval);
        } else {
            console.error('Max reconnection attempts reached');
        }
    }
    
    send(data) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(data);
        } else {
            console.error('WebSocket is not open');
        }
    }
    
    close() {
        this.reconnectAttempts = this.maxReconnectAttempts; // Ngăn reconnect
        this.socket.close();
    }
}

// Sử dụng
const ws = new ReconnectingWebSocket('ws://localhost:8080', {
    reconnectInterval: 3000,
    maxReconnectAttempts: 5
});

ws.onopen = () => {
    console.log('Connected!');
};

ws.onmessage = (event) => {
    console.log('Message:', event.data);
};
```

## Socket.io (Optional)

**Socket.io** là thư viện mạnh mẽ, cung cấp nhiều tính năng hơn WebSocket API thuần:

### Ưu điểm của Socket.io

- ✅ **Auto fallback**: Tự động fallback về polling nếu WebSocket không khả dụng
- ✅ **Rooms & Namespaces**: Tổ chức clients vào rooms
- ✅ **Automatic reconnection**: Tự động reconnect
- ✅ **Event-based**: Dễ sử dụng với events
- ✅ **Binary support**: Hỗ trợ binary data tốt hơn

### Cài đặt

```bash
# Server
npm install socket.io

# Client
npm install socket.io-client
```

### Ví dụ với Socket.io

**Server (Node.js):**
```javascript
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    // Join room
    socket.on('join-room', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
    });
    
    // Chat message
    socket.on('chat-message', (data) => {
        // Broadcast to room
        io.to(data.room).emit('chat-message', {
            user: data.user,
            message: data.message
        });
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

**Client (JavaScript):**
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected:', socket.id);
    
    // Join room
    socket.emit('join-room', 'general');
});

socket.on('chat-message', (data) => {
    console.log(`${data.user}: ${data.message}`);
});

// Gửi message
function sendMessage(user, message, room) {
    socket.emit('chat-message', {
        user: user,
        message: message,
        room: room
    });
}
```

![Socket.io](/images/posts/networking/socketio.jpg)

*Socket.io - Thư viện mạnh mẽ cho WebSocket*

## Best Practices

### 1. Xử lý lỗi và reconnection

```javascript
const socket = new WebSocket('ws://localhost:8080');

socket.onerror = (error) => {
    console.error('WebSocket error:', error);
    // Implement retry logic
};

socket.onclose = (event) => {
    if (!event.wasClean) {
        // Unexpected close, try to reconnect
        setTimeout(() => {
            // Reconnect logic
        }, 3000);
    }
};
```

### 2. Heartbeat/Ping-Pong

```javascript
// Gửi ping định kỳ để giữ connection alive
setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'ping' }));
    }
}, 30000); // 30 giây
```

### 3. Xử lý message queue

```javascript
class MessageQueue {
    constructor(socket) {
        this.socket = socket;
        this.queue = [];
    }
    
    send(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            // Lưu vào queue
            this.queue.push(message);
        }
    }
    
    flush() {
        while (this.queue.length > 0 && 
               this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(this.queue.shift());
        }
    }
}

const queue = new MessageQueue(socket);
socket.onopen = () => {
    queue.flush(); // Gửi tất cả message đã queue
};
```

### 4. Sử dụng WSS (WebSocket Secure)

```javascript
// ✅ Tốt - Dùng WSS trong production
const socket = new WebSocket('wss://api.example.com');

// ❌ Không tốt - WS không bảo mật
const socket = new WebSocket('ws://api.example.com');
```

## So sánh WebSocket với các giải pháp khác

| Giải pháp | Ưu điểm | Nhược điểm | Use Case |
|-----------|---------|------------|----------|
| **WebSocket** | Real-time, full-duplex, low latency | Phức tạp hơn HTTP | Chat, gaming, live updates |
| **HTTP Polling** | Đơn giản | Không real-time, overhead cao | Simple updates |
| **Server-Sent Events (SSE)** | Đơn giản, auto-reconnect | Chỉ server → client | Notifications, live feeds |
| **Socket.io** | Nhiều tính năng, auto fallback | Cần thư viện, overhead | Production apps |

## Kết luận

Trong bài 10, bạn đã học được:

- ✅ **WebSocket vs HTTP**: So sánh và khi nào dùng cái nào
- ✅ **WebSocket API**: Cách tạo connection, gửi/nhận dữ liệu
- ✅ **WebSocket Events**: onopen, onmessage, onerror, onclose
- ✅ **Chat Application**: Ví dụ thực tế với client và server
- ✅ **Reconnection Logic**: Xử lý kết nối bị ngắt
- ✅ **Socket.io**: Thư viện mạnh mẽ cho WebSocket
- ✅ **Best Practices**: Error handling, heartbeat, message queue

**Best Practices:**
- ✅ Luôn xử lý lỗi và implement reconnection
- ✅ Dùng WSS (WebSocket Secure) trong production
- ✅ Implement heartbeat để giữ connection alive
- ✅ Queue messages khi connection chưa sẵn sàng
- ✅ Xử lý binary data cẩn thận

**Lưu ý quan trọng:**
- WebSocket cần server hỗ trợ
- Connection có thể bị ngắt, cần reconnection logic
- Dùng WSS cho production (bảo mật)
- Socket.io là lựa chọn tốt cho production apps

Với kiến thức về WebSocket, bạn đã sẵn sàng xây dựng các ứng dụng real-time như chat, notifications, live updates và nhiều hơn nữa!

