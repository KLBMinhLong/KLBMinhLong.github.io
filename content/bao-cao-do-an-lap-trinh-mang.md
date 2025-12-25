---
title: "ĐỒ ÁN MÔN HỌC LẬP TRÌNH MẠNG"
subtitle: "Phát triển Blog cá nhân chia sẻ về lập trình mạng"
date: 2025-01-01
draft: false
type: "page"
showToc: true
---

# ĐỒ ÁN MÔN HỌC LẬP TRÌNH MẠNG

## LỜI NÓI ĐẦU

Ngày nay, với sự phát triển mạnh mẽ của công nghệ thông tin, việc chia sẻ kiến thức trở nên quan trọng hơn bao giờ hết. Blog cá nhân đã trở thành một công cụ hiệu quả để các lập trình viên, sinh viên IT chia sẻ kinh nghiệm, kiến thức và kết nối với cộng đồng.

Lập trình mạng (Network Programming) là một lĩnh vực quan trọng trong ngành Công nghệ Thông tin, đòi hỏi kiến thức sâu về các giao thức mạng, socket programming, và kiến trúc hệ thống phân tán. Việc xây dựng một blog cá nhân để chia sẻ kiến thức về lập trình mạng không chỉ giúp bản thân củng cố kiến thức mà còn đóng góp vào cộng đồng lập trình viên.

Đồ án này tập trung vào việc phát triển một blog cá nhân sử dụng Hugo - một Static Site Generator hiện đại, kết hợp với GitHub Pages để triển khai miễn phí. Blog được thiết kế với giao diện tối giản, dễ đọc, tập trung vào nội dung về lập trình mạng, Java và JavaScript.

Qua quá trình thực hiện đồ án, em đã học được nhiều kiến thức về:
- Static Site Generator và cách hoạt động
- Quản lý phiên bản với Git và GitHub
- Thiết kế giao diện web responsive
- SEO và tối ưu hóa hiệu suất website
- Triển khai website lên GitHub Pages

Em xin chân thành cảm ơn thầy/cô đã hướng dẫn và tạo điều kiện để em hoàn thành đồ án này.

---

## CHƯƠNG 1. TỔNG QUAN VỀ ĐỀ TÀI

### 1.1. Lý do chọn đề tài

**1.1.1. Nhu cầu chia sẻ kiến thức**

Trong quá trình học tập và nghiên cứu về lập trình mạng, em nhận thấy việc chia sẻ kiến thức là một cách hiệu quả để:
- Củng cố và hệ thống hóa kiến thức đã học
- Giúp đỡ các sinh viên và lập trình viên khác
- Xây dựng portfolio cá nhân
- Kết nối với cộng đồng lập trình viên

**1.1.2. Tầm quan trọng của lập trình mạng**

Lập trình mạng là nền tảng của nhiều ứng dụng hiện đại:
- Ứng dụng web và API
- Hệ thống phân tán
- Internet of Things (IoT)
- Cloud Computing
- Real-time applications

**1.1.3. Xu hướng sử dụng Static Site Generator**

Static Site Generator (SSG) đang trở thành xu hướng phổ biến vì:
- Hiệu suất cao, tải trang nhanh
- Bảo mật tốt (không có database)
- Chi phí hosting thấp hoặc miễn phí
- Dễ dàng quản lý với Git
- SEO friendly

### 1.2. Yêu cầu đề tài

**1.2.1. Yêu cầu chức năng**

- Xây dựng blog cá nhân với giao diện đẹp, dễ sử dụng
- Hỗ trợ viết bài viết bằng Markdown
- Hệ thống phân loại bài viết theo categories và tags
- Tìm kiếm nội dung
- Responsive design (tương thích mobile, tablet, desktop)
- Dark mode support
- SEO optimization
- Contact form

**1.2.2. Yêu cầu phi chức năng**

- Hiệu suất: Tải trang < 3 giây
- Bảo mật: Không có lỗ hổng bảo mật
- Khả năng mở rộng: Dễ dàng thêm tính năng mới
- Dễ bảo trì: Code sạch, có tài liệu
- Chi phí: Triển khai miễn phí trên GitHub Pages

**1.2.3. Yêu cầu nội dung**

