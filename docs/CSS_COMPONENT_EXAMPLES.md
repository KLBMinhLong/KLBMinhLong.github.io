# CSS Component Examples
## Ví Dụ Code Thực Tế Cho Redesign

> Các đoạn code này có thể copy và sử dụng trực tiếp

---

## 📦 CSS Variables System

### File: `assets/css/extended/00-variables.css`

```css
:root {
  /* ========================================
     COLORS - Light Mode
     ======================================== */
  
  /* Primary Colors */
  --color-primary: #0F172A;           /* Slate 900 */
  --color-secondary: #475569;         /* Slate 600 */
  --color-tertiary: #94A3B8;          /* Slate 400 */
  
  /* Accent Colors */
  --color-accent-blue: #3B82F6;       /* Blue 500 */
  --color-accent-purple: #8B5CF6;     /* Purple 500 */
  --color-accent-cyan: #06B6D4;       /* Cyan 500 */
  --color-accent-pink: #EC4899;       /* Pink 500 */
  
  /* Background Colors */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F8FAFC;      /* Slate 50 */
  --color-bg-tertiary: #F1F5F9;       /* Slate 100 */
  
  /* Surface Colors */
  --color-surface: #FFFFFF;
  --color-surface-hover: #F8FAFC;
  
  /* Border Colors */
  --color-border-light: #E2E8F0;      /* Slate 200 */
  --color-border-medium: #CBD5E1;     /* Slate 300 */
  --color-border-dark: #94A3B8;       /* Slate 400 */
  
  /* Status Colors */
  --color-success: #10B981;           /* Green 500 */
  --color-warning: #F59E0B;           /* Amber 500 */
  --color-error: #EF4444;             /* Red 500 */
  --color-info: #3B82F6;              /* Blue 500 */
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-blue: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --gradient-purple: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  --gradient-card-hover: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  /* ========================================
     SPACING (8pt Grid System)
     ======================================== */
  --spacing-1: 0.25rem;    /* 4px */
  --spacing-2: 0.5rem;     /* 8px */
  --spacing-3: 0.75rem;    /* 12px */
  --spacing-4: 1rem;       /* 16px */
  --spacing-5: 1.5rem;     /* 24px */
  --spacing-6: 2rem;       /* 32px */
  --spacing-8: 3rem;       /* 48px */
  --spacing-10: 4rem;      /* 64px */
  --spacing-12: 6rem;      /* 96px */
  --spacing-16: 8rem;      /* 128px */
  
  /* ========================================
     TYPOGRAPHY
     ======================================== */
  
  /* Font Families */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'Fira Code', 'JetBrains Mono', 'Consolas', 'Monaco', monospace;
  
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
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;
  --leading-loose: 2;
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  
  /* Letter Spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  
  /* ========================================
     BORDERS & RADIUS
     ======================================== */
  --radius-sm: 0.25rem;    /* 4px */
  --radius: 0.5rem;        /* 8px */
  --radius-md: 0.75rem;    /* 12px */
  --radius-lg: 1rem;       /* 16px */
  --radius-xl: 1.5rem;     /* 24px */
  --radius-full: 9999px;
  
  /* ========================================
     TRANSITIONS
     ======================================== */
  --transition-fast: 150ms;
  --transition-base: 300ms;
  --transition-slow: 500ms;
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  
  /* ========================================
     Z-INDEX SCALE
     ======================================== */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}

/* ========================================
   DARK MODE
   ======================================== */
[data-theme="dark"] {
  /* Primary Colors */
  --color-primary: #F8FAFC;           /* Slate 50 */
  --color-secondary: #CBD5E1;         /* Slate 300 */
  --color-tertiary: #64748B;          /* Slate 500 */
  
  /* Accent Colors (slightly lighter for dark bg) */
  --color-accent-blue: #60A5FA;       /* Blue 400 */
  --color-accent-purple: #A78BFA;     /* Purple 400 */
  --color-accent-cyan: #22D3EE;       /* Cyan 400 */
  --color-accent-pink: #F472B6;       /* Pink 400 */
  
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
  --color-border-dark: #64748B;       /* Slate 500 */
  
  /* Shadows (darker for dark mode) */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  
  /* Gradients */
  --gradient-card-hover: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
}
```

---

## 🎨 Component Styles

### File: `assets/css/extended/03-components.css`

