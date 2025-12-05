---
title: "Docker Cơ Bản cho Developer: Containerization từ A đến Z"
date: 2025-01-18
lastmod: 2025-01-18
draft: false
author: "Nguyễn Minh Long"
description: "Hướng dẫn Docker từ cơ bản: container vs VM, Dockerfile, docker-compose, images, volumes, networks, và best practices cho backend/DevOps."
tags:
  - Docker
  - DevOps
  - Container
  - Backend
categories:
  - "Khác/Docker"
featuredImage: "/images/posts/docker/docker-intro.jpg"
featuredImagePreview: "/images/posts/docker/docker-intro-preview.jpg"
toc: true
ShowToc: true
math: false
code: true
hiddenInHomeList: true
---

## Giới thiệu

**Docker** là công cụ containerization phổ biến nhất hiện nay, giúp đóng gói ứng dụng và dependencies vào một container nhẹ, dễ deploy và scale.

![Docker Logo](/images/posts/docker/docker-intro.jpg)

*Docker - Công cụ containerization phổ biến nhất thế giới*

Bài viết này sẽ giới thiệu:

- **Docker là gì?**: Khái niệm containerization và lợi ích
- **Container vs VM**: So sánh Docker với Virtual Machine
- **Dockerfile**: Cách tạo Docker image
- **Docker Compose**: Quản lý multi-container applications
- **Images, Containers, Volumes, Networks**: Các khái niệm cơ bản
- **Best Practices**: Quy trình làm việc hiệu quả với Docker

## Docker là gì?

**Docker** là nền tảng mở để phát triển, vận chuyển và chạy ứng dụng bằng cách sử dụng **containerization**.

### Containerization là gì?

**Containerization** là phương pháp đóng gói ứng dụng cùng với tất cả dependencies (thư viện, runtime, config) vào một **container** độc lập, có thể chạy trên bất kỳ môi trường nào.

### Tại sao cần Docker?

**Vấn đề trước khi có Docker:**

- **"It works on my machine"**: Code chạy trên máy dev nhưng lỗi trên production
- **Cài đặt phức tạp**: Mỗi môi trường cần cài đặt dependencies khác nhau
- **Conflict dependencies**: Ứng dụng A cần Node.js 14, ứng dụng B cần Node.js 18
- **Deploy khó khăn**: Phải cấu hình lại môi trường trên mỗi server

**Docker giải quyết:**

- ✅ **Consistency**: Chạy giống nhau trên mọi môi trường
- ✅ **Isolation**: Mỗi container độc lập, không ảnh hưởng nhau
- ✅ **Portability**: Chạy được trên bất kỳ máy nào có Docker
- ✅ **Scalability**: Dễ dàng scale up/down containers

## Container vs Virtual Machine

![Container vs VM](/images/posts/docker/container-vs-vm.jpg)

*Container vs Virtual Machine - So sánh kiến trúc*

### Virtual Machine (VM)

**VM** chạy một **guest OS** hoàn chỉnh trên **host OS**:

```
┌─────────────────────────────────────┐
│         Application                 │
├─────────────────────────────────────┤
│         Guest OS                    │
├─────────────────────────────────────┤
│         Hypervisor                  │
├─────────────────────────────────────┤
│         Host OS                     │
└─────────────────────────────────────┘
```

**Đặc điểm:**
- Nặng (vài GB)
- Chậm khi khởi động
- Tốn nhiều tài nguyên (RAM, CPU)

### Container

**Container** chia sẻ **host OS kernel**, chỉ đóng gói ứng dụng và dependencies:

```
┌─────────────────────────────────────┐
│    App 1    │    App 2    │  App 3  │
├─────────────────────────────────────┤
│         Docker Engine               │
├─────────────────────────────────────┤
│         Host OS                     │
└─────────────────────────────────────┘
```

**Đặc điểm:**
- Nhẹ (vài MB đến vài trăm MB)
- Khởi động nhanh (vài giây)
- Tiết kiệm tài nguyên

### So sánh

