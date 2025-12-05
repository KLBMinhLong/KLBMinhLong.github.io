---
title: "Git Cơ Bản: Hướng Dẫn Sử Dụng Version Control cho Developer"
date: 2025-01-16
lastmod: 2025-01-16
draft: false
author: "Nguyễn Minh Long"
description: "Tìm hiểu Git từ cơ bản: cài đặt, các lệnh quan trọng (init, add, commit, status, log), branching, merging, và workflow thực tế cho developer."
tags:
  - Git
  - Version Control
  - DevOps
  - Basics
categories:
  - "DevOps"
featuredImage: "/images/posts/git/git-intro.jpg"
featuredImagePreview: "/images/posts/git/git-intro-preview.jpg"
toc: true
ShowToc: true
math: false
code: true
hiddenInHomeList: true
---

## Giới thiệu

**Git** là hệ thống quản lý phiên bản (Version Control System - VCS) phổ biến nhất hiện nay. Nếu bạn là developer, việc biết sử dụng Git là **bắt buộc** để quản lý code, làm việc nhóm, và deploy dự án.

![Git Logo](/images/posts/git/git-intro.jpg)

*Git - Hệ thống quản lý phiên bản phổ biến nhất thế giới*

Bài viết này sẽ giới thiệu:

- **Git là gì?**: Khái niệm và lợi ích của version control
- **Cài đặt Git**: Hướng dẫn cài đặt trên Windows, macOS, Linux
- **Các lệnh cơ bản**: `init`, `add`, `commit`, `status`, `log`
- **Branching và Merging**: Làm việc với nhánh (branch) và hợp nhất code
- **Workflow thực tế**: Quy trình làm việc với Git trong dự án thực tế

## Git là gì?

**Git** là một **distributed version control system** (hệ thống quản lý phiên bản phân tán), được tạo bởi Linus Torvalds vào năm 2005 để quản lý source code của Linux kernel.

### Tại sao cần Git?

Trước khi có Git, developer thường gặp các vấn đề:

- **Mất code**: Xóa nhầm file, ghi đè code cũ
- **Không biết ai sửa gì**: Làm việc nhóm rất khó khăn
- **Không thể quay lại phiên bản cũ**: Nếu code mới bị lỗi, không thể khôi phục
- **Conflict khi làm việc nhóm**: Nhiều người sửa cùng một file

Git giải quyết tất cả các vấn đề này:

- **Lưu trữ lịch sử**: Mọi thay đổi đều được ghi lại
- **Làm việc nhóm dễ dàng**: Merge code từ nhiều người
- **Quay lại phiên bản cũ**: Dễ dàng revert về commit trước đó
- **Branching**: Tạo nhánh để phát triển tính năng mới mà không ảnh hưởng code chính

### Repository là gì?

**Repository (repo)** là thư mục chứa dự án và lịch sử thay đổi của Git. Có 2 loại:

- **Local Repository**: Repo trên máy tính của bạn
- **Remote Repository**: Repo trên server (GitHub, GitLab, Bitbucket)

## Cài đặt Git

### Windows