- Tối thiểu 9 bài viết về lập trình mạng
- Nội dung tập trung vào Java, JavaScript, Network Programming
- Bài viết có code examples và hình ảnh minh họa
- Tất cả nội dung bằng tiếng Việt

### 1.3. Nội dung đề tài

**1.3.1. Phạm vi nghiên cứu**

- Static Site Generator (Hugo)
- Markdown và cấu trúc nội dung
- Git và GitHub workflow
- CSS và responsive design
- SEO và performance optimization

**1.3.2. Nội dung thực hiện**

1. Nghiên cứu và so sánh các Static Site Generator
2. Thiết kế kiến trúc và giao diện blog
3. Cài đặt và cấu hình Hugo
4. Tùy chỉnh theme PaperMod
5. Viết nội dung bài viết về lập trình mạng
6. Tối ưu hóa hiệu suất và SEO
7. Triển khai lên GitHub Pages
8. Kiểm thử và đánh giá

**1.3.3. Kết quả mong đợi**

- Blog cá nhân hoàn chỉnh, chuyên nghiệp
- Tối thiểu 9 bài viết chất lượng về lập trình mạng
- Giao diện đẹp, responsive, hỗ trợ dark mode
- Triển khai thành công lên GitHub Pages
- Tài liệu hướng dẫn sử dụng và phát triển

---

## CHƯƠNG 2. TỔNG QUAN VỀ BLOG VÀ STATIC SITE GENERATOR

### 2.1. Khái niệm về Blog

**2.1.1. Blog là gì?**

Blog (weblog) là một website cá nhân hoặc nhóm, nơi tác giả chia sẻ ý kiến, kinh nghiệm, kiến thức về một hoặc nhiều chủ đề cụ thể. Blog thường được cập nhật thường xuyên và hiển thị các bài viết theo thứ tự thời gian (mới nhất trước).

**2.1.2. Đặc điểm của Blog**

- Nội dung được sắp xếp theo thời gian
- Cho phép người đọc bình luận (tùy chọn)
- Có hệ thống phân loại (categories, tags)
- Dễ dàng tìm kiếm và điều hướng
- RSS feed để đăng ký nhận thông báo

**2.1.3. Lợi ích của Blog cá nhân**

- Xây dựng thương hiệu cá nhân
- Chia sẻ kiến thức và kinh nghiệm
- Kết nối với cộng đồng
- Portfolio cho công việc
- Cải thiện kỹ năng viết và trình bày

### 2.2. Static Site Generator (SSG)

**2.2.1. Khái niệm Static Site Generator**

Static Site Generator là công cụ tạo ra các website tĩnh (static website) từ các file nguồn (thường là Markdown) và templates. Khác với CMS động (như WordPress), SSG tạo ra các file HTML tĩnh trước khi triển khai.

**2.2.2. Ưu điểm của Static Site Generator**

- **Hiệu suất cao**: Không cần xử lý server-side, tải trang cực nhanh
- **Bảo mật tốt**: Không có database, giảm nguy cơ bị tấn công
- **Chi phí thấp**: Có thể host miễn phí trên GitHub Pages, Netlify, Vercel
- **Version control**: Quản lý nội dung bằng Git
- **SEO friendly**: HTML tĩnh dễ dàng được index bởi search engines
- **Dễ backup**: Chỉ cần backup repository Git

**2.2.3. Nhược điểm của Static Site Generator**

- Không có tính năng động (như user login, comments tích hợp)
- Cần rebuild khi có thay đổi nội dung
- Yêu cầu kiến thức kỹ thuật để setup ban đầu

**2.2.4. Các Static Site Generator phổ biến**

- **Hugo**: Nhanh nhất, viết bằng Go
- **Jekyll**: Phổ biến nhất, tích hợp tốt với GitHub Pages
- **Gatsby**: Dựa trên React, phù hợp cho web app
- **Next.js**: Framework React với SSG
- **11ty (Eleventy)**: Đơn giản, linh hoạt

### 2.3. Hugo Framework

**2.3.1. Giới thiệu Hugo**

Hugo là một Static Site Generator mã nguồn mở, được viết bằng ngôn ngữ Go. Hugo được phát hành lần đầu vào năm 2013 và nhanh chóng trở thành một trong những SSG phổ biến nhất.

**2.3.2. Đặc điểm của Hugo**

