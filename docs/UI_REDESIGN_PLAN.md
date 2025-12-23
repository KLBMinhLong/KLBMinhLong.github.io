# Kế Hoạch Viết Lại Giao Diện Blog
## Tài Liệu Chuẩn Bị Toàn Diện

> **Phiên bản:** 1.0  
> **Ngày tạo:** 23/12/2025  
> **Mục đích:** Chuẩn bị cho việc thiết kế lại toàn diện giao diện blog cá nhân

---

## 📋 Mục Lục

1. [Phân Tích Hiện Trạng](#1-phân-tích-hiện-trạng)
2. [Mục Tiêu Cải Thiện](#2-mục-tiêu-cải-thiện)
3. [Kiến Trúc Kỹ Thuật](#3-kiến-trúc-kỹ-thuật)
4. [Hệ Thống Màu Sắc Mới](#4-hệ-thống-màu-sắc-mới)
5. [Bố Cục và Layout](#5-bố-cục-và-layout)
6. [Hiệu Ứng và Animation](#6-hiệu-ứng-và-animation)
7. [Thư Viện UI Đề Xuất](#7-thư-viện-ui-đề-xuất)
8. [Typography và Fonts](#8-typography-và-fonts)
9. [Components Cần Thiết Kế](#9-components-cần-thiết-kế)
10. [Responsive Design Strategy](#10-responsive-design-strategy)
11. [Performance Optimization](#11-performance-optimization)
12. [Roadmap Triển Khai](#12-roadmap-triển-khai)
13. [Checklist Hoàn Thành](#13-checklist-hoàn-thành)

---

## 1. Phân Tích Hiện Trạng

### 1.1. Điểm Mạnh Hiện Tại

✅ **Tốc độ tải trang:** Hugo tạo static site nhanh  
✅ **Responsive:** Đã có media queries cho mobile  
✅ **Theme mode:** Hỗ trợ light/dark mode  
✅ **Cấu trúc code:** Rõ ràng, dễ maintain  
✅ **SEO friendly:** Static HTML tốt cho SEO

### 1.2. Vấn Đề Cần Cải Thiện

#### 🎨 Màu Sắc
- ❌ Đơn điệu, thiếu màu accent nổi bật
- ❌ Không có gradient hay màu sắc hiện đại
- ❌ Contrast chưa tối ưu cho accessibility
- ❌ Dark mode hơi "phẳng", thiếu chiều sâu

#### 📐 Bố Cục
- ❌ Spacing giữa các section chưa đồng nhất
- ❌ Sidebar chưa được tận dụng tốt
- ❌ Card layout có thể cải thiện với grid hiện đại
- ❌ Typography hierarchy chưa rõ ràng
- ❌ Hero section thiếu tính thu hút

#### ✨ Hiệu Ứng
- ❌ Animation quá cơ bản
- ❌ Thiếu micro-interactions
- ❌ Không có loading animations
- ❌ Hover effects đơn điệu
- ❌ Scroll animations chưa có

### 1.3. Phân Tích Đối Thủ

**Blog Modern Tốt:**
- [dev.to](https://dev.to) - Card grid, màu sắc vibrant
- [Medium](https://medium.com) - Typography đẹp, spacing tốt
- [GitHub Blog](https://github.blog) - Clean, professional
- [Vercel Blog](https://vercel.com/blog) - Gradient backgrounds, smooth animations

---

## 2. Mục Tiêu Cải Thiện

### 2.1. Mục Tiêu Chính

🎯 **Tăng engagement:** Giữ người đọc lâu hơn 30%  
🎯 **Cải thiện UX:** Điều hướng rõ ràng hơn, dễ sử dụng  
🎯 **Hiện đại hóa:** Design trend 2024-2025  
🎯 **Accessibility:** WCAG 2.1 AA compliance  
🎯 **Performance:** Lighthouse score > 95

### 2.2. Nguyên Tắc Thiết Kế

1. **Minimalism với Purpose:** Đơn giản nhưng có chủ đích
2. **Content First:** Nội dung là trung tâm
3. **Progressive Enhancement:** Hoạt động tốt trên mọi thiết bị
4. **Accessibility:** Dễ tiếp cận cho mọi người
5. **Performance:** Nhanh, không hy sinh tốc độ vì UI

---

## 3. Kiến Trúc Kỹ Thuật

### 3.1. Tech Stack Hiện Tại

```
├── Hugo (Static Site Generator)
├── PaperMod Theme (Base)
├── Custom CSS (/assets/css/extended/custom.css)
├── Vanilla JavaScript
└── GitHub Pages (Hosting)
```

### 3.2. Tech Stack Mới (Đề Xuất)

```
├── Hugo (giữ nguyên)
├── CSS Architecture
│   ├── CSS Variables (cho theming)
│   ├── CSS Grid & Flexbox
│   ├── Container Queries (modern layout)
│   └── CSS Animations
├── JavaScript Libraries
│   ├── AOS.js (Animate On Scroll) - 3KB gzipped
│   ├── Swiper.js (nếu cần carousel) - 6KB core
│   └── Vanilla JS (custom interactions)
├── Icon System
│   ├── Lucide Icons (SVG sprites) hoặc
│   ├── Phosphor Icons
└── Optional Enhancements
    ├── GSAP (advanced animations)
    └── Lottie (micro-animations)
```

### 3.3. Cấu Trúc File Mới

```
assets/
├── css/
│   ├── extended/
│   │   ├── 00-variables.css       (màu sắc, spacing)
│   │   ├── 01-base.css             (reset, typography)
│   │   ├── 02-layout.css           (grid, containers)
│   │   ├── 03-components.css       (buttons, cards)
│   │   ├── 04-animations.css       (keyframes)
│   │   ├── 05-utilities.css        (helper classes)
│   │   └── custom.css              (imports all)
├── js/
│   ├── animations.js               (AOS, scroll effects)
│   ├── theme-toggle.js             (dark mode)
│   ├── search.js                   (search functionality)
│   └── utils.js                    (helpers)
└── fonts/
    └── (web fonts nếu cần)
```

---

## 4. Hệ Thống Màu Sắc Mới

### 4.1. Light Mode Palette

```css
:root {
  /* Primary Colors */
  --color-primary: #0F172A;           /* Slate 900 - Text chính */
  --color-secondary: #475569;         /* Slate 600 - Text phụ */
  
  /* Accent Colors */
  --color-accent-blue: #3B82F6;       /* Blue 500 - Links, CTAs */
  --color-accent-purple: #8B5CF6;     /* Purple 500 - Highlights */
  --color-accent-cyan: #06B6D4;       /* Cyan 500 - Secondary accent */
  
  /* Background Colors */
  --color-bg-primary: #FFFFFF;        /* Trắng */
  --color-bg-secondary: #F8FAFC;      /* Slate 50 */
  --color-bg-tertiary: #F1F5F9;       /* Slate 100 */
  
  /* Surface Colors (for cards) */
  --color-surface: #FFFFFF;
  --color-surface-hover: #F8FAFC;
  
  /* Border Colors */
  --color-border-light: #E2E8F0;      /* Slate 200 */
  --color-border-medium: #CBD5E1;     /* Slate 300 */
  
  /* Status Colors */
  --color-success: #10B981;           /* Green 500 */
  --color-warning: #F59E0B;           /* Amber 500 */
  --color-error: #EF4444;             /* Red 500 */
  
  /* Gradients */
  --gradient-hero: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-card: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  --gradient-accent: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
}
```

### 4.2. Dark Mode Palette

```css
[data-theme="dark"] {
  /* Primary Colors */
  --color-primary: #F8FAFC;           /* Slate 50 - Text chính */
  --color-secondary: #CBD5E1;         /* Slate 300 - Text phụ */
  
  /* Accent Colors */
  --color-accent-blue: #60A5FA;       /* Blue 400 */
  --color-accent-purple: #A78BFA;     /* Purple 400 */
  --color-accent-cyan: #22D3EE;       /* Cyan 400 */
  
  /* Background Colors */
  --color-bg-primary: #0F172A;        /* Slate 900 */
  --color-bg-secondary: #1E293B;      /* Slate 800 */
  --color-bg-tertiary: #334155;       /* Slate 700 */
  
  /* Surface Colors */
  --color-surface: #1E293B;
  --color-surface-hover: #334155;
  
  /* Border Colors */
  --color-border-light: #334155;      /* Slate 700 */
  --color-border-medium: #475569;     /* Slate 600 */
  
  /* Gradients */
  --gradient-hero: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-card: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
}
```

### 4.3. Semantic Colors

```css
:root {
  /* Text */
  --text-primary: var(--color-primary);
  --text-secondary: var(--color-secondary);
  --text-accent: var(--color-accent-blue);
  
  /* Backgrounds */
  --bg-page: var(--color-bg-primary);
  --bg-surface: var(--color-surface);
  
  /* Interactive */
  --interactive-default: var(--color-accent-blue);
  --interactive-hover: var(--color-accent-purple);
  --interactive-active: #2563EB; /* Blue 600 */
}
```

---

## 5. Bố Cục và Layout

### 5.1. Grid System

```css
/* Container System */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-inline: 1.5rem;
}

.container-narrow {
  max-width: 800px; /* Cho bài viết */
}

.container-wide {
  max-width: 1440px; /* Cho homepage */
}

/* Grid Layouts */
.grid {
  display: grid;
  gap: var(--spacing-6);
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.grid-4 {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

### 5.2. Spacing System (8pt Grid)

```css
:root {
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-5: 1.5rem;    /* 24px */
  --spacing-6: 2rem;      /* 32px */
  --spacing-8: 3rem;      /* 48px */
  --spacing-10: 4rem;     /* 64px */
  --spacing-12: 6rem;     /* 96px */
}
```

### 5.3. Layout Components

#### Header (Navigation)
```
┌─────────────────────────────────────────┐
│  [Logo]  [Menu Items]      [Search] [🌙]│
└─────────────────────────────────────────┘
```

- **Height:** 80px
- **Sticky:** Có, với blur backdrop
- **Shadow:** Subtle shadow khi scroll

#### Hero Section (Homepage)
```
┌─────────────────────────────────────────┐
│                                         │
│   [Text Content]        [Image/Avatar]  │
│   - Title                               │
│   - Tagline                            │
│   - CTA Button                         │
│                                         │
└─────────────────────────────────────────┘
```

- **Layout:** CSS Grid 60/40 split
- **Background:** Gradient với pattern subtle
- **Animation:** Fade in + slide up

#### Blog Grid (Homepage)
```
┌───────┐ ┌───────┐ ┌───────┐
│ Card1 │ │ Card2 │ │ Card3 │
│ Image │ │ Image │ │ Image │
│ Title │ │ Title │ │ Title │
│ Meta  │ │ Meta  │ │ Meta  │
└───────┘ └───────┘ └───────┘
```

- **Grid:** 3 columns desktop, 1 column mobile
- **Gap:** 2rem
- **Hover:** Lift effect + shadow

#### Single Post Layout
```
┌─────────────────────────────────────────┐
│              [Title]                    │
│              [Meta]                     │
├─────────────────────────────────────────┤
│                                         │
│         [Content - max 800px]          │
│                                         │
└─────────────────────────────────────────┘
```

- **Max-width:** 800px (optimal reading)
- **Line-height:** 1.7 (dễ đọc)
- **Sidebar:** Floating TOC bên phải (optional)

### 5.4. Sidebar Strategy

#### Desktop (> 1024px)
```
┌──────┬─────────────────┬──────┐
│      │                 │      │
│ Ads/ │   Main Content  │ TOC/ │
│ Links│                 │ Info │
│      │                 │      │
└──────┴─────────────────┴──────┘
  20%        60%           20%
```

#### Tablet/Mobile
- Sidebar collapse thành drawer
- TOC sticky ở bottom sheet
- Hamburger menu

---

## 6. Hiệu Ứng và Animation

### 6.1. Animation Principles

1. **Timing:** 300ms cho micro, 600ms cho macro
2. **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out)
3. **Performance:** Transform & opacity only (GPU accelerated)
4. **Respect:** `prefers-reduced-motion`

### 6.2. Core Animations

#### Scroll Animations (với AOS.js)

```html
<!-- Fade in -->
<div data-aos="fade-up" data-aos-duration="600">

<!-- Slide in -->
<div data-aos="slide-left" data-aos-delay="200">

<!-- Zoom in -->
<div data-aos="zoom-in" data-aos-once="true">
```

#### Hover Effects

```css
/* Card Lift */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

/* Button Ripple (CSS only) */
.button {
  position: relative;
  overflow: hidden;
}

.button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.button:active::after {
  width: 300px;
  height: 300px;
}
```

#### Loading States

```css
/* Skeleton Loading */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-bg-secondary) 25%,
    var(--color-bg-tertiary) 50%,
    var(--color-bg-secondary) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Spinner */
.spinner {
  border: 3px solid var(--color-bg-tertiary);
  border-top-color: var(--color-accent-blue);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

#### Page Transitions

```css
/* Fade transition giữa các trang */
@keyframes pageEnter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-content {
  animation: pageEnter 0.6s ease-out;
}
```

### 6.3. Micro-interactions

- **Link hover:** Underline slide effect
- **Button click:** Scale down briefly
- **Form focus:** Glow effect
- **Image load:** Blur-up technique
- **Scroll progress:** Progress bar at top

---

## 7. Thư Viện UI Đề Xuất

### 7.1. Animation Libraries

#### ⭐ AOS (Animate On Scroll)
```html
<!-- CDN -->
<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script>AOS.init();</script>
```

**Ưu điểm:**
- Nhẹ (3.4KB gzipped)
- Dễ sử dụng
- Performance tốt
- Responsive

**Use cases:**
- Cards fade in khi scroll
- Sections slide in
- Images zoom in

#### 🎯 GSAP (GreenSock) - Optional
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
```

**Ưu điểm:**
- Powerful, smooth animations
- Good performance
- Timeline control

**Use cases:**
- Hero animations phức tạp
- SVG animations
- Parallax effects

**Nhược điểm:**
- Lớn hơn (16KB core)
- Overkill nếu chỉ cần basic animations

### 7.2. UI Component Libraries (Chọn 1)

#### Option 1: Vanilla CSS (Recommended)
- ✅ Lightweight
- ✅ Full control
- ✅ No dependencies
- ⚠️ Cần viết nhiều code hơn

#### Option 2: DaisyUI + TailwindCSS
```bash
npm install -D tailwindcss daisyui
```

**Ưu điểm:**
- Components đẹp sẵn
- Theming dễ
- Utility-first CSS

**Nhược điểm:**
- Bundle size lớn hơn
- Build step phức tạp

#### Option 3: PicoCSS (Minimal)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">
```

**Ưu điểm:**
- Rất nhẹ (11KB)
- Semantic HTML
- Dark mode built-in

### 7.3. Icon Libraries

#### ⭐ Lucide Icons (Recommended)
```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="home"></i>
```

- Clean, modern
- 1000+ icons
- Tree-shakeable
- SVG-based

#### Phosphor Icons
```html
<script src="https://unpkg.com/@phosphor-icons/web"></script>
<i class="ph ph-house"></i>
```

- 6 weights
- Consistent design

### 7.4. Other Utilities

#### Swiper.js (Carousel)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

**Use cases:**
- Certificate carousel
- Image galleries
- Testimonials

#### Typed.js (Typing Effect)
```html
<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
```

**Use case:**
- Hero tagline animation

#### Particles.js (Background)
```html
<script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
```

**Use case:**
- Hero background effect

---

## 8. Typography và Fonts

### 8.1. Font Stack

#### Primary Font (Tiếng Việt + Latin)
```css
/* Option 1: Inter (Clean, modern) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Option 2: Plus Jakarta Sans (Rounded, friendly) */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

:root {
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}
```

#### Monospace (Code blocks)
```css
:root {
  --font-mono: 'Fira Code', 'JetBrains Mono', 'Consolas', monospace;
}
```

### 8.2. Type Scale

```css
:root {
  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  --text-6xl: 3.75rem;     /* 60px */
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### 8.3. Typography Classes

```css
.heading-1 {
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
}

.heading-2 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
}

.body-large {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
}

.body {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
}
```

---

## 9. Components Cần Thiết Kế

### 9.1. Buttons

```css
/* Primary Button */
.btn-primary {
  padding: 0.75rem 1.5rem;
  background: var(--gradient-accent);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  border: 2px solid var(--color-accent-blue);
  color: var(--color-accent-blue);
}
```

### 9.2. Cards

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1);
  border-color: var(--color-accent-blue);
}

/* Featured Card */
.card-featured {
  background: var(--gradient-card);
  color: white;
}
```

### 9.3. Forms

```css
.input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid var(--color-border-medium);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--color-accent-blue);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### 9.4. Navigation

```css
.nav {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] .nav {
  background: rgba(15, 23, 42, 0.8);
}
```

### 9.5. Badge/Tag

```css
.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--color-bg-tertiary);
  color: var(--text-secondary);
  border-radius: 9999px;
  font-size: var(--text-sm);
  font-weight: 500;
}

.badge-accent {
  background: rgba(59, 130, 246, 0.1);
  color: var(--color-accent-blue);
}
```

---

## 10. Responsive Design Strategy

### 10.1. Breakpoints

```css
:root {
  --screen-sm: 640px;
  --screen-md: 768px;
  --screen-lg: 1024px;
  --screen-xl: 1280px;
  --screen-2xl: 1536px;
}

/* Mobile First Approach */
@media (min-width: 640px) {  /* sm */ }
@media (min-width: 768px) {  /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### 10.2. Responsive Components

#### Grid Responsive
```css
.grid-responsive {
  display: grid;
  grid-template-columns: 1fr; /* Mobile */
  gap: 1rem;
}

@media (min-width: 768px) {
  .grid-responsive {
    grid-template-columns: repeat(2, 1fr); /* Tablet */
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .grid-responsive {
    grid-template-columns: repeat(3, 1fr); /* Desktop */
    gap: 2rem;
  }
}
```

#### Typography Responsive
```css
.heading-1 {
  font-size: clamp(2rem, 5vw, 3rem);
}

.body {
  font-size: clamp(0.875rem, 1vw, 1rem);
}
```

### 10.3. Mobile Optimizations

- **Touch targets:** Min 44x44px
- **Font size:** Min 16px (tránh zoom trên iOS)
- **Spacing:** Tăng padding/margin
- **Navigation:** Hamburger menu
- **Images:** Lazy loading + responsive sizes

---

## 11. Performance Optimization

### 11.1. CSS Optimization

```css
/* Critical CSS Inline */
<!-- Đưa critical CSS vào <head> -->

/* Non-critical CSS Lazy Load */
<link rel="preload" href="/css/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### 11.2. Image Optimization

```html
<!-- Modern formats với fallback -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" loading="lazy" alt="...">
</picture>

<!-- Responsive images -->
<img 
  srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  src="medium.jpg"
  loading="lazy"
  alt="..."
>
```

### 11.3. JavaScript Optimization

```html
<!-- Defer non-critical JS -->
<script src="animations.js" defer></script>

<!-- Module JS -->
<script type="module" src="app.js"></script>

<!-- Intersection Observer cho lazy loading -->
<script>
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
});
</script>
```

### 11.4. Performance Metrics Goals

| Metric | Target |
|--------|--------|
| First Contentful Paint (FCP) | < 1.8s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to Interactive (TTI) | < 3.8s |
| Total Blocking Time (TBT) | < 200ms |
| Lighthouse Score | > 95 |

---

## 12. Roadmap Triển Khai

### Phase 1: Chuẩn Bị (1-2 tuần)

**Tuần 1: Research & Design**
- [ ] Nghiên cứu design trends 2024-2025
- [ ] Tạo mood board
- [ ] Design wireframes (Figma/Sketch)
- [ ] Chọn color palette
- [ ] Chọn typography

**Tuần 2: Setup & Architecture**
- [ ] Setup CSS architecture (variables, modules)
- [ ] Integrate AOS.js
- [ ] Setup icon system
- [ ] Prepare component library
- [ ] Create style guide

### Phase 2: Core Components (2-3 tuần)

**Tuần 3: Layout & Navigation**
- [ ] Header với sticky nav
- [ ] Footer
- [ ] Container system
- [ ] Grid system
- [ ] Spacing utilities

**Tuần 4: UI Components**
- [ ] Buttons (primary, secondary, ghost)
- [ ] Cards (default, featured, hover states)
- [ ] Forms (inputs, textarea, validation states)
- [ ] Badges/Tags
- [ ] Alerts/Toasts

**Tuần 5: Content Components**
- [ ] Typography styles
- [ ] Code blocks với syntax highlighting
- [ ] Tables (responsive)
- [ ] Blockquotes
- [ ] Lists (ordered, unordered)

### Phase 3: Pages (2-3 tuần)

**Tuần 6: Homepage**
- [ ] Hero section với animation
- [ ] Blog grid với cards
- [ ] Featured posts
- [ ] Certificates section
- [ ] CTA sections

**Tuần 7: Single Post**
- [ ] Post header
- [ ] Content styling
- [ ] Table of contents
- [ ] Share buttons
- [ ] Related posts
- [ ] Comments (nếu có)

**Tuần 8: Other Pages**
- [ ] About page
- [ ] Contact page với form
- [ ] Archive/Blog list
- [ ] Tags/Categories
- [ ] 404 page

### Phase 4: Animations & Polish (1-2 tuần)

**Tuần 9: Animations**
- [ ] Scroll animations với AOS
- [ ] Hover effects
- [ ] Loading states
- [ ] Page transitions
- [ ] Micro-interactions

**Tuần 10: Polish & Testing**
- [ ] Cross-browser testing
- [ ] Mobile testing (iOS, Android)
- [ ] Accessibility audit (WAVE, axe)
- [ ] Performance optimization
- [ ] SEO check

### Phase 5: Launch (1 tuần)

**Tuần 11: Final Testing**
- [ ] User testing
- [ ] Bug fixes
- [ ] Content migration
- [ ] Backup current site

**Tuần 12: Deploy**
- [ ] Deploy to staging
- [ ] Final review
- [ ] Deploy to production
- [ ] Monitor analytics
- [ ] Gather feedback

---

## 13. Checklist Hoàn Thành

### Design System
- [ ] Color palette defined (light + dark mode)
- [ ] Typography scale established
- [ ] Spacing system (8pt grid)
- [ ] Component library created
- [ ] Style guide documented

### Layout & Structure
- [ ] Responsive grid system
- [ ] Container system
- [ ] Header/Navigation
- [ ] Footer
- [ ] Sidebar (nếu có)

### Components
- [ ] Buttons (all variants)
- [ ] Cards (all types)
- [ ] Forms & Inputs
- [ ] Navigation menu
- [ ] Badges/Tags
- [ ] Alerts/Toasts
- [ ] Modal/Dialog (nếu cần)

### Pages
- [ ] Homepage redesigned
- [ ] Single post template
- [ ] Archive/List pages
- [ ] About page
- [ ] Contact page
- [ ] 404 page
- [ ] Search page

### Animations & Effects
- [ ] Scroll animations (AOS)
- [ ] Hover effects
- [ ] Loading states
- [ ] Page transitions
- [ ] Smooth scrolling

### Performance
- [ ] Images optimized (WebP, lazy loading)
- [ ] CSS minified
- [ ] JS minified
- [ ] Critical CSS inlined
- [ ] Fonts optimized
- [ ] Lighthouse score > 95

### Accessibility
- [ ] Keyboard navigation
- [ ] Focus states
- [ ] Alt text on images
- [ ] ARIA labels
- [ ] Color contrast (WCAG AA)
- [ ] Screen reader tested

### Responsive
- [ ] Mobile (< 640px) tested
- [ ] Tablet (640px - 1024px) tested
- [ ] Desktop (> 1024px) tested
- [ ] Touch targets (44x44px min)

### Cross-browser
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (iOS Safari, Chrome)

### SEO
- [ ] Meta tags
- [ ] Open Graph tags
- [ ] Structured data
- [ ] Sitemap
- [ ] Robots.txt

### Documentation
- [ ] README updated
- [ ] Style guide created
- [ ] Component docs
- [ ] Maintenance guide

---

## 📝 Notes & Best Practices

### Development Tips

1. **Mobile First:** Luôn code cho mobile trước, rồi scale lên desktop
2. **Component Thinking:** Nghĩ theo components tái sử dụng được
3. **CSS Variables:** Dùng CSS variables cho theming
4. **Semantic HTML:** Dùng đúng HTML tags (`<article>`, `<section>`, etc.)
5. **Progressive Enhancement:** Đảm bảo hoạt động mà không có JS

### Testing Checklist

- [ ] Test trên device thật (không chỉ browser DevTools)
- [ ] Test với slow 3G connection
- [ ] Test với screen reader (NVDA/VoiceOver)
- [ ] Test với keyboard navigation only
- [ ] Test print styles

### Maintenance

- **Regular Updates:** Check dependencies mỗi tháng
- **Performance Monitoring:** Lighthouse CI trong GitHub Actions
- **Analytics:** Theo dõi Core Web Vitals
- **User Feedback:** Có form feedback/bug report

---

## 🔗 Resources

### Design Inspiration
- [Dribbble - Blog Designs](https://dribbble.com/tags/blog)
- [Awwwards - Best Blog Designs](https://www.awwwards.com/websites/blog/)
- [Behance - Web Design](https://www.behance.net/search/projects?search=blog+design)

### Tools
- **Design:** Figma, Adobe XD
- **Colors:** Coolors.co, Adobe Color
- **Icons:** Lucide Icons, Phosphor Icons, Heroicons
- **Gradients:** CSS Gradient Generator
- **Animations:** Cubic-bezier.com, Animista

### Documentation
- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/)
- [CSS Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)
- [Hugo Docs](https://gohugo.io/documentation/)

### Testing Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WAVE Accessibility](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

---

## ✅ Next Steps

1. **Review tài liệu này** với team/stakeholders
2. **Tạo design mockups** trong Figma
3. **Setup development environment**
4. **Bắt đầu Phase 1** theo roadmap
5. **Iterate based on feedback**

---

**Tài liệu sẽ được cập nhật** khi có thay đổi trong quá trình phát triển.

**Version History:**
- v1.0 (23/12/2025) - Phiên bản đầu tiên