| Tiêu chí | Virtual Machine | Container |
|----------|----------------|-----------|
| Kích thước | Vài GB | Vài MB - vài trăm MB |
| Thời gian khởi động | Vài phút | Vài giây |
| Hiệu năng | Thấp hơn | Cao hơn |
| Isolation | Hoàn toàn | Process-level |
| Sử dụng tài nguyên | Nhiều | Ít |

## Cài đặt Docker

### Windows

1. Tải **Docker Desktop** từ [docker.com](https://www.docker.com/products/docker-desktop)
2. Cài đặt và khởi động lại máy
3. Mở Docker Desktop và đợi khởi động xong
4. Kiểm tra:

```bash
docker --version
# Kết quả: Docker version 24.x.x
```

### macOS

Tương tự Windows, tải Docker Desktop từ [docker.com](https://www.docker.com/products/docker-desktop)

### Linux (Ubuntu/Debian)

```bash
# Cập nhật package index
sudo apt update

# Cài đặt dependencies
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# Thêm Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Thêm Docker repository
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Cài đặt Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

# Kiểm tra
docker --version
```

## Các khái niệm cơ bản

### Image

**Image** là template (khuôn mẫu) để tạo container. Image chứa:
- Application code
- Runtime (Node.js, Java, Python, ...)
- Dependencies
- Configuration

Ví dụ: `node:18`, `nginx:latest`, `mysql:8.0`

### Container

**Container** là instance (thể hiện) của image đang chạy. Một image có thể tạo nhiều containers.

### Dockerfile

**Dockerfile** là file text chứa các lệnh để build image.

### Registry

**Registry** là nơi lưu trữ images. Phổ biến nhất là **Docker Hub** ([hub.docker.com](https://hub.docker.com)).

## Dockerfile cơ bản

Tạo file `Dockerfile` trong thư mục dự án:

```dockerfile
# Sử dụng base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Run application
CMD ["node", "index.js"]
```

### Các lệnh Dockerfile phổ biến

- **FROM**: Chỉ định base image
- **WORKDIR**: Set thư mục làm việc
- **COPY**: Copy file từ host vào container
- **RUN**: Chạy lệnh khi build image
- **EXPOSE**: Khai báo port mà container lắng nghe
- **CMD**: Lệnh chạy khi container start (chỉ có 1 CMD)
- **ENTRYPOINT**: Tương tự CMD nhưng không thể override
- **ENV**: Set environment variable
- **ARG**: Build-time variable

### Build Image

```bash
# Build image
docker build -t my-app:latest .

# Giải thích:
# -t: Tag (tên image)
# .: Context (thư mục hiện tại)
```

### Run Container

```bash
# Chạy container
docker run -d -p 3000:3000 --name my-app my-app:latest

# Giải thích:
# -d: Detached mode (chạy background)
# -p: Port mapping (host:container)
# --name: Tên container
```

## Docker Compose

**Docker Compose** dùng để quản lý multi-container applications.

Tạo file `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # Backend service
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db

  # Database service
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - db-data:/var/lib/postgresql/data

  # Frontend service
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  db-data:
```

### Chạy Docker Compose

```bash
# Start tất cả services
docker-compose up -d

# Stop tất cả services
docker-compose down

# Xem logs
docker-compose logs -f

# Rebuild và start
docker-compose up -d --build
```

## Volumes

**Volumes** dùng để lưu trữ dữ liệu persistent (bền vững) bên ngoài container.

### Tạo Volume

```bash
# Tạo volume
docker volume create my-volume

# Xem danh sách volumes
docker volume ls
```

### Sử dụng Volume

```bash
# Mount volume khi run container
docker run -d -v my-volume:/data --name my-container my-image

# Hoặc mount thư mục host
docker run -d -v /host/path:/container/path --name my-container my-image
```

Trong `docker-compose.yml`:

```yaml
services:
  db:
    image: postgres:15-alpine
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

## Networks

**Networks** cho phép containers giao tiếp với nhau.

### Tạo Network

```bash
# Tạo network
docker network create my-network

# Xem danh sách networks
docker network ls
```

### Kết nối Container với Network

```bash
# Tạo container với network
docker run -d --network my-network --name container1 my-image

# Kết nối container vào network
docker network connect my-network container2
```

Trong `docker-compose.yml`, các services trong cùng file tự động cùng một network:

```yaml
services:
  backend:
    # ...
  db:
    # ...
  # backend và db có thể giao tiếp qua tên service
  # backend có thể kết nối db bằng: db:5432
```

## Các lệnh Docker thường dùng

### Quản lý Images

```bash
# Xem danh sách images
docker images

# Xóa image
docker rmi image-name

# Pull image từ Docker Hub
docker pull node:18

# Tag image
docker tag my-app:latest username/my-app:v1.0
```

### Quản lý Containers

```bash
# Xem danh sách containers đang chạy
docker ps

# Xem tất cả containers (bao gồm đã stop)
docker ps -a

# Stop container
docker stop container-name

# Start container
docker start container-name

# Xóa container
docker rm container-name

# Xem logs
docker logs container-name

# Xem logs real-time
docker logs -f container-name

# Vào trong container
docker exec -it container-name /bin/sh
```

### Cleanup

```bash
# Xóa tất cả containers đã stop
docker container prune

# Xóa tất cả images không dùng
docker image prune -a

# Xóa tất cả (containers, images, volumes, networks)
docker system prune -a --volumes
```

## Ví dụ thực tế

### 1. Node.js Application

**Dockerfile:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

**Build và run:**

```bash
docker build -t my-node-app .
docker run -d -p 3000:3000 --name my-app my-node-app
```

### 2. Java Application

**Dockerfile:**

```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/my-app.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
```

**Build và run:**

```bash
# Build JAR trước
mvn clean package

# Build Docker image
docker build -t my-java-app .

# Run
docker run -d -p 8080:8080 --name my-app my-java-app
```

### 3. Multi-container với Docker Compose

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=mydb
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

## Best Practices

### 1. Sử dụng .dockerignore

Tạo file `.dockerignore` để loại trừ file không cần thiết:

```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.DS_Store
```

### 2. Multi-stage Build

Giảm kích thước image bằng multi-stage build:

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]
```

### 3. Sử dụng specific tags

```dockerfile
# ❌ Không tốt
FROM node:latest

# ✅ Tốt
FROM node:18-alpine
```

### 4. Không chạy container với root user

```dockerfile
FROM node:18-alpine
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs
# ...
```

### 5. Sử dụng health checks

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1
```

### 6. Optimize layer caching

Sắp xếp các lệnh từ ít thay đổi đến nhiều thay đổi:

```dockerfile
# ✅ Tốt: Copy package.json trước, install dependencies
COPY package*.json ./
RUN npm install
COPY . .

# ❌ Không tốt: Copy tất cả trước
COPY . .
RUN npm install
```

## Push Image lên Docker Hub

### 1. Đăng nhập Docker Hub

```bash
docker login
```

### 2. Tag image

```bash
docker tag my-app:latest username/my-app:v1.0
```

### 3. Push image

```bash
docker push username/my-app:v1.0
```

### 4. Pull và run từ Docker Hub

```bash
docker pull username/my-app:v1.0
docker run -d -p 3000:3000 username/my-app:v1.0
```

## Tổng kết

Trong bài viết này, bạn đã học:

- ✅ **Docker là gì**: Containerization và lợi ích
- ✅ **Container vs VM**: So sánh kiến trúc
- ✅ **Cài đặt Docker**: Trên Windows, macOS, Linux
- ✅ **Dockerfile**: Cách tạo Docker image
- ✅ **Docker Compose**: Quản lý multi-container applications
- ✅ **Volumes**: Lưu trữ dữ liệu persistent
- ✅ **Networks**: Giao tiếp giữa containers
- ✅ **Best Practices**: Quy trình làm việc hiệu quả

Docker là công cụ quan trọng cho backend developer và DevOps engineer. Hãy thực hành nhiều để thành thạo!

## Tài liệu tham khảo

- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Best Practices for Writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