- **Tốc độ cực nhanh**: Build một website lớn chỉ trong vài giây
- **Không cần database**: Tất cả nội dung được lưu trong file
- **Template engine mạnh mẽ**: Sử dụng Go templates
- **Hỗ trợ Markdown**: Viết nội dung dễ dàng
- **Taxonomy system**: Categories, tags, series
- **Shortcodes**: Tạo các component tái sử dụng
- **Multilingual support**: Hỗ trợ đa ngôn ngữ

**2.3.3. Cấu trúc thư mục Hugo**

```
my-blog/
├── archetypes/          # Templates cho content mới
├── assets/             # CSS, JS, images (để xử lý)
├── content/            # Nội dung bài viết (Markdown)
├── data/               # Data files (YAML, JSON)
├── layouts/            # HTML templates
├── static/             # Static files (images, PDFs)
├── themes/             # Themes
└── hugo.toml           # File cấu hình
```

**2.3.4. Workflow với Hugo**

1. Viết nội dung bằng Markdown trong thư mục `content/`
2. Chạy lệnh `hugo server` để preview local
3. Chạy lệnh `hugo` để build static site
4. Deploy thư mục `public/` lên hosting

### 2.4. GitHub Pages

**2.4.1. Giới thiệu GitHub Pages**

GitHub Pages là dịch vụ hosting miễn phí của GitHub, cho phép publish website tĩnh trực tiếp từ repository GitHub. GitHub Pages hỗ trợ Jekyll và các static site khác.

**2.4.2. Ưu điểm của GitHub Pages**

- **Miễn phí**: Không mất phí hosting
- **Tích hợp Git**: Quản lý version và deploy tự động
- **HTTPS**: Tự động có SSL certificate
- **Custom domain**: Có thể dùng domain riêng
- **CI/CD**: Tự động build và deploy khi push code

**2.4.3. Cách hoạt động**

1. Tạo repository trên GitHub
2. Push code lên repository
3. Cấu hình GitHub Pages trong Settings
4. Website sẽ được publish tại `username.github.io/repository-name`

**2.4.4. GitHub Actions cho Hugo**

GitHub Actions có thể tự động build Hugo site và deploy lên GitHub Pages mỗi khi có commit mới, giúp quy trình làm việc tự động hóa hoàn toàn.

---

## CHƯƠNG 3. KHẢO SÁT VÀ THIẾT KẾ HỆ THỐNG

### 3.1. Phân tích yêu cầu

**3.1.1. Phân tích người dùng**

- **Đối tượng chính**: Sinh viên IT, developers mới bắt đầu
- **Nhu cầu**: Học lập trình mạng, Java, JavaScript
- **Mục tiêu**: Tìm kiếm kiến thức thực tế, dễ hiểu

**3.1.2. Phân tích chức năng**

- **Hiển thị bài viết**: Danh sách bài viết, chi tiết bài viết
- **Phân loại**: Categories, tags
- **Tìm kiếm**: Tìm kiếm nội dung
- **Liên hệ**: Contact form
- **Giới thiệu**: Trang About
- **Chứng chỉ**: Hiển thị các chứng chỉ đã đạt được

**3.1.3. Phân tích phi chức năng**

- **Performance**: Tải trang < 3s
- **Responsive**: Hoạt động tốt trên mọi thiết bị
- **SEO**: Tối ưu cho search engines
- **Accessibility**: Tuân thủ WCAG guidelines
- **Maintainability**: Code dễ bảo trì

### 3.2. Kiến trúc hệ thống

**3.2.1. Kiến trúc tổng quan**

```
┌─────────────────┐
│   Content       │  (Markdown files)
│   (Markdown)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Hugo          │  (Build process)
│   Generator     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Static HTML   │  (Generated files)
│   Files         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   GitHub Pages  │  (Hosting)
│   (CDN)         │
└─────────────────┘
```

**3.2.2. Cấu trúc dữ liệu**

- **Posts**: Bài viết blog (Markdown)
- **Categories**: Danh mục bài viết
- **Tags**: Thẻ phân loại
- **Pages**: Trang tĩnh (About, Contact)
- **Assets**: Hình ảnh, CSS, JS

**3.2.3. Luồng xử lý**

1. Developer viết nội dung Markdown
2. Commit và push lên GitHub
3. GitHub Actions tự động build Hugo
4. Deploy static files lên GitHub Pages
5. User truy cập website qua browser

