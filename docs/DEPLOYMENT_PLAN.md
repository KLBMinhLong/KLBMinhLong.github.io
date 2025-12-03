# Kế Hoạch Triển Khai (Deployment Plan)

## 1. Tổng Quan

### 1.1. Mục Tiêu
- Tự động hóa quá trình build và deploy website lên GitHub Pages
- Đảm bảo website luôn được cập nhật khi có code mới
- Tối ưu performance và SEO

### 1.2. Công Nghệ
- **CI/CD:** GitHub Actions
- **Hosting:** GitHub Pages
- **Build Tool:** Hugo
- **Branch Strategy:** 
  - `main`: Source code
  - `gh-pages`: Generated static site

---

## 2. Cấu Hình GitHub Pages

### 2.1. Repository Settings
1. Vào **Settings** → **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `gh-pages` / `root`
4. **Custom domain:** (optional) `klbminhlong.github.io`

### 2.2. Repository Structure
```
KLBMinhLong.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions workflow
├── content/              # Source content
├── themes/               # Hugo themes
├── hugo.toml            # Hugo config
└── (other files)
```

---

## 3. GitHub Actions Workflow

### 3.1. File: `.github/workflows/deploy.yml`

**Chức năng:**
- Trigger khi push vào `main` branch
- Checkout code
- Setup Hugo (extended version)
- Build static site
- Deploy lên `gh-pages` branch

**Cấu hình:**
```yaml
name: Deploy Hugo Site to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4

      - name: Build with Hugo
        env:
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 3.2. Alternative: Deploy to gh-pages Branch

Nếu muốn deploy vào branch `gh-pages` thay vì dùng GitHub Pages Actions:

```yaml
name: Deploy Hugo Site

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
          cname: klbminhlong.github.io  # optional
```

---

## 4. Cấu Hình Hugo cho Production

### 4.1. File `hugo.toml`

**Các tham số quan trọng:**
```toml
baseURL = "https://klbminhlong.github.io/"
languageCode = "vi-vn"
defaultContentLanguage = "vi"
title = "Nguyễn Minh Long - Blog"

# Production settings
enableRobotsTXT = true
enableGitInfo = true
enableEmoji = true

# Minification (tự động qua --minify flag)
# hoặc dùng build options
[build]
  writeStats = true

# Sitemap
[sitemap]
  changefreq = "monthly"
  priority = 0.5
  filename = "sitemap.xml"
```

### 4.2. Environment Variables

Có thể sử dụng environment variables:
```bash
# Development
hugo server

# Production
HUGO_ENV=production hugo --minify
```

---

## 5. Quy Trình Deploy

### 5.1. Local Development
```bash
# 1. Clone repository
git clone https://github.com/KLBMinhLong/KLBMinhLong.github.io.git
cd KLBMinhLong.github.io

# 2. Initialize Hugo (nếu chưa có)
hugo new site .

# 3. Add theme
git submodule add https://github.com/adityatelange/hugo-PaperMod themes/PaperMod

# 4. Chạy local server
hugo server -D

# 5. Test build
hugo --minify
```

### 5.2. Commit và Push
```bash
# 1. Tạo/chỉnh sửa content
hugo new posts/bai-viet-moi.md

# 2. Commit changes
git add .
git commit -m "feat: thêm bài viết mới về JavaScript"

# 3. Push lên GitHub
git push origin main

# 4. GitHub Actions tự động build và deploy
```

### 5.3. Verify Deployment
1. Vào **Actions** tab trên GitHub
2. Kiểm tra workflow run
3. Vào **Settings** → **Pages** để xem URL
4. Truy cập: `https://klbminhlong.github.io`

---

## 6. Tối Ưu Performance

### 6.1. Build Optimizations
- **Minify:** `--minify` flag
- **Compress:** Gzip/Brotli (GitHub Pages tự động)
- **Image optimization:** WebP format, lazy loading
- **CSS/JS:** Minify và combine (nếu có custom)

### 6.2. Hugo Build Options
```toml
[build]
  writeStats = true  # Cho webpack/parcel nếu cần

[outputs]
  home = ["HTML", "RSS", "JSON"]  # Tối ưu outputs
```

