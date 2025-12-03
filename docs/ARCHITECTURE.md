# Tài Liệu Kiến Trúc Hệ Thống

## 1. Tổng Quan Dự Án

### 1.1. Mục Tiêu
- **Tên dự án:** Personal Portfolio & Tech Blog
- **Repository:** `KLBMinhLong.github.io`
- **Mục đích:** Trang blog cá nhân chia sẻ kiến thức về Lập trình mạng, Java và JavaScript
- **Đối tượng:** Sinh viên năm 4 HUTECH - Nguyễn Minh Long

### 1.2. Yêu Cầu Chức Năng
- ✅ Trang Home (Trang chủ)
- ✅ Trang Blog (Danh sách bài viết)
- ✅ Trang About/Profile (Giới thiệu cá nhân)
- ✅ Trang chi tiết bài viết
- ✅ Tối thiểu 9 bài post về Java & JavaScript
- ✅ Dark Mode support
- ✅ Responsive design
- ✅ SEO-friendly

### 1.3. Yêu Cầu Phi Chức Năng
- **Performance:** Tải trang nhanh (< 3s)
- **Accessibility:** Tuân thủ WCAG 2.1 Level AA
- **SEO:** Tối ưu meta tags, structured data
- **Maintainability:** Code sạch, dễ bảo trì
- **Style:** Tối giản, đẹp mắt (Minimalist & Beautiful)

---

## 2. Kiến Trúc Kỹ Thuật

### 2.1. Tech Stack

#### Static Site Generator
- **Hugo** (v0.120+)
  - Lý do: Nhanh, hỗ trợ tốt cho blog, cộng đồng lớn
  - Template engine: Go Templates
  - Content format: Markdown

#### Theme
- **PaperMod** (v6.0+)
  - Lý do: 
    - Tối giản, đẹp mắt
    - Hỗ trợ Dark Mode
    - Fast loading
    - SEO-friendly
    - Responsive
    - Có sẵn các tính năng: search, reading time, table of contents

#### Hosting & Deployment
- **GitHub Pages**
  - Repository: `KLBMinhLong.github.io`
  - Branch: `main` (source) → `gh-pages` (deployed)
  - CI/CD: GitHub Actions

#### Version Control
- **Git**
  - Workflow: Feature branch → Main branch
  - Commit convention: Conventional Commits

---

## 3. Cấu Trúc Thư Mục

```
KLBMinhLong.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── archetypes/                 # Hugo content templates
│   └── default.md
├── assets/                     # Custom CSS/JS (nếu cần)
│   └── css/
│       └── custom.css
├── content/                    # Nội dung website
│   ├── _index.md              # Trang Home
│   ├── about.md               # Trang About/Profile
│   └── posts/                 # Thư mục bài viết
│       ├── _index.md          # Trang Blog listing
│       ├── javascript-essentials-1.md
│       ├── javascript-essentials-2.md
│       ├── networking-basics.md
│       └── ... (9+ bài viết)
├── data/                      # Data files (YAML/JSON)
├── layouts/                   # Custom layouts (override theme)
│   └── partials/
├── public/                    # Generated static site (gitignore)
├── resources/                 # Hugo resources cache
├── static/                    # Static files (images, PDFs, etc.)
│   ├── images/
│   │   ├── profile/
│   │   └── certificates/
│   └── favicon.ico
├── docs/                      # Tài liệu dự án
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   ├── CONTENT_STRUCTURE.md
│   └── DEPLOYMENT_PLAN.md
├── hugo.toml                  # Hugo configuration
├── .gitignore
├── LICENSE
└── README.md
```

---

## 4. Cấu Hình Hugo

### 4.1. File `hugo.toml`

**Các tham số chính:**
- `baseURL`: `https://klbminhlong.github.io/`
- `title`: Tên website
- `theme`: `PaperMod`
- `languageCode`: `vi-vn`
- `defaultContentLanguage`: `vi`

**PaperMod Parameters:**
- `ShowReadingTime`: `true`
- `ShowPostNavLinks`: `true`
- `ShowBreadCrumbs`: `true`
- `ShowCodeCopyButtons`: `true`
- `ShowWordCount`: `true`
- `ShowRssButtonInSectionTermList`: `true`
- `UseHugoToc`: `true`
- `DisableSpecial1stPost`: `false`
- `DisableScrollToTop`: `false`
- `comments`: `false` (có thể bật sau)
- `assets`: Custom CSS/JS paths

**Menu Structure:**
```toml
[[menu.main]]
  identifier = "home"
  name = "Home"
  url = "/"
  weight = 10

[[menu.main]]
  identifier = "blog"
  name = "Blog"
  url = "/posts/"
  weight = 20

[[menu.main]]
  identifier = "about"
  name = "About"
  url = "/about/"
  weight = 30
```

---

## 5. Workflow Development

### 5.1. Local Development
```bash
# Cài đặt Hugo
# Windows: choco install hugo-extended
# hoặc download từ https://gohugo.io

# Clone theme
git submodule add https://github.com/adityatelange/hugo-PaperMod themes/PaperMod

# Chạy local server
hugo server -D

# Build static site
hugo
```

### 5.2. Content Creation
1. Tạo bài viết mới: `hugo new posts/tieu-de-bai-viet.md`
2. Chỉnh sửa front matter
3. Viết nội dung Markdown
4. Preview local: `hugo server -D`
5. Commit & Push

### 5.3. Deployment
- Tự động qua GitHub Actions
- Trigger: Push vào branch `main`
- Build: `hugo --minify`
- Deploy: Push vào branch `gh-pages`

---

## 6. Tính Năng Mở Rộng (Future)

- [ ] Comments system (Giscus/GitHub Discussions)
- [ ] Search functionality (Fuse.js)
- [ ] Analytics (Google Analytics hoặc Plausible)
- [ ] RSS Feed
- [ ] Sitemap.xml
- [ ] Contact form
- [ ] Tags & Categories filtering
- [ ] Related posts
- [ ] Reading progress indicator

---

## 7. Tài Liệu Tham Khảo

- [Hugo Documentation](https://gohugo.io/documentation/)
- [PaperMod Theme](https://github.com/adityatelange/hugo-PaperMod)
- [GitHub Pages](https://pages.github.com/)
- [Markdown Guide](https://www.markdownguide.org/)

---

**Ngày tạo:** 2025-01-XX  
**Người tạo:** Nguyễn Minh Long  
**Phiên bản:** 1.0

