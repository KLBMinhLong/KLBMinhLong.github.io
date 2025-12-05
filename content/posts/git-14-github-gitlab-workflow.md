---
title: "Quy Trình Làm Việc với GitHub và GitLab: Từ Local đến Remote"
date: 2025-01-18
lastmod: 2025-01-18
draft: false
author: "Nguyễn Minh Long"
description: "Hướng dẫn làm việc với GitHub và GitLab: clone repository, push/pull, pull requests, merge requests, issues, và quy trình làm việc nhóm hiệu quả."
tags:
  - Git
  - GitHub
  - GitLab
  - Version Control
  - DevOps
  - Workflow
categories:
  - "Khác/Git"
featuredImage: "/images/posts/github/github-gitlab-intro.jpg"
featuredImagePreview: "/images/posts/github/github-gitlab-intro-preview.jpg"
toc: true
ShowToc: true
math: false
code: true
hiddenInHomeList: true
---

## Giới thiệu

Sau khi học Git cơ bản ở bài trước, bài này sẽ hướng dẫn bạn làm việc với **GitHub** và **GitLab** - các nền tảng lưu trữ code trên cloud và hỗ trợ làm việc nhóm.

![GitHub và GitLab](/images/posts/github/github-gitlab-intro.jpg)

*GitHub và GitLab - Nền tảng lưu trữ code và cộng tác phổ biến nhất*

Bài viết này sẽ giới thiệu:

- **GitHub vs GitLab**: So sánh hai nền tảng
- **Remote Repository**: Kết nối local repo với remote
- **Push và Pull**: Đồng bộ code giữa local và remote
- **Pull Request / Merge Request**: Quy trình review code
- **Issues và Project Management**: Quản lý công việc
- **CI/CD cơ bản**: Tự động hóa build và deploy

## GitHub vs GitLab

### GitHub

**GitHub** là nền tảng lưu trữ code phổ biến nhất thế giới, được Microsoft mua lại vào 2018.

**Ưu điểm:**
- Cộng đồng lớn nhất
- Nhiều open source projects
- GitHub Actions (CI/CD tích hợp)
- GitHub Pages (hosting static website)

**Nhược điểm:**
- Free plan có giới hạn private repos (trước đây)
- Một số tính năng nâng cao cần trả phí

### GitLab

**GitLab** là nền tảng tự host được, phù hợp cho doanh nghiệp.

**Ưu điểm:**
- Self-hosted (tự host server riêng)
- CI/CD tích hợp mạnh mẽ
- Free plan không giới hạn private repos
- Phù hợp cho doanh nghiệp

**Nhược điểm:**
- Cộng đồng nhỏ hơn GitHub
- UI/UX có thể phức tạp hơn

### Nên chọn cái nào?

- **GitHub**: Nếu bạn làm open source, học tập, hoặc muốn cộng đồng lớn
- **GitLab**: Nếu bạn cần self-hosted, làm việc trong doanh nghiệp, hoặc cần CI/CD mạnh

## Tạo tài khoản và Repository

### Tạo tài khoản GitHub