```css
/* ========================================
   BUTTONS
   ======================================== */

/* Base Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-5);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  line-height: 1;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all var(--transition-base) var(--ease-in-out);
  text-decoration: none;
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Button Primary */
.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-primary:active {
  transform: translateY(0);
}

/* Button Secondary */
.btn-secondary {
  background: var(--color-surface);
  color: var(--color-primary);
  border: 2px solid var(--color-border-medium);
}

.btn-secondary:hover {
  background: var(--color-bg-secondary);
  border-color: var(--color-accent-blue);
  color: var(--color-accent-blue);
}

/* Button Ghost */
.btn-ghost {
  background: transparent;
  color: var(--color-accent-blue);
  border: 2px solid var(--color-accent-blue);
}

.btn-ghost:hover {
  background: var(--color-accent-blue);
  color: white;
}

/* Button Sizes */
.btn-sm {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--text-sm);
}

.btn-lg {
  padding: var(--spacing-4) var(--spacing-6);
  font-size: var(--text-lg);
}

/* ========================================
   CARDS
   ======================================== */

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--spacing-6);
  transition: transform var(--transition-base) var(--ease-out),
              box-shadow var(--transition-base) var(--ease-out),
              border-color var(--transition-base) var(--ease-out);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-accent-blue);
}

/* Card Header */
.card-header {
  margin-bottom: var(--spacing-4);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--color-border-light);
}

.card-title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-primary);
  margin: 0;
}

.card-description {
  font-size: var(--text-sm);
  color: var(--color-secondary);
  margin: var(--spacing-2) 0 0;
}

/* Card Body */
.card-body {
  color: var(--color-secondary);
  line-height: var(--leading-relaxed);
}

/* Card Footer */
.card-footer {
  margin-top: var(--spacing-4);
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--color-border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Card Featured */
.card-featured {
  background: var(--gradient-primary);
  color: white;
  border: none;
}

.card-featured .card-title,
.card-featured .card-body {
  color: white;
}

.card-featured .card-header,
.card-featured .card-footer {
  border-color: rgba(255, 255, 255, 0.2);
}

/* Card Interactive (link card) */
.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.card-link:hover .card {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-accent-blue);
}

/* ========================================
   FORM ELEMENTS
   ======================================== */

/* Input Base */
.input {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--text-base);
  font-family: var(--font-primary);
  color: var(--color-primary);
  background: var(--color-surface);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--radius);
  transition: border-color var(--transition-base) var(--ease-out),
              box-shadow var(--transition-base) var(--ease-out);
}

.input::placeholder {
  color: var(--color-tertiary);
}

.input:focus {
  outline: none;
  border-color: var(--color-accent-blue);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--color-bg-tertiary);
}

/* Input Error State */
.input-error {
  border-color: var(--color-error);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Textarea */
.textarea {
  resize: vertical;
  min-height: 120px;
}

/* Form Group */
.form-group {
  margin-bottom: var(--spacing-5);
}

.form-label {
  display: block;
  margin-bottom: var(--spacing-2);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-primary);
}

.form-hint {
  display: block;
  margin-top: var(--spacing-2);
  font-size: var(--text-sm);
  color: var(--color-tertiary);
}

.form-error {
  display: block;
  margin-top: var(--spacing-2);
  font-size: var(--text-sm);
  color: var(--color-error);
}

/* ========================================
   BADGES
   ======================================== */

.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  padding: var(--spacing-1) var(--spacing-3);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  line-height: 1;
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.badge-default {
  background: var(--color-bg-tertiary);
  color: var(--color-secondary);
}

.badge-primary {
  background: rgba(59, 130, 246, 0.1);
  color: var(--color-accent-blue);
}

.badge-success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--color-success);
}

.badge-warning {
  background: rgba(245, 158, 11, 0.1);
  color: var(--color-warning);
}

.badge-error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--color-error);
}

/* ========================================
   ALERTS
   ======================================== */

.alert {
  padding: var(--spacing-4);
  border-radius: var(--radius);
  border: 1px solid;
  margin-bottom: var(--spacing-4);
}

.alert-info {
  background: rgba(59, 130, 246, 0.1);
  border-color: var(--color-info);
  color: var(--color-info);
}

.alert-success {
  background: rgba(16, 185, 129, 0.1);
  border-color: var(--color-success);
  color: var(--color-success);
}

.alert-warning {
  background: rgba(245, 158, 11, 0.1);
  border-color: var(--color-warning);
  color: var(--color-warning);
}

.alert-error {
  background: rgba(239, 68, 68, 0.1);
  border-color: var(--color-error);
  color: var(--color-error);
}

/* ========================================
   NAVIGATION
   ======================================== */

.nav {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid var(--color-border-light);
  box-shadow: var(--shadow-sm);
  transition: background var(--transition-base) var(--ease-out);
}

[data-theme="dark"] .nav {
  background: rgba(15, 23, 42, 0.8);
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.nav-menu {
  display: flex;
  gap: var(--spacing-2);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  color: var(--color-secondary);
  text-decoration: none;
  font-weight: var(--font-medium);
  border-radius: var(--radius);
  transition: all var(--transition-fast) var(--ease-out);
}

.nav-link:hover {
  background: var(--color-bg-secondary);
  color: var(--color-accent-blue);
}

.nav-link.active {
  background: rgba(59, 130, 246, 0.1);
  color: var(--color-accent-blue);
}

/* ========================================
   CODE BLOCKS
   ======================================== */

code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  padding: 0.2em 0.4em;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
  color: var(--color-accent-purple);
}

pre {
  padding: var(--spacing-5);
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius);
  overflow-x: auto;
  margin: var(--spacing-5) 0;
}

pre code {
  padding: 0;
  background: transparent;
  color: var(--color-primary);
  font-size: var(--text-sm);
  line-height: 1.7;
}

/* ========================================
   LOADER/SPINNER
   ======================================== */

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border-light);
  border-top-color: var(--color-accent-blue);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

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
  border-radius: var(--radius);
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-text {
  height: 1em;
  margin-bottom: 0.5em;
}

.skeleton-title {
  height: 2em;
  width: 60%;
  margin-bottom: 1em;
}

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
```