### 3.3. Công nghệ sử dụng

**3.3.1. Backend/Generator**

- **Hugo** (v0.120+): Static Site Generator
- **Go**: Ngôn ngữ lập trình của Hugo

**3.3.2. Frontend**

- **HTML5**: Cấu trúc website
- **CSS3**: Styling và responsive design
- **JavaScript**: Tương tác người dùng (tối thiểu)
- **PaperMod Theme**: Theme base cho Hugo

**3.3.3. Tools & Services**

- **Git**: Version control
- **GitHub**: Repository hosting và GitHub Pages
- **GitHub Actions**: CI/CD automation
- **Markdown**: Format viết nội dung

**3.3.4. Libraries & Frameworks**

- **Fuse.js** (optional): Client-side search
- **EmailJS** (optional): Contact form handling

### 3.4. Thiết kế giao diện

**3.4.1. Design Principles**

- **Minimalist**: Tối giản, tập trung vào nội dung
- **Readability**: Dễ đọc, typography rõ ràng
- **Consistency**: Nhất quán về màu sắc, spacing
- **Accessibility**: Dễ truy cập cho mọi người

**3.4.2. Color Palette**

- **Light Mode**: 
  - Background: #f5f5f2 (Kem nhạt)
  - Text: #000000 (Đen)
  - Accent: #7ab8ff (Xanh nhẹ)
  
- **Dark Mode**:
  - Background: #050509 (Đen)
  - Text: #ffffff (Trắng)
  - Accent: #8ac4ff (Xanh sáng)

**3.4.3. Typography**

- **Font Family**: System fonts (San Francisco, Segoe UI, Roboto)
- **Headings**: 2.5rem (H1), 2rem (H2), 1.5rem (H3)
- **Body**: 1rem, line-height 1.6

**3.4.4. Layout Components**

- **Header**: Logo, navigation menu, search
- **Hero Section**: Giới thiệu ngắn gọn
- **Content Area**: Bài viết, sidebar (optional)
- **Footer**: Links, social media, copyright

**3.4.5. Responsive Breakpoints**