1. Truy cập [github.com](https://github.com)
2. Click **Sign up**
3. Điền thông tin và xác thực email
4. Chọn plan (Free plan đủ dùng cho hầu hết trường hợp)

### Tạo Repository trên GitHub

1. Click nút **New** (hoặc dấu `+` ở góc trên bên phải)
2. Điền thông tin:
   - **Repository name**: Tên repo (ví dụ: `my-project`)
   - **Description**: Mô tả ngắn
   - **Public/Private**: Chọn public (ai cũng xem được) hoặc private
   - **Initialize with README**: Tích nếu muốn tạo file README.md sẵn
3. Click **Create repository**

### Tạo Repository trên GitLab

1. Truy cập [gitlab.com](https://gitlab.com)
2. Đăng ký tài khoản tương tự
3. Click **New project** → **Create blank project**
4. Điền thông tin tương tự GitHub

## Kết nối Local với Remote

### Clone Repository

Nếu repository đã tồn tại trên GitHub/GitLab, bạn có thể **clone** về máy:

```bash
# Clone qua HTTPS
git clone https://github.com/username/repo-name.git

# Clone qua SSH (cần cấu hình SSH key trước)
git clone git@github.com:username/repo-name.git

# Clone vào thư mục cụ thể
git clone https://github.com/username/repo-name.git my-folder
```

### Thêm Remote cho Repository Local

Nếu bạn đã có repo local và muốn push lên GitHub:

```bash
# 1. Tạo repo trên GitHub (không tích "Initialize with README")

# 2. Thêm remote
git remote add origin https://github.com/username/repo-name.git

# 3. Kiểm tra remote
git remote -v
# Kết quả:
# origin  https://github.com/username/repo-name.git (fetch)
# origin  https://github.com/username/repo-name.git (push)
```

### Push code lên Remote

Sau khi thêm remote, push code lên:

```bash
# Push branch main lên origin
git push -u origin main

# Lần sau chỉ cần:
git push
```

**Giải thích:**
- `-u origin main`: Set upstream branch, lần sau chỉ cần `git push`
- `origin`: Tên remote (mặc định là `origin`)
- `main`: Tên branch muốn push

### Pull code từ Remote

Khi có thay đổi trên remote, pull về local:

```bash
# Pull và merge
git pull

# Hoặc pull riêng, merge riêng
git fetch origin
git merge origin/main
```

## Branch và Remote

### Push branch mới lên Remote

```bash
# Tạo branch mới
git checkout -b feature/new-feature

# Push branch lên remote
git push -u origin feature/new-feature
```

### Xem branch trên Remote

```bash
# Xem tất cả branch (local và remote)
git branch -a

# Chỉ xem remote branch
git branch -r
```

### Xóa branch trên Remote

```bash
# Xóa branch trên remote
git push origin --delete feature/old-feature
```

## Pull Request / Merge Request

**Pull Request (PR)** trên GitHub hoặc **Merge Request (MR)** trên GitLab là cách đề xuất merge code từ một branch vào branch chính.

![Pull Request Workflow](/images/posts/github/pull-request-workflow.jpg)

*Pull Request - Quy trình review code trước khi merge*

### Quy trình Pull Request

1. **Tạo branch mới** cho tính năng:
   ```bash
   git checkout -b feature/user-authentication
   ```

2. **Code và commit**:
   ```bash
   # ... code ...
   git add .
   git commit -m "Thêm chức năng đăng nhập"
   ```

3. **Push branch lên remote**:
   ```bash
   git push -u origin feature/user-authentication
   ```

4. **Tạo Pull Request trên GitHub**:
   - Vào repository trên GitHub
   - Click **Compare & pull request**
   - Điền title và description
   - Chọn reviewer (nếu có)
   - Click **Create pull request**

5. **Review và Merge**:
   - Reviewer xem code và comment
   - Sửa code nếu cần (push thêm commit)
   - Khi approved, click **Merge pull request**

### Best Practices cho Pull Request

**Title rõ ràng:**
```
✅ Tốt: "Thêm chức năng đăng nhập với email/password"
❌ Không tốt: "Update"
```

**Description chi tiết:**
```markdown
## Mô tả
Thêm chức năng đăng nhập với email và password.

## Thay đổi
- Thêm form đăng nhập
- Validate email và password
- Xử lý lỗi khi đăng nhập sai

## Screenshots
[Ảnh minh họa nếu có]

## Checklist
- [x] Code đã test
- [x] Không có lỗi console
- [x] Responsive trên mobile
```

## Issues và Project Management

### Tạo Issue

**Issue** dùng để:
- Báo lỗi (bug report)
- Đề xuất tính năng mới (feature request)
- Hỏi đáp (question)
- Theo dõi công việc (task)

**Tạo Issue trên GitHub:**

1. Vào repository → tab **Issues**
2. Click **New issue**
3. Chọn template (Bug report, Feature request, ...)
4. Điền thông tin:
   - **Title**: Tiêu đề ngắn gọn
   - **Description**: Mô tả chi tiết
   - **Labels**: Gắn nhãn (bug, enhancement, ...)
   - **Assignees**: Gán người xử lý
   - **Milestone**: Gán milestone (nếu có)

### Labels và Milestones

**Labels** giúp phân loại issues:
- `bug`: Lỗi cần sửa
- `enhancement`: Tính năng mới
- `documentation`: Cần cập nhật tài liệu
- `help wanted`: Cần sự giúp đỡ

**Milestones** nhóm các issues theo mục tiêu:
- "Version 1.0"
- "Sprint 1"
- "Q1 2025"

### Liên kết Issue với Commit

Trong commit message, có thể reference issue:

```bash
git commit -m "Sửa lỗi hiển thị menu

Fixes #123"
```

Khi merge PR, GitHub sẽ tự động đóng issue #123.

## Fork và Contribute

### Fork Repository

**Fork** là tạo bản copy của repository về tài khoản của bạn:

1. Vào repository muốn fork
2. Click nút **Fork**
3. Chọn tài khoản để fork vào

Sau khi fork, bạn có thể:
- Clone về máy và chỉnh sửa
- Tạo Pull Request để contribute lại repo gốc

### Quy trình Contribute

1. **Fork repository** về tài khoản của bạn
2. **Clone fork** về máy:
   ```bash
   git clone https://github.com/your-username/repo-name.git
   ```
3. **Thêm upstream** (repo gốc):
   ```bash
   git remote add upstream https://github.com/original-owner/repo-name.git
   ```
4. **Tạo branch mới**:
   ```bash
   git checkout -b fix-bug-123
   ```
5. **Code và commit**
6. **Push lên fork**:
   ```bash
   git push -u origin fix-bug-123
   ```
7. **Tạo Pull Request** từ fork về repo gốc

## CI/CD cơ bản

**CI/CD** (Continuous Integration / Continuous Deployment) tự động hóa build, test, và deploy.

### GitHub Actions

GitHub Actions cho phép tạo workflow tự động:

Tạo file `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
```

### GitLab CI/CD

GitLab sử dụng file `.gitlab-ci.yml`:

```yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - npm install
    - npm run build
  only:
    - main

test:
  stage: test
  script:
    - npm test
  only:
    - main

deploy:
  stage: deploy
  script:
    - echo "Deploy to production"
  only:
    - main
```

## SSH Keys

Thay vì dùng HTTPS (cần nhập password mỗi lần), có thể dùng **SSH keys**:

### Tạo SSH Key

```bash
# Tạo SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Nhấn Enter để dùng default location
# Nhập passphrase (hoặc Enter để bỏ qua)
```

### Thêm SSH Key vào GitHub

1. Copy public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

2. Vào GitHub → **Settings** → **SSH and GPG keys**
3. Click **New SSH key**
4. Paste public key và lưu

### Test SSH Connection

```bash
ssh -T git@github.com
# Kết quả: Hi! username! You've successfully authenticated...
```

## Best Practices

### 1. Commit message rõ ràng

```bash
# ✅ Tốt
git commit -m "feat: Thêm chức năng đăng nhập"
git commit -m "fix: Sửa lỗi hiển thị trên mobile"

# ❌ Không tốt
git commit -m "update"
git commit -m "sửa lỗi"
```

### 2. Pull trước khi Push

Luôn pull trước khi push để tránh conflict:

```bash
git pull
git push
```

### 3. Sử dụng Branch cho mỗi tính năng

```bash
# ✅ Tốt
git checkout -b feature/new-feature
# ... code ...
git push -u origin feature/new-feature

# ❌ Không tốt: Push trực tiếp lên main
git checkout main
# ... code ...
git push
```

### 4. Review code trước khi Merge

Luôn tạo Pull Request và review code trước khi merge vào `main`.

### 5. Sử dụng Issues để track công việc

Tạo issue cho mỗi task, và reference issue trong commit/PR.

## Tổng kết

Trong bài viết này, bạn đã học:

- ✅ **GitHub vs GitLab**: So sánh hai nền tảng
- ✅ **Remote Repository**: Kết nối local với remote
- ✅ **Push và Pull**: Đồng bộ code
- ✅ **Pull Request / Merge Request**: Quy trình review code
- ✅ **Issues**: Quản lý công việc
- ✅ **Fork và Contribute**: Đóng góp cho open source
- ✅ **CI/CD cơ bản**: Tự động hóa build và deploy
- ✅ **SSH Keys**: Xác thực không cần password

Ở bài tiếp theo, chúng ta sẽ tìm hiểu về **Docker** - công cụ containerization giúp đóng gói và deploy ứng dụng dễ dàng hơn.

## Tài liệu tham khảo

- [GitHub Documentation](https://docs.github.com/)
- [GitLab Documentation](https://docs.gitlab.com/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [GitLab Flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html)

