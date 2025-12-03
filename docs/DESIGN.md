# Tài Liệu Thiết Kế UI/UX

## 1. Phân Tích Website Tham Khảo

### 1.1. dangnghinhxuan.wixsite.com/portfolio
**Đặc điểm nổi bật:**
- ✅ Layout tối giản, tập trung vào nội dung
- ✅ Typography rõ ràng, dễ đọc
- ✅ Navigation đơn giản (Home, About, Résumé, Gallery, Portfolio, Contact)
- ✅ Hero section với tagline ấn tượng: "WORK HARD IN SILENCE, LET SUCCESS MAKE NOISE"
- ✅ Màu sắc nhẹ nhàng, không quá chói
- ✅ Responsive design

**Áp dụng cho dự án:**
- Hero section với tagline ngắn gọn về Network Programming
- Navigation menu tối giản: Home, Blog, About
- Typography: Font sans-serif, dễ đọc
- Spacing rộng rãi, không chật chội

### 1.2. kysubrse.com
**Đặc điểm nổi bật:**
- ✅ Blog layout chuẩn, dễ đọc
- ✅ Sidebar với categories, recent posts, archives
- ✅ Post listing với excerpt và date
- ✅ Typography tối ưu cho đọc (serif cho body text)
- ✅ Dark mode support (có thể)
- ✅ Reading time, word count
- ✅ Tags và categories rõ ràng

**Áp dụng cho dự án:**
- Blog listing page với excerpt
- Categories: Java, JavaScript, Networking
- Reading time indicator
- Date formatting: DD/MM/YYYY (Việt Nam)
- Post navigation (Previous/Next)

---

## 2. Design System

### 2.1. Color Palette

**Light Mode:**
- Primary: `#2c3e50` (Dark blue-gray) - **GIỮ NGUYÊN**
- Secondary: `#007bff` (Bootstrap Blue) - **ĐÃ ĐIỀU CHỈNH** từ #3498db
- Accent: `#e74c3c` (Red - cho links, highlights)
- Background: `#fafafa` (Trắng ngà nhẹ) - **ĐÃ ĐIỀU CHỈNH** từ #ffffff
- Text: `#2c3e50` (Dark gray)
- Text Secondary: `#7f8c8d` (Gray)
- Border: `#ecf0f1` (Light gray)
- **Gradients:** Đã thêm gradient cho header, buttons, cards, và background

**Dark Mode:**
- Primary: `#e4e4e4` (Light gray)
- Secondary: `#5dade2` (Light blue)
- Accent: `#ec7063` (Light red)
- Background: `#1a1a1a` (Dark)
- Text: `#e4e4e4` (Light gray)
- Text Secondary: `#95a5a6` (Medium gray)
- Border: `#2c2c2c` (Dark gray)

*Note: PaperMod theme đã có sẵn color scheme, có thể customize qua CSS variables*