---

## 🎬 Animation Examples

### File: `assets/css/extended/04-animations.css`

```css
/* ========================================
   FADE ANIMATIONS
   ======================================== */

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========================================
   SLIDE ANIMATIONS
   ======================================== */

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ========================================
   ZOOM ANIMATIONS
   ======================================== */

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ========================================
   BOUNCE ANIMATION
   ======================================== */

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* ========================================
   PULSE ANIMATION
   ======================================== */

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* ========================================
   UTILITY CLASSES
   ======================================== */

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.animate-slide-in-left {
  animation: slideInLeft 0.6s ease-out;
}

.animate-slide-in-right {
  animation: slideInRight 0.6s ease-out;
}

.animate-zoom-in {
  animation: zoomIn 0.6s ease-out;
}

.animate-bounce {
  animation: bounce 1s ease-in-out;
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* Animation Delays */
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }

/* ========================================
   HOVER EFFECTS
   ======================================== */

/* Lift Effect */
.hover-lift {
  transition: transform var(--transition-base) var(--ease-out),
              box-shadow var(--transition-base) var(--ease-out);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Scale Effect */
.hover-scale {
  transition: transform var(--transition-base) var(--ease-out);
}

.hover-scale:hover {
  transform: scale(1.05);
}

/* Glow Effect */
.hover-glow {
  transition: box-shadow var(--transition-base) var(--ease-out);
}

.hover-glow:hover {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

/* Underline Effect */
.hover-underline {
  position: relative;
  text-decoration: none;
}

.hover-underline::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent-blue);
  transition: width var(--transition-base) var(--ease-out);
}

.hover-underline:hover::after {
  width: 100%;
}

/* ========================================
   SCROLL PROGRESS BAR
   ======================================== */

.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: var(--gradient-primary);
  z-index: var(--z-fixed);
  transition: width 0.1s ease-out;
}

/* ========================================
   REDUCED MOTION
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 📱 Responsive Utilities

### File: `assets/css/extended/05-utilities.css`

```css
/* ========================================
   DISPLAY UTILITIES
   ======================================== */

.hidden { display: none; }
.block { display: block; }
.inline-block { display: inline-block; }
.inline { display: inline; }
.flex { display: flex; }
.inline-flex { display: inline-flex; }
.grid { display: grid; }

/* ========================================
   FLEX UTILITIES
   ======================================== */

.flex-row { flex-direction: row; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }

.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }
.items-stretch { align-items: stretch; }

.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }

.gap-1 { gap: var(--spacing-1); }
.gap-2 { gap: var(--spacing-2); }
.gap-3 { gap: var(--spacing-3); }
.gap-4 { gap: var(--spacing-4); }
.gap-5 { gap: var(--spacing-5); }
.gap-6 { gap: var(--spacing-6); }

/* ========================================
   TEXT UTILITIES
   ======================================== */

.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-secondary); }
.text-tertiary { color: var(--color-tertiary); }
.text-accent { color: var(--color-accent-blue); }

.font-normal { font-weight: var(--font-normal); }
.font-medium { font-weight: var(--font-medium); }
.font-semibold { font-weight: var(--font-semibold); }
.font-bold { font-weight: var(--font-bold); }

/* ========================================
   SPACING UTILITIES
   ======================================== */

/* Margin */
.m-0 { margin: 0; }
.m-auto { margin: auto; }
.mt-1 { margin-top: var(--spacing-1); }
.mt-2 { margin-top: var(--spacing-2); }
.mt-4 { margin-top: var(--spacing-4); }
.mt-6 { margin-top: var(--spacing-6); }
.mb-4 { margin-bottom: var(--spacing-4); }
.mb-6 { margin-bottom: var(--spacing-6); }