1. Tải Git từ [git-scm.com](https://git-scm.com/download/win)
2. Chạy installer và làm theo hướng dẫn
3. Mở **Git Bash** hoặc **PowerShell** để kiểm tra:

```bash
git --version
# Kết quả: git version 2.x.x
```

### macOS

Sử dụng Homebrew:

```bash
brew install git
```

Hoặc tải từ [git-scm.com](https://git-scm.com/download/mac)

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install git
```

### Cấu hình Git lần đầu

Sau khi cài đặt, cần cấu hình tên và email:

```bash
git config --global user.name "Nguyễn Minh Long"
git config --global user.email "nguyenminhlongcntt@gmail.com"
```

Kiểm tra cấu hình:

```bash
git config --list
```

## Các lệnh Git cơ bản

### 1. Khởi tạo Repository: `git init`

Tạo một Git repository mới trong thư mục hiện tại:

```bash
# Tạo thư mục dự án
mkdir my-project
cd my-project

# Khởi tạo Git repository
git init
# Kết quả: Initialized empty Git repository in D:/my-project/.git/
```

Sau lệnh này, Git sẽ tạo thư mục `.git` (ẩn) để lưu trữ metadata và lịch sử.

### 2. Kiểm tra trạng thái: `git status`

Xem trạng thái của repository:

```bash
git status
```

Ví dụ output:

```
On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        index.html
        style.css

nothing added to commit but untracked files present (use "git add" to track)
```

### 3. Thêm file vào staging area: `git add`

Trước khi commit, cần **stage** (thêm vào staging area) các file:

```bash
# Thêm một file cụ thể
git add index.html

# Thêm tất cả file trong thư mục hiện tại
git add .

# Thêm tất cả file (bao gồm cả file đã xóa)
git add -A
```

**Staging area** là vùng trung gian giữa working directory và repository. Bạn có thể chọn file nào muốn commit.

### 4. Commit: `git commit`

**Commit** là hành động lưu snapshot của code tại một thời điểm:

```bash
git commit -m "Thêm trang chủ và style CSS"
```

Luôn viết **commit message rõ ràng** để dễ dàng tìm lại sau này:

```bash
# ❌ Không tốt
git commit -m "sửa lỗi"

# ✅ Tốt
git commit -m "Sửa lỗi hiển thị menu trên mobile"
```

### 5. Xem lịch sử: `git log`

Xem danh sách các commit:

```bash
git log
```

Output:

```
commit abc123def456 (HEAD -> main)
Author: Nguyễn Minh Long <nguyenminhlongcntt@gmail.com>
Date:   Mon Jan 16 14:30:00 2025 +0700

    Thêm trang chủ và style CSS

commit 789ghi012jkl
Author: Nguyễn Minh Long <nguyenminhlongcntt@gmail.com>
Date:   Mon Jan 16 10:15:00 2025 +0700

    Khởi tạo dự án
```

Xem log dạng compact:

```bash
git log --oneline
# Kết quả:
# abc123d Thêm trang chủ và style CSS
# 789ghi0 Khởi tạo dự án
```

### 6. Xem thay đổi: `git diff`

Xem sự khác biệt giữa working directory và staging area:

```bash
git diff
```

Xem thay đổi đã được stage:

```bash
git diff --staged
```

## Workflow cơ bản với Git

Quy trình làm việc cơ bản với Git:

```
1. Tạo/sửa file
   ↓
2. git add <file>     (Stage file)
   ↓
3. git commit -m "..." (Lưu snapshot)
   ↓
4. Lặp lại từ bước 1
```

Ví dụ thực tế:

```bash
# 1. Tạo file mới
echo "# My Project" > README.md

# 2. Kiểm tra trạng thái
git status

# 3. Thêm file vào staging
git add README.md

# 4. Commit
git commit -m "Thêm file README.md"

# 5. Xem lịch sử
git log --oneline
```

## Branching (Nhánh)

**Branch** là một nhánh độc lập của code, cho phép bạn phát triển tính năng mới mà không ảnh hưởng code chính.

![Git Branching](/images/posts/git/git-branching.jpg)

*Branching - Tạo nhánh để phát triển tính năng mới*

### Tạo và chuyển branch

```bash
# Tạo branch mới
git branch feature-login

# Chuyển sang branch mới
git checkout feature-login

# Hoặc tạo và chuyển cùng lúc
git checkout -b feature-login
```

### Xem danh sách branch

```bash
git branch
# Kết quả:
# * feature-login
#   main
```

Dấu `*` chỉ branch hiện tại.

### Merge branch

Khi hoàn thành tính năng, merge branch vào `main`:

```bash
# Chuyển về branch main
git checkout main

# Merge branch feature-login vào main
git merge feature-login

# Xóa branch đã merge (tùy chọn)
git branch -d feature-login
```

### Git Flow phổ biến

Quy trình làm việc với branch:

1. **main/master**: Code chính, luôn ổn định
2. **develop**: Branch phát triển
3. **feature/xxx**: Branch cho tính năng mới
4. **hotfix/xxx**: Branch sửa lỗi khẩn cấp

Ví dụ:

```bash
# Tạo branch cho tính năng đăng nhập
git checkout -b feature/user-login

# Làm việc trên branch này
# ... code, commit ...

# Merge vào main khi hoàn thành
git checkout main
git merge feature/user-login
```

## Undo và Revert

### Undo file chưa stage

Nếu bạn sửa file nhưng chưa `git add`, có thể khôi phục:

```bash
# Khôi phục một file
git checkout -- index.html

# Khôi phục tất cả file
git checkout -- .
```

### Unstage file

Nếu đã `git add` nhưng muốn bỏ stage:

```bash
git reset HEAD index.html
```

### Undo commit (giữ thay đổi)

Nếu commit nhầm nhưng muốn giữ thay đổi:

```bash
git reset --soft HEAD~1
```

Lệnh này sẽ:
- Xóa commit cuối cùng
- Giữ thay đổi trong staging area
- Bạn có thể sửa và commit lại

### Undo commit (xóa thay đổi)

Nếu muốn xóa hoàn toàn commit và thay đổi:

```bash
git reset --hard HEAD~1
```

⚠️ **Cảnh báo**: Lệnh này sẽ **xóa vĩnh viễn** thay đổi, chỉ dùng khi chắc chắn!

## .gitignore

File `.gitignore` cho phép Git bỏ qua các file/folder không cần track:

```bash
# Tạo file .gitignore
touch .gitignore
```

Nội dung `.gitignore` phổ biến:

```gitignore
# Dependencies
node_modules/
vendor/

# Build outputs
dist/
build/
*.class

# Environment variables
.env
.env.local

# IDE
.idea/
.vscode/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
```

## Best Practices

### 1. Commit thường xuyên

Commit thường xuyên với message rõ ràng:

```bash
# ✅ Tốt: Commit nhỏ, message rõ ràng
git commit -m "Thêm validation cho form đăng nhập"
git commit -m "Sửa lỗi hiển thị trên mobile"

# ❌ Không tốt: Commit quá lớn
git commit -m "Sửa nhiều thứ"
```

### 2. Không commit file nhạy cảm

Không commit:
- Password, API keys
- File `.env` chứa thông tin nhạy cảm
- File build không cần thiết

### 3. Sử dụng branch cho tính năng mới

Luôn tạo branch mới khi phát triển tính năng:

```bash
git checkout -b feature/new-feature
# ... làm việc ...
git checkout main
git merge feature/new-feature
```

### 4. Viết commit message tốt

Format commit message:

```
<type>: <subject>

<body>

<footer>
```

Ví dụ:

```
feat: Thêm chức năng đăng nhập

- Thêm form đăng nhập
- Validate email và password
- Xử lý lỗi khi đăng nhập sai

Closes #123
```

## Tổng kết

Trong bài viết này, bạn đã học:

- ✅ **Git là gì**: Hệ thống quản lý phiên bản phân tán
- ✅ **Cài đặt Git**: Trên Windows, macOS, Linux
- ✅ **Các lệnh cơ bản**: `init`, `add`, `commit`, `status`, `log`, `diff`
- ✅ **Branching**: Tạo, chuyển, merge branch
- ✅ **Undo và Revert**: Khôi phục thay đổi
- ✅ **Best Practices**: Quy trình làm việc hiệu quả

Ở bài tiếp theo, chúng ta sẽ tìm hiểu về **GitHub và GitLab** - các nền tảng để lưu trữ code trên cloud và làm việc nhóm.

## Tài liệu tham khảo

- [Git Official Documentation](https://git-scm.com/doc)
- [Git Tutorial - Atlassian](https://www.atlassian.com/git/tutorials)
- [Learn Git Branching](https://learngitbranching.js.org/) - Interactive tutorial

