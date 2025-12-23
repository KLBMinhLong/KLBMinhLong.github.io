# Quick Start Guide - UI Redesign
## Bắt Đầu Trong 30 Phút

> Hướng dẫn nhanh để bắt đầu implement UI redesign

---

## 🚀 Bước 1: Backup và Setup (5 phút)

### 1.1. Backup Code Hiện Tại

```bash
# Tạo branch mới
git checkout -b ui-redesign

# Backup custom.css hiện tại
cp assets/css/extended/custom.css assets/css/extended/custom.css.backup

# Commit backup
git add .
git commit -m "Backup before UI redesign"
```

### 1.2. Tạo Cấu Trúc Thư Mục

```bash
cd assets/css/extended

# Tạo các file CSS module
touch 00-variables.css
touch 01-base.css
touch 02-layout.css
touch 03-components.css
touch 04-animations.css
touch 05-utilities.css
```

---

## 🎨 Bước 2: Setup CSS Variables (10 phút)

### 2.1. Copy Variables vào `00-variables.css`

Mở file `docs/CSS_COMPONENT_EXAMPLES.md` và copy toàn bộ phần CSS Variables vào `assets/css/extended/00-variables.css`.

**Hoặc download từ đây:**

```css
:root {
  /* Colors */
  --color-primary: #0F172A;
  --color-secondary: #475569;
  --color-accent-blue: #3B82F6;
  
  /* Spacing */
  --spacing-4: 1rem;
  --spacing-6: 2rem;
  
  /* Typography */
  --font-primary: 'Inter', sans-serif;
  --text-base: 1rem;
  
  /* (Copy phần còn lại từ CSS_COMPONENT_EXAMPLES.md) */
}
```

### 2.2. Update `custom.css` để Import

Thêm vào đầu file `custom.css`:

```css
/* Import CSS Modules */
@import url('00-variables.css');
@import url('01-base.css');
@import url('02-layout.css');
@import url('03-components.css');
@import url('04-animations.css');
@import url('05-utilities.css');

/* Existing custom CSS below... */
```

---

## 📚 Bước 3: Add Libraries (5 phút)

### 3.1. Add AOS.js (Animate On Scroll)

Mở file `layouts/partials/extend_head.html` (hoặc tạo nếu chưa có) và thêm:

```html
<!-- AOS Animation Library -->
<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>

<!-- Initialize AOS -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
      duration: 600,
      easing: 'ease-out',
      once: true,
      offset: 100,
    });
  });
</script>
```

### 3.2. Add Google Fonts

```html
<!-- Inter Font -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 3.3. Add Lucide Icons (Optional)

```html
<!-- Lucide Icons -->
<script src="https://unpkg.com/lucide@latest"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
  });
</script>
```

---

## 🎯 Bước 4: Implement Component Đầu Tiên (10 phút)

### 4.1. Tạo Button Component

Trong `03-components.css`:

```css
/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}
```

### 4.2. Test Button

Thêm button vào homepage để test:

```html
<!-- Trong content/_index.md -->
<a href="/posts" class="btn btn-primary">Xem Bài Viết</a>
```

### 4.3. Run Hugo Server

```bash
hugo server -D
```

Mở http://localhost:1313 và check button!

---

## 📄 Bước 5: Update Homepage Hero (Bonus)

### 5.1. Tạo Hero Component CSS

Trong `03-components.css`:

```css
/* Hero Section */
.hero-section {
  min-height: 60vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 4rem 1.5rem;
  position: relative;
}

.hero-content {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
}

.hero-tagline {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
```

### 5.2. Update Homepage Layout

Tạo/Edit `layouts/_default/index.html`:

```html
{{ define "main" }}
<!-- Hero Section -->
<section class="hero-section">
  <div class="hero-content">
    <div class="hero-left" data-aos="fade-right">
      <h1 class="hero-title">
        Xin chào, tôi là {{ .Site.Params.author }}
      </h1>
      <p class="hero-tagline">
        Full-stack Developer & Network Programmer
      </p>
      <div style="display: flex; gap: 1rem;">
        <a href="/posts" class="btn btn-primary">Xem Bài Viết</a>
        <a href="/about" class="btn btn-ghost">Về Tôi</a>
      </div>
    </div>
    <div class="hero-right" data-aos="fade-left">
      <img src="/images/profile/avatar.png" alt="Avatar" 
           style="width: 100%; max-width: 400px; border-radius: 1rem;">
    </div>
  </div>
</section>

<!-- Blog Posts (existing) -->
{{ .Content }}
{{ end }}
```

---

## ✅ Checklist Nhanh

- [ ] Git branch mới: `ui-redesign`
- [ ] Backup `custom.css`
- [ ] Tạo 6 file CSS modules
- [ ] Add AOS.js vào `extend_head.html`
- [ ] Add Google Fonts
- [ ] Implement button component
- [ ] Test button trên homepage
- [ ] Hugo server chạy không lỗi
- [ ] Check responsive trên mobile

---

## 🎨 Next Steps

Sau khi setup xong, bạn có thể:

1. **Đọc chi tiết:** `UI_REDESIGN_PLAN.md`
2. **Copy components:** `CSS_COMPONENT_EXAMPLES.md`
3. **Follow checklist:** `IMPLEMENTATION_CHECKLIST.md`
4. **Implement từng page:**
   - Homepage Hero ✅ (vừa làm xong)
   - Blog Grid (next)
   - Single Post
   - About Page
   - Contact Page

---

## 🐛 Troubleshooting

### CSS không load?

```bash
# Clear Hugo cache
rm -rf public/
hugo server -D --noHTTPCache
```

### AOS animation không chạy?

Check console có lỗi không:
- F12 → Console
- Nếu có lỗi "AOS is not defined" → Check script đã load chưa

### Font không đổi?

Thêm vào CSS:

```css
body {
  font-family: var(--font-primary);
}
```

### Responsive bị lỗi trên mobile?

Thêm viewport meta tag vào `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 📚 Resources

### Đọc Thêm
- [UI_REDESIGN_PLAN.md](./UI_REDESIGN_PLAN.md) - Kế hoạch đầy đủ
- [CSS_COMPONENT_EXAMPLES.md](./CSS_COMPONENT_EXAMPLES.md) - Code examples
- [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md) - Theo dõi tiến độ

### External Links
- [Hugo Docs](https://gohugo.io/documentation/)
- [AOS.js Docs](https://michalsnik.github.io/aos/)
- [Lucide Icons](https://lucide.dev/)
- [Tailwind Color Palette](https://tailwindcss.com/docs/customizing-colors)

---

## 💡 Tips

1. **Commit thường xuyên:** Sau mỗi component, commit để có thể rollback
2. **Test trên device thật:** Không chỉ Chrome DevTools
3. **Accessibility first:** Test với keyboard navigation
4. **Performance:** Optimize images, lazy load
5. **Mobile first:** Code cho mobile trước, desktop sau

---

## 🎉 Hoàn Thành!

Sau khi làm xong Quick Start này, bạn đã có:
- ✅ CSS architecture setup
- ✅ AOS animations
- ✅ Button component
- ✅ Hero section
- ✅ Development environment ready

**Next:** Implement blog grid và cards!

---

**Questions?** Check `UI_REDESIGN_PLAN.md` section 13 (Resources) hoặc Google :)

Good luck! 🚀