### 6.3. Caching Strategy
- Static assets: Cache forever
- HTML: Cache với ETag
- Images: Cache với versioning

---

## 7. SEO và Metadata

### 7.1. Sitemap
Hugo tự động tạo `sitemap.xml` tại `/sitemap.xml`

### 7.2. robots.txt
Hugo tự động tạo `robots.txt` nếu `enableRobotsTXT = true`

### 7.3. Open Graph và Twitter Cards
Cấu hình trong `hugo.toml`:
```toml
[params]
  images = ["/images/og-image.jpg"]

[params.social]
  Twitter = "@username"  # nếu có
```

### 7.4. Analytics (Optional)
```toml
[params]
  analytics = { id = "G-XXXXXXXXXX", provider = "google" }
  # hoặc
  # analytics = { id = "plausible.io", provider = "plausible" }
```

---

## 8. Troubleshooting

### 8.1. Build Failures
**Lỗi:** Theme not found
- **Giải pháp:** Đảm bảo theme được add như submodule
```bash
git submodule update --init --recursive
```

**Lỗi:** BaseURL incorrect
- **Giải pháp:** Kiểm tra `baseURL` trong `hugo.toml`
- Development: `baseURL = "http://localhost:1313/"`
- Production: `baseURL = "https://klbminhlong.github.io/"`

### 8.2. Deployment Issues
**Lỗi:** 404 trên GitHub Pages
- **Giải pháp:** 
  - Kiểm tra branch `gh-pages` có tồn tại
  - Kiểm tra `baseURL` trong config
  - Đợi vài phút để GitHub Pages update

**Lỗi:** CSS/JS không load
- **Giải pháp:**
  - Kiểm tra đường dẫn assets (relative vs absolute)
  - Kiểm tra `canonifyURLs` trong config

### 8.3. Performance Issues
- Sử dụng `hugo --minify` khi build
- Optimize images trước khi commit
- Kiểm tra bundle size với Hugo's `--templateMetrics`

---

## 9. Monitoring và Maintenance

### 9.1. Health Checks
- [ ] Website load nhanh (< 3s)
- [ ] Mobile responsive
- [ ] SEO score tốt (Google PageSpeed)
- [ ] Không có broken links
- [ ] RSS feed hoạt động

### 9.2. Regular Updates
- Update Hugo version (quarterly)
- Update theme version (monthly)
- Review và update content (weekly)
- Backup content (regularly)

---

## 10. Security

### 10.1. Best Practices
- ✅ Không commit sensitive data (API keys, passwords)
- ✅ Sử dụng `.gitignore` đúng cách
- ✅ Review code trước khi merge
- ✅ Sử dụng HTTPS (GitHub Pages tự động)

### 10.2. .gitignore
```
# Hugo
/public/
/resources/
.hugo_build.lock

# OS
.DS_Store
Thumbs.db

# Editor
.idea/
.vscode/
*.swp
*.swo
*~

# Environment
.env
.env.local
```

---

## 11. Timeline Triển Khai

### Phase 1: Setup (Tuần 1)
- [ ] Initialize Hugo project
- [ ] Setup theme PaperMod
- [ ] Cấu hình `hugo.toml`
- [ ] Tạo GitHub Actions workflow
- [ ] Test local build

### Phase 2: Content (Tuần 2-3)
- [ ] Tạo trang Home
- [ ] Tạo trang About
- [ ] Tạo trang Blog listing
- [ ] Viết 3-5 bài viết đầu tiên

### Phase 3: Deploy (Tuần 4)
- [ ] Test deployment workflow
- [ ] Fix các lỗi (nếu có)
- [ ] Optimize performance
- [ ] Setup SEO

### Phase 4: Launch (Tuần 5)
- [ ] Final review
- [ ] Deploy production
- [ ] Verify tất cả tính năng
- [ ] Share với bạn bè/giảng viên

---

**Ngày tạo:** 2025-01-XX  
**Người tạo:** Nguyễn Minh Long  
**Phiên bản:** 1.0

