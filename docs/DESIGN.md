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

### 2.1. Color Palette - Minimalist (Trắng, Đen, Xám)

**Light Mode:**
- Primary: `#000000` (Đen - cho text chính, headings)
- Secondary: `#333333` (Xám đậm - cho links, buttons, hover states)
- Accent: `#666666` (Xám vừa - cho highlights, hover effects)
- Background: `#ffffff` (Trắng - background chính)
- Text: `#000000` (Đen - text chính)
- Text Secondary: `#666666` (Xám - text phụ, metadata)
- Border: `#e0e0e0` (Xám nhạt - borders, dividers)
- Header Background: `#1a1a1a` (Đen - header background)
- Status Background: `#f5f5f5` (Xám rất nhạt - status boxes)

**Dark Mode:**
- Primary: `#ffffff` (Trắng - cho text chính, headings)
- Secondary: `#cccccc` (Xám sáng - cho links, buttons, hover states)
- Accent: `#999999` (Xám vừa - cho highlights, hover effects)
- Background: `#000000` (Đen - background chính)
- Text: `#ffffff` (Trắng - text chính)
- Text Secondary: `#999999` (Xám - text phụ, metadata)
- Border: `#333333` (Xám đậm - borders, dividers)
- Header Background: `#1a1a1a` (Xám đen - header background)
- Status Background: `#0a0a0a` (Đen đậm - status boxes)

**Nguyên tắc:**
- ✅ Chỉ sử dụng trắng, đen, và các tông xám
- ✅ Không sử dụng màu sắc rực rỡ (xanh, đỏ, vàng, etc.)
- ✅ Tập trung vào typography và spacing thay vì màu sắc
- ✅ Tối giản, chuyên nghiệp, dễ đọc

*Note: PaperMod theme đã có sẵn color scheme, có thể customize qua CSS variables để áp dụng palette minimalist này*

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
- **Background:**
  - Light mode: Đen (`#1a1a1a`) với text trắng
  - Dark mode: Xám đen (`#1a1a1a`) với text trắng
- **Content:**
  - Title: "Nguyễn Minh Long" (màu trắng, font lớn)
  - Subtitle: "Sinh viên năm 4 HUTECH" (màu xám sáng)
  - Tagline: "Chia sẻ kiến thức về Lập trình mạng, Java & JavaScript" (màu xám sáng)
  - CTA: Button với border, hover đổi màu background

#### 2.4.3. Blog Listing
- **Layout:** Grid hoặc List
- **Card style:**
  - Background: Trắng (light) / Đen (dark)
  - Border: Xám nhạt (light) / Xám đậm (dark)
  - Image (optional): `16:9` ratio, grayscale filter (nếu cần)
  - Title: H3, màu primary (đen/trắng)
  - Excerpt: 2-3 dòng, màu text secondary (xám)
  - Meta: Date, Reading time, Categories - màu text secondary
  - Hover effect: Border đổi màu secondary, slight scale

#### 2.4.4. Post Content
- **Max width:** `800px` (tối ưu đọc)
- **Padding:** `2rem` left/right
- **Background:** Trắng (light) / Đen (dark)
- **Typography:** 
  - Headings: Màu primary (đen/trắng), clear hierarchy
  - Body text: Màu text chính (đen/trắng)
  - Links: Màu text chính với underline, hover đổi màu secondary
  - Code blocks: Background xám nhạt (light) / xám đen (dark), syntax highlighting grayscale
  - Images: Responsive, centered, có thể thêm border xám nhạt
  - Blockquotes: Left border màu secondary (xám), italic, background xám rất nhạt

#### 2.4.5. Footer
- **Background:** Trắng (light) / Đen (dark)
- **Border:** Top border màu border (xám nhạt/xám đậm)
- **Content:**
  - Copyright: "© 2025 Nguyễn Minh Long" - màu text secondary (xám)
  - Social links (optional) - màu text secondary, hover đổi màu secondary
  - "Made with Hugo & PaperMod" - màu text secondary

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

### 5.1. CSS Overrides - Minimalist Palette
File: `assets/css/custom.css`

```css
:root {
  /* Light Mode - Minimalist: Trắng, Đen, Xám */
  --theme: rgb(255, 255, 255);
  --entry: rgb(255, 255, 255);
  --primary: rgb(0, 0, 0);              /* Đen */
  --secondary: rgb(51, 51, 51);         /* Xám đậm */
  --tertiary: rgb(224, 224, 224);       /* Xám nhạt */
  --content: rgb(0, 0, 0);              /* Đen - text chính */
  --hljs-bg: rgb(245, 245, 245);        /* Xám rất nhạt - code background */
  --code-bg: rgb(245, 245, 245);
  --border: rgb(224, 224, 224);         /* Xám nhạt - borders */
}

[data-theme="dark"] {
  /* Dark Mode - Minimalist: Đen, Trắng, Xám */
  --theme: rgb(0, 0, 0);
  --entry: rgb(0, 0, 0);
  --primary: rgb(255, 255, 255);        /* Trắng */
  --secondary: rgb(204, 204, 204);      /* Xám sáng */
  --tertiary: rgb(51, 51, 51);          /* Xám đậm */
  --content: rgb(255, 255, 255);        /* Trắng - text chính */
  --hljs-bg: rgb(26, 26, 26);           /* Xám đen - code background */
  --code-bg: rgb(26, 26, 26);
  --border: rgb(51, 51, 51);            /* Xám đậm - borders */
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