/* Padding */
.p-0 { padding: 0; }
.p-4 { padding: var(--spacing-4); }
.p-6 { padding: var(--spacing-6); }

/* ========================================
   WIDTH/HEIGHT UTILITIES
   ======================================== */

.w-full { width: 100%; }
.w-auto { width: auto; }
.h-full { height: 100%; }
.h-auto { height: auto; }

/* ========================================
   RESPONSIVE UTILITIES
   ======================================== */

/* Hide on mobile */
@media (max-width: 767px) {
  .hide-mobile { display: none !important; }
}

/* Hide on desktop */
@media (min-width: 768px) {
  .hide-desktop { display: none !important; }
}

/* Show only on mobile */
.show-mobile {
  display: none;
}

@media (max-width: 767px) {
  .show-mobile {
    display: block;
  }
}
```

---

## 📄 HTML Template Example

### Homepage Hero Section

```html
<!-- Hero Section -->
<section class="hero-section">
  <div class="container">
    <div class="hero-content">
      <!-- Left: Text Content -->
      <div class="hero-left" data-aos="fade-right">
        <h1 class="hero-title">
          Xin chào, tôi là <span class="text-gradient">Minh Long</span>
        </h1>
        <p class="hero-tagline">
          Full-stack Developer & Network Programmer
        </p>
        <p class="hero-description">
          Tôi viết blog về <strong>Java</strong>, <strong>JavaScript</strong> và 
          <strong>Lập trình mạng</strong>. Chia sẻ kiến thức và kinh nghiệm lập trình.
        </p>
        <div class="hero-cta">
          <a href="/posts" class="btn btn-primary">
            Xem Bài Viết
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" 
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="/about" class="btn btn-ghost">
            Về Tôi
          </a>
        </div>
      </div>
      
      <!-- Right: Image -->
      <div class="hero-right" data-aos="fade-left" data-aos-delay="200">
        <img src="/images/profile/avatar.png" alt="Minh Long" class="hero-image">
      </div>
    </div>
  </div>
</section>

<!-- Blog Grid -->
<section class="section">
  <div class="container">
    <div class="section-header" data-aos="fade-up">
      <h2 class="section-title">Bài Viết Mới Nhất</h2>
      <p class="section-description">
        Khám phá các bài viết về Java, JavaScript và Lập trình mạng
      </p>
    </div>
    
    <div class="grid grid-3">
      <!-- Card 1 -->
      <article class="card card-link" data-aos="fade-up" data-aos-delay="100">
        <a href="/posts/networking-7">
          <img src="/images/posts/networking-7.jpg" alt="Network Programming" class="card-image">
          <div class="card-content">
            <div class="card-meta">
              <span class="badge badge-primary">Networking</span>
              <span class="text-sm text-tertiary">5 phút đọc</span>
            </div>
            <h3 class="card-title">Giới Thiệu Lập Trình Mạng</h3>
            <p class="card-description">
              Tìm hiểu về Socket Programming, TCP/UDP và các khái niệm cơ bản...
            </p>
          </div>
        </a>
      </article>
      
      <!-- More cards... -->
    </div>
  </div>
</section>
```

### CSS for Hero Section

```css
.hero-section {
  min-height: 60vh;
  display: flex;
  align-items: center;
  background: var(--gradient-primary);
  position: relative;
  overflow: hidden;
  padding: var(--spacing-12) 0;
}

/* Background Pattern */
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%);
  pointer-events: none;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-8);
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: var(--font-extrabold);
  color: white;
  margin-bottom: var(--spacing-4);
  line-height: var(--leading-tight);
}

.text-gradient {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-tagline {
  font-size: var(--text-2xl);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--spacing-5);
}

.hero-description {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--spacing-6);
}

.hero-cta {
  display: flex;
  gap: var(--spacing-4);
  flex-wrap: wrap;
}

.hero-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  transition: transform var(--transition-base) var(--ease-out);
}

.hero-image:hover {
  transform: scale(1.05) rotate(2deg);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-cta {
    justify-content: center;
  }
  
  .hero-image {
    max-width: 300px;
    margin: 0 auto;
  }
}
```

---

## 🚀 Quick Start Script

### File: `assets/js/init.js`

```javascript
// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
  // Animate On Scroll
  AOS.init({
    duration: 600,
    easing: 'ease-out',
    once: true,
    offset: 100,
  });
  
  // Scroll Progress Bar
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - 
                     document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }
  
  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
```

---

**Lưu ý:** Các ví dụ trên có thể copy trực tiếp và customize theo nhu cầu dự án.