- **Mobile**: < 768px (Single column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (Full layout)

---

## CHƯƠNG 4. XÂY DỰNG VÀ TRIỂN KHAI BLOG

### 4.1. Cài đặt môi trường phát triển

**4.1.1. Cài đặt Hugo**

*Hình 4.1: Download Hugo từ trang chủ*

Để cài đặt Hugo trên Windows:

1. Truy cập https://gohugo.io/installation/
2. Download Hugo Extended (phiên bản mở rộng)
3. Giải nén và thêm vào PATH
4. Kiểm tra cài đặt: `hugo version`

*Hình 4.2: Kiểm tra phiên bản Hugo*

**4.1.2. Cài đặt Git**

1. Download Git từ https://git-scm.com/
2. Cài đặt với các tùy chọn mặc định
3. Cấu hình user name và email:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

**4.1.3. Tạo GitHub Repository**

1. Đăng nhập GitHub
2. Tạo repository mới: `username.github.io`
3. Clone repository về máy local

### 4.2. Cấu hình Hugo và Theme

**4.2.1. Khởi tạo dự án Hugo**

```bash
hugo new site my-blog
cd my-blog
```

*Hình 4.3: Cấu trúc thư mục sau khi khởi tạo*

**4.2.2. Cài đặt Theme PaperMod**

```bash
git submodule add https://github.com/adityatelange/hugo-PaperMod themes/PaperMod
```

Cấu hình theme trong `hugo.toml`:
```toml
theme = "PaperMod"
```

*Hình 4.4: Cấu hình theme trong hugo.toml*

**4.2.3. Cấu hình cơ bản**

File `hugo.toml`:
```toml
baseURL = "https://username.github.io/"
languageCode = "vi-vn"
title = "Lập Trình Mạng - MLBlog"
theme = "PaperMod"

[params]
  description = "Blog chia sẻ về lập trình mạng"
  defaultTheme = "dark"
```

*Hình 4.5: File cấu hình hugo.toml*

**4.2.4. Tạo custom CSS**

Tạo file `assets/css/extended/custom.css` để override theme styles.

*Hình 4.6: Cấu trúc thư mục assets*

### 4.3. Xây dựng nội dung

**4.3.1. Tạo trang Home**

File `content/_index.md`:
```markdown
---
title: "Home"
type: "page"
---

## Chứng chỉ nổi bật
[Section hiển thị chứng chỉ]

## Bài viết mới
[Section hiển thị bài viết mới nhất]
```

*Hình 4.7: Trang Home*

**4.3.2. Tạo trang About**

File `content/about.md`:
```markdown
---
title: "Về tôi"
type: "page"
---

## Giới thiệu
[Thông tin cá nhân]

## Kỹ năng
[Danh sách kỹ năng]

## Chứng chỉ
[Danh sách chứng chỉ]
```

*Hình 4.8: Trang About*

**4.3.3. Tạo trang Contact**

File `content/contact.md`:
```markdown
---
title: "Liên hệ"
type: "contact"
---

[Contact form và thông tin liên hệ]
```

*Hình 4.9: Trang Contact*

**4.3.4. Viết bài viết**

Tạo bài viết mới:
```bash
hugo new posts/ten-bai-viet.md
```

Cấu trúc front matter:
```yaml
---
title: "Tiêu đề bài viết"
date: 2025-01-01
tags:
  - Java
  - JavaScript
  - Networking
categories:
  - "Lập trình mạng"
toc: true
---
```

*Hình 4.10: Cấu trúc bài viết Markdown*

**4.3.5. Danh sách bài viết đã viết**

1. Giới thiệu về JavaScript và Môi trường Chạy
2. Biến, Kiểu Dữ Liệu và Toán Tử trong JavaScript
3. Functions và Scope trong JavaScript
4. Objects và Arrays trong JavaScript
5. Asynchronous JavaScript: Promises và Async/Await
6. ES6+ Features: Modules, Classes và More
7. Giới thiệu về Lập trình Mạng (Network Programming)
8. Lập trình Socket trong Java: TCP Server/Client
9. HTTP và RESTful API với Java
10. WebSocket trong JavaScript: Real-time Communication
11. Xử lý JSON trong Java và JavaScript
12. CORS và Các Vấn đề Bảo Mật trong Web Development
13. Git cơ bản
14. GitHub và GitLab Workflow
15. Docker cơ bản

*Hình 4.11: Danh sách bài viết trên trang Blog*

### 4.4. Tùy chỉnh giao diện

**4.4.1. Custom Layout**

Tạo custom layout trong `layouts/` để override theme:
- `layouts/partials/header.html`: Tùy chỉnh header
- `layouts/partials/footer.html`: Tùy chỉnh footer
- `layouts/partials/hero.html`: Hero section

*Hình 4.12: Custom layouts*

**4.4.2. Styling với CSS**

File `assets/css/extended/custom.css`:
```css
:root {
  --theme: #f5f5f2;
  --primary: #000000;
  --accent: #7ab8ff;
}

/* Custom styles */
.hero-section {
  /* Hero styling */
}
```

*Hình 4.13: Custom CSS*

**4.4.3. Responsive Design**

Sử dụng media queries:
```css
@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 1rem;
  }
}
```

*Hình 4.14: Responsive trên mobile*

**4.4.4. Dark Mode**

Theme PaperMod hỗ trợ dark mode tự động. Có thể tùy chỉnh màu sắc trong CSS variables.

*Hình 4.15: Dark mode*

### 4.5. Triển khai lên GitHub Pages

**4.5.1. Cấu hình GitHub Actions**

Tạo file `.github/workflows/deploy.yml`:
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
      - uses: actions/checkout@v3
      - uses: actions/setup-go@v4
      - run: go install github.com/gohugoio/hugo@latest
      - run: hugo --minify
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

*Hình 4.16: GitHub Actions workflow*

**4.5.2. Build và Test Local**

```bash
hugo server -D
```

Truy cập http://localhost:1313 để preview.

*Hình 4.17: Preview local*

**4.5.3. Deploy**

1. Commit và push code:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. GitHub Actions tự động build và deploy

3. Website sẽ có tại: `https://username.github.io`

*Hình 4.18: Website đã deploy*

**4.5.4. Custom Domain (Optional)**

1. Mua domain
2. Cấu hình DNS records
3. Thêm file `CNAME` vào repository
4. Cấu hình trong GitHub Pages settings

*Hình 4.19: Cấu hình custom domain*

---

## CHƯƠNG 5. KẾT LUẬN

### 5.1. Những kiến thức đạt được

Qua quá trình thực hiện đồ án "Phát triển Blog cá nhân chia sẻ về lập trình mạng", em đã đạt được những kiến thức và kỹ năng sau:

**5.1.1. Kiến thức về Static Site Generator**

- Hiểu được cách hoạt động của Static Site Generator
- Nắm vững cấu trúc và workflow của Hugo
- Biết cách sử dụng Markdown để viết nội dung
- Hiểu về template system và shortcodes

**5.1.2. Kỹ năng phát triển web**

- Thiết kế và phát triển giao diện responsive
- Sử dụng CSS để tùy chỉnh theme
- Tối ưu hóa hiệu suất website
- SEO optimization

**5.1.3. Kỹ năng quản lý dự án**

- Sử dụng Git và GitHub để quản lý version
- Thiết lập CI/CD với GitHub Actions
- Tổ chức cấu trúc dự án khoa học
- Viết tài liệu và comment code

**5.1.4. Kiến thức về lập trình mạng**

- Củng cố kiến thức qua việc viết bài
- Hệ thống hóa các khái niệm đã học
- Tạo tài liệu tham khảo cho bản thân

**5.1.5. Kỹ năng mềm**

- Kỹ năng viết và trình bày
- Tư duy thiết kế và UX
- Giải quyết vấn đề (troubleshooting)

### 5.2. Định hướng tương lai

**5.2.1. Phát triển blog**

- Tiếp tục viết thêm bài viết chất lượng
- Mở rộng chủ đề: C++, React, DevOps
- Thêm tính năng: Comments system, Newsletter
- Tối ưu hóa SEO để tăng traffic

**5.2.2. Nâng cao kỹ năng**

- Học thêm về web performance optimization
- Nghiên cứu về Progressive Web App (PWA)
- Tìm hiểu về headless CMS
- Học thêm về design patterns

**5.2.3. Ứng dụng kiến thức**

- Áp dụng kiến thức vào các dự án thực tế
- Xây dựng portfolio cá nhân
- Tham gia các dự án open source
- Chia sẻ kinh nghiệm với cộng đồng

**5.2.4. Mục tiêu dài hạn**

- Trở thành một technical writer
- Xây dựng thương hiệu cá nhân trong lĩnh vực lập trình mạng
- Đóng góp vào cộng đồng lập trình viên Việt Nam
- Phát triển sự nghiệp trong lĩnh vực Network Programming

---

## TÀI LIỆU THAM KHẢO

1. Hugo Documentation. (2024). *Hugo - The world's fastest framework for building websites*. https://gohugo.io/documentation/

2. PaperMod Theme. (2024). *Hugo PaperMod Theme*. https://github.com/adityatelange/hugo-PaperMod

3. GitHub Pages Documentation. (2024). *GitHub Pages*. https://docs.github.com/en/pages

4. Markdown Guide. (2024). *Markdown Guide*. https://www.markdownguide.org/

5. MDN Web Docs. (2024). *Web technologies for developers*. https://developer.mozilla.org/

6. W3Schools. (2024). *HTML, CSS, JavaScript Tutorials*. https://www.w3schools.com/

7. Stack Overflow. (2024). *Community Q&A for developers*. https://stackoverflow.com/

8. Cisco Networking Academy. (2024). *Networking Basics Course*. https://www.netacad.com/

9. Oracle Java Documentation. (2024). *Java Platform, Standard Edition Documentation*. https://docs.oracle.com/en/java/

10. Mozilla Developer Network. (2024). *JavaScript Guide*. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide

11. RFC 2616. (1999). *Hypertext Transfer Protocol -- HTTP/1.1*. https://tools.ietf.org/html/rfc2616

12. RFC 6455. (2011). *The WebSocket Protocol*. https://tools.ietf.org/html/rfc6455

---

**Lưu ý:** Đây là bản draft của báo cáo. Các hình ảnh minh họa sẽ được thêm vào sau khi hoàn thành việc chụp màn hình và tạo diagram. Các thông tin như tên giảng viên, MSSV, lớp sẽ được điền đầy đủ khi nộp báo cáo chính thức.