**Lý do điều chỉnh Light Mode:**
- **Secondary (#007bff):** Tươi sáng hơn, hiện đại hơn, tạo cảm giác click mạnh mẽ hơn
- **Background (#fafafa):** Thay vì trắng hoàn toàn, dùng màu trắng ngà nhẹ giúp mắt thoải mái hơn khi đọc lâu
- **Gradients:** Thêm gradient vào các phần tử để tạo chiều sâu và hiện đại hơn

### 2.2. Typography

**Font Stack:**
- Headings: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- Body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- Code: `"Fira Code", "Consolas", "Monaco", monospace`

**Font Sizes:**
- H1: `2.5rem` (40px)
- H2: `2rem` (32px)
- H3: `1.5rem` (24px)
- H4: `1.25rem` (20px)
- Body: `1rem` (16px)
- Small: `0.875rem` (14px)

**Line Height:**
- Headings: `1.2`
- Body: `1.6` (tối ưu cho đọc)

### 2.3. Spacing

**Scale:**
- XS: `0.25rem` (4px)
- SM: `0.5rem` (8px)
- MD: `1rem` (16px)
- LG: `1.5rem` (24px)
- XL: `2rem` (32px)
- XXL: `3rem` (48px)

**Áp dụng:**
- Section padding: `2rem` (32px)
- Paragraph margin: `1rem` (16px)
- Card padding: `1.5rem` (24px)

### 2.4. Components

#### 2.4.1. Header/Navigation
- **Style:** Fixed hoặc sticky top
- **Height:** `60px`
- **Background:** Transparent (light) / Dark (dark mode)
- **Logo/Title:** Left side
- **Menu:** Right side, horizontal
- **Active state:** Underline hoặc bold

#### 2.4.2. Hero Section (Home Page)
- **Layout:** Full width, centered content
- **Height:** `60vh` (viewport height)
- **Content:**
  - Title: "Nguyễn Minh Long"
  - Subtitle: "Sinh viên năm 4 HUTECH"
  - Tagline: "Chia sẻ kiến thức về Lập trình mạng, Java & JavaScript"
  - CTA: "Xem Blog" button

#### 2.4.3. Blog Listing
- **Layout:** Grid hoặc List
- **Card style:**
  - Image (optional): `16:9` ratio
  - Title: H3
  - Excerpt: 2-3 dòng
  - Meta: Date, Reading time, Categories
  - Hover effect: Slight shadow, scale

#### 2.4.4. Post Content
- **Max width:** `800px` (tối ưu đọc)
- **Padding:** `2rem` left/right
- **Typography:** 
  - Headings: Clear hierarchy
  - Code blocks: Syntax highlighting
  - Images: Responsive, centered
  - Blockquotes: Left border, italic

#### 2.4.5. Footer
- **Content:**
  - Copyright: "© 2025 Nguyễn Minh Long"
  - Social links (optional)
  - "Made with Hugo & PaperMod"

---

## 3. Responsive Breakpoints

- **Mobile:** `< 768px`
  - Single column layout
  - Hamburger menu
  - Stacked cards

- **Tablet:** `768px - 1024px`
  - 2-column grid (blog listing)
  - Full navigation

- **Desktop:** `> 1024px`
  - 3-column grid (blog listing, nếu có sidebar)
  - Full features

---

## 4. User Experience (UX)

### 4.1. Navigation Flow
```
Home → Blog → [Post Detail]
  ↓
About
```

### 4.2. Key Interactions
- **Smooth scrolling:** Enabled
- **Page transitions:** Fade in
- **Loading states:** Skeleton screens (nếu cần)
- **Error states:** 404 page đẹp

### 4.3. Accessibility
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Alt text cho images
- ✅ Color contrast ratio ≥ 4.5:1

---

## 5. Customization PaperMod

### 5.1. CSS Overrides
File: `assets/css/custom.css`

```css
:root {
  --theme: rgb(255, 255, 255);
  --entry: rgb(255, 255, 255);
  --primary: rgb(44, 62, 80);
  --secondary: rgb(52, 152, 219);
  --tertiary: rgb(236, 240, 241);
  --content: rgb(44, 62, 80);
  --hljs-bg: rgb(248, 248, 248);
  --code-bg: rgb(248, 248, 248);
  --border: rgb(236, 240, 241);
}

[data-theme="dark"] {
  --theme: rgb(26, 26, 26);
  --entry: rgb(26, 26, 26);
  --primary: rgb(228, 228, 228);
  --secondary: rgb(93, 173, 226);
  --tertiary: rgb(44, 44, 44);
  --content: rgb(228, 228, 228);
  --hljs-bg: rgb(44, 44, 44);
  --code-bg: rgb(44, 44, 44);
  --border: rgb(44, 44, 44);
}
```

### 5.2. Layout Overrides
- Custom `layouts/partials/header.html` (nếu cần)
- Custom `layouts/_default/baseof.html` (nếu cần)

---

## 6. Mockups/Wireframes

### 6.1. Home Page
```
┌─────────────────────────────────────┐
│  [Logo]  Home | Blog | About        │
├─────────────────────────────────────┤
│                                     │
│         Nguyễn Minh Long            │
│    Sinh viên năm 4 HUTECH           │
│                                     │
│  Chia sẻ kiến thức về Lập trình     │
│     mạng, Java & JavaScript         │
│                                     │
│         [Xem Blog →]                │
│                                     │
│  ────────────────────────────────   │
│                                     │
│  Bài viết mới nhất                  │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ Post │ │ Post │ │ Post │        │
│  │  1   │ │  2   │ │  3   │        │
│  └──────┘ └──────┘ └──────┘        │
│                                     │
└─────────────────────────────────────┘
```

### 6.2. Blog Listing Page
```
┌─────────────────────────────────────┐
│  [Logo]  Home | Blog | About        │
├─────────────────────────────────────┤
│  Blog                               │
│  ────────────────────────────────   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ [Image]  Tiêu đề bài viết   │   │
│  │          DD/MM/YYYY • 5 phút│   │
│  │          Excerpt...          │   │
│  │          [Java] [JavaScript] │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ [Image]  Tiêu đề bài viết   │   │
│  │          ...                │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

**Ngày tạo:** 2025-01-XX  
**Người tạo:** Nguyễn Minh Long  
**Phiên bản:** 1.0

