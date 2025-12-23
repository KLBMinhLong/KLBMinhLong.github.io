---
title: "UI Components Demo"
description: "Showcase tất cả components có sẵn trong design system"
date: 2025-12-23
draft: false
hideMeta: true
ShowToc: true
---

# UI Components Demo

Trang này showcase tất cả các components có sẵn trong design system mới.

---

## Buttons

### Primary Buttons

<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin: 2rem 0;">
  <a href="#" class="btn btn-primary">Primary Button</a>
  <a href="#" class="btn btn-primary btn-sm">Small Primary</a>
  <a href="#" class="btn btn-primary btn-lg">Large Primary</a>
  <button class="btn btn-primary" disabled>Disabled</button>
</div>

### Secondary Buttons

<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin: 2rem 0;">
  <a href="#" class="btn btn-secondary">Secondary Button</a>
  <a href="#" class="btn btn-secondary btn-sm">Small Secondary</a>
  <a href="#" class="btn btn-secondary btn-lg">Large Secondary</a>
</div>

### Ghost Buttons

<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin: 2rem 0;">
  <a href="#" class="btn btn-ghost">Ghost Button</a>
  <a href="#" class="btn btn-ghost btn-sm">Small Ghost</a>
  <a href="#" class="btn btn-ghost btn-lg">Large Ghost</a>
</div>

### Buttons with Icons

<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin: 2rem 0;">
  <a href="#" class="btn btn-primary">
    <i data-lucide="home" style="width: 20px; height: 20px;"></i>
    <span>Home</span>
  </a>
  <a href="#" class="btn btn-secondary">
    <i data-lucide="search" style="width: 20px; height: 20px;"></i>
    <span>Search</span>
  </a>
  <a href="#" class="btn btn-ghost">
    <span>Next</span>
    <i data-lucide="arrow-right" style="width: 20px; height: 20px;"></i>
  </a>
</div>

---

## Badges

### Color Variants

<div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin: 2rem 0;">
  <span class="badge badge-default">Default</span>
  <span class="badge badge-primary">Primary</span>
  <span class="badge badge-success">Success</span>
  <span class="badge badge-warning">Warning</span>
  <span class="badge badge-error">Error</span>
</div>

### With Icons

<div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin: 2rem 0;">
  <span class="badge badge-primary">
    <i data-lucide="tag" style="width: 12px; height: 12px;"></i>
    JavaScript
  </span>
  <span class="badge badge-success">
    <i data-lucide="check" style="width: 12px; height: 12px;"></i>
    Published
  </span>
  <span class="badge badge-warning">
    <i data-lucide="alert-circle" style="width: 12px; height: 12px;"></i>
    Draft
  </span>
</div>

---

## Alerts

### Info Alert

<div class="alert alert-info" style="margin: 1.5rem 0;">
  <strong>Info:</strong> This is an informational message.
</div>

### Success Alert

<div class="alert alert-success" style="margin: 1.5rem 0;">
  <strong>Success:</strong> Your action was completed successfully!
</div>

### Warning Alert

<div class="alert alert-warning" style="margin: 1.5rem 0;">
  <strong>Warning:</strong> Please be cautious about this action.
</div>

### Error Alert

<div class="alert alert-error" style="margin: 1.5rem 0;">
  <strong>Error:</strong> Something went wrong. Please try again.
</div>

---

## Cards

### Default Card

<div class="card" style="margin: 2rem 0;">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
    <p class="card-description">This is a card description</p>
  </div>
  <div class="card-body">
    <p>This is the card body content. You can put any content here including text, images, or other components.</p>
  </div>
  <div class="card-footer">
    <span class="badge badge-primary">Tag 1</span>
    <span class="badge badge-secondary">Tag 2</span>
  </div>
</div>

### Featured Card

<div class="card card-featured" style="margin: 2rem 0;">
  <div class="card-header">
    <h3 class="card-title">Featured Card</h3>
    <p class="card-description">With gradient background</p>
  </div>
  <div class="card-body">
    <p>This card has a special gradient background to make it stand out from other cards.</p>
  </div>
  <div class="card-footer">
    <a href="#" class="btn btn-ghost">Learn More</a>
  </div>
</div>

---

## Forms

### Text Input

<div class="form-group">
  <label class="form-label">Name</label>
  <input type="text" class="input" placeholder="Enter your name">
  <span class="form-hint">This is a helper text</span>
</div>

### Text Input with Error

<div class="form-group">
  <label class="form-label">Email</label>
  <input type="email" class="input input-error" placeholder="Enter your email" value="invalid-email">
  <span class="form-error">Please enter a valid email address</span>
</div>

### Textarea

<div class="form-group">
  <label class="form-label">Message</label>
  <textarea class="input textarea" placeholder="Enter your message" rows="4"></textarea>
</div>

### Complete Form Example

<form style="margin: 2rem 0;">
  <div class="form-group">
    <label class="form-label">Full Name</label>
    <input type="text" class="input" placeholder="John Doe">
  </div>
  
  <div class="form-group">
    <label class="form-label">Email Address</label>
    <input type="email" class="input" placeholder="john@example.com">
  </div>
  
  <div class="form-group">
    <label class="form-label">Your Message</label>
    <textarea class="input textarea" placeholder="Type your message here..." rows="5"></textarea>
  </div>
  
  <button type="submit" class="btn btn-primary">Send Message</button>
</form>

---

## Loading States

### Spinner

<div style="display: flex; justify-content: center; padding: 2rem;">
  <div class="spinner"></div>
</div>

### Skeleton Loaders

<div style="margin: 2rem 0;">
  <div class="skeleton skeleton-title"></div>
  <div class="skeleton skeleton-text"></div>
  <div class="skeleton skeleton-text"></div>
  <div class="skeleton skeleton-text"></div>
</div>

---

## Typography

### Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

### Paragraph

This is a regular paragraph with **bold text**, *italic text*, and ***bold italic text***. You can also use `inline code` within paragraphs.

### Lists

#### Unordered List

- First item
- Second item
- Third item
  - Nested item 1
  - Nested item 2
- Fourth item

#### Ordered List

1. First step
2. Second step
3. Third step
   1. Sub-step A
   2. Sub-step B
4. Fourth step

### Blockquote

> This is a blockquote. It can contain **bold text**, *italic text*, and even [links](https://example.com).
> 
> Multiple paragraphs are supported as well.

### Code Block

```javascript
// JavaScript code example
function greet(name) {
  console.log(`Hello, ${name}!`);
  return `Welcome to ${name}'s blog`;
}

greet('World');
```

```python
# Python code example
def calculate_sum(a, b):
    """Calculate the sum of two numbers"""
    return a + b

result = calculate_sum(5, 3)
print(f"Result: {result}")
```

### Table

| Feature | Status | Priority |
|---------|--------|----------|
| Hero Section | ✅ Done | High |
| Blog Cards | ✅ Done | High |
| Single Post | ✅ Done | High |
| Dark Mode | ✅ Done | Medium |
| Animations | ✅ Done | Medium |

---

## Utility Classes

### Text Alignment

<p class="text-left">Left aligned text</p>
<p class="text-center">Center aligned text</p>
<p class="text-right">Right aligned text</p>

### Text Colors

<p class="text-primary">Primary color text</p>
<p class="text-secondary">Secondary color text</p>
<p class="text-tertiary">Tertiary color text</p>
<p class="text-accent">Accent color text</p>

### Font Weights

<p class="font-normal">Normal weight (400)</p>
<p class="font-medium">Medium weight (500)</p>
<p class="font-semibold">Semibold weight (600)</p>
<p class="font-bold">Bold weight (700)</p>

---

## Animations

### Hover Effects

<div style="display: flex; gap: 2rem; flex-wrap: wrap; margin: 2rem 0;">
  <div class="card hover-lift" style="width: 200px; padding: 2rem; text-align: center;">
    <p><strong>Hover Lift</strong></p>
    <p style="font-size: 0.875rem;">Hover me!</p>
  </div>
  
  <div class="card hover-scale" style="width: 200px; padding: 2rem; text-align: center;">
    <p><strong>Hover Scale</strong></p>
    <p style="font-size: 0.875rem;">Hover me!</p>
  </div>
  
  <div class="card hover-glow" style="width: 200px; padding: 2rem; text-align: center;">
    <p><strong>Hover Glow</strong></p>
    <p style="font-size: 0.875rem;">Hover me!</p>
  </div>
</div>

### Scroll Animations (AOS)

<div data-aos="fade-up" style="padding: 2rem; background: var(--color-bg-secondary); border-radius: 0.5rem; margin: 2rem 0;">
  <p><strong>Fade Up Animation</strong></p>
  <p>This element fades up when scrolled into view.</p>
</div>

<div data-aos="slide-left" style="padding: 2rem; background: var(--color-bg-secondary); border-radius: 0.5rem; margin: 2rem 0;">
  <p><strong>Slide Left Animation</strong></p>
  <p>This element slides from the left.</p>
</div>

<div data-aos="zoom-in" style="padding: 2rem; background: var(--color-bg-secondary); border-radius: 0.5rem; margin: 2rem 0;">
  <p><strong>Zoom In Animation</strong></p>
  <p>This element zooms in when visible.</p>
</div>

---

## Grid Layouts

### 2 Column Grid

<div class="grid grid-2" style="margin: 2rem 0;">
  <div class="card">
    <div class="card-body">
      <h4>Column 1</h4>
      <p>Content for first column</p>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h4>Column 2</h4>
      <p>Content for second column</p>
    </div>
  </div>
</div>

### 3 Column Grid

<div class="grid grid-3" style="margin: 2rem 0;">
  <div class="card">
    <div class="card-body">
      <h4>Column 1</h4>
      <p>First column content</p>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h4>Column 2</h4>
      <p>Second column content</p>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h4>Column 3</h4>
      <p>Third column content</p>
    </div>
  </div>
</div>

---

## Color Palette

### Light Mode Colors

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 2rem 0;">
  <div style="padding: 1.5rem; background: #0F172A; color: white; border-radius: 0.5rem; text-align: center;">
    <div style="font-size: 0.75rem; margin-bottom: 0.5rem;">Primary</div>
    <div style="font-family: monospace; font-size: 0.875rem;">#0F172A</div>
  </div>
  <div style="padding: 1.5rem; background: #475569; color: white; border-radius: 0.5rem; text-align: center;">
    <div style="font-size: 0.75rem; margin-bottom: 0.5rem;">Secondary</div>
    <div style="font-family: monospace; font-size: 0.875rem;">#475569</div>
  </div>
  <div style="padding: 1.5rem; background: #3B82F6; color: white; border-radius: 0.5rem; text-align: center;">
    <div style="font-size: 0.75rem; margin-bottom: 0.5rem;">Accent Blue</div>
    <div style="font-family: monospace; font-size: 0.875rem;">#3B82F6</div>
  </div>
  <div style="padding: 1.5rem; background: #8B5CF6; color: white; border-radius: 0.5rem; text-align: center;">
    <div style="font-size: 0.75rem; margin-bottom: 0.5rem;">Accent Purple</div>
    <div style="font-family: monospace; font-size: 0.875rem;">#8B5CF6</div>
  </div>
  <div style="padding: 1.5rem; background: #10B981; color: white; border-radius: 0.5rem; text-align: center;">
    <div style="font-size: 0.75rem; margin-bottom: 0.5rem;">Success</div>
    <div style="font-family: monospace; font-size: 0.875rem;">#10B981</div>
  </div>
  <div style="padding: 1.5rem; background: #F59E0B; color: white; border-radius: 0.5rem; text-align: center;">
    <div style="font-size: 0.75rem; margin-bottom: 0.5rem;">Warning</div>
    <div style="font-family: monospace; font-size: 0.875rem;">#F59E0B</div>
  </div>
  <div style="padding: 1.5rem; background: #EF4444; color: white; border-radius: 0.5rem; text-align: center;">
    <div style="font-size: 0.75rem; margin-bottom: 0.5rem;">Error</div>
    <div style="font-family: monospace; font-size: 0.875rem;">#EF4444</div>
  </div>
</div>

---

## Icons (Lucide)

<div style="display: flex; gap: 2rem; flex-wrap: wrap; margin: 2rem 0;">
  <div style="text-align: center;">
    <i data-lucide="home" style="width: 32px; height: 32px;"></i>
    <div style="font-size: 0.75rem; margin-top: 0.5rem;">home</div>
  </div>
  <div style="text-align: center;">
    <i data-lucide="search" style="width: 32px; height: 32px;"></i>
    <div style="font-size: 0.75rem; margin-top: 0.5rem;">search</div>
  </div>
  <div style="text-align: center;">
    <i data-lucide="user" style="width: 32px; height: 32px;"></i>
    <div style="font-size: 0.75rem; margin-top: 0.5rem;">user</div>
  </div>
  <div style="text-align: center;">
    <i data-lucide="heart" style="width: 32px; height: 32px;"></i>
    <div style="font-size: 0.75rem; margin-top: 0.5rem;">heart</div>
  </div>
  <div style="text-align: center;">
    <i data-lucide="star" style="width: 32px; height: 32px;"></i>
    <div style="font-size: 0.75rem; margin-top: 0.5rem;">star</div>
  </div>
  <div style="text-align: center;">
    <i data-lucide="mail" style="width: 32px; height: 32px;"></i>
    <div style="font-size: 0.75rem; margin-top: 0.5rem;">mail</div>
  </div>
  <div style="text-align: center;">
    <i data-lucide="phone" style="width: 32px; height: 32px;"></i>
    <div style="font-size: 0.75rem; margin-top: 0.5rem;">phone</div>
  </div>
  <div style="text-align: center;">
    <i data-lucide="calendar" style="width: 32px; height: 32px;"></i>
    <div style="font-size: 0.75rem; margin-top: 0.5rem;">calendar</div>
  </div>
</div>

<p style="text-align: center; margin: 2rem 0; color: var(--color-secondary);">
  <small>Xem thêm icons tại <a href="https://lucide.dev/icons/" target="_blank">lucide.dev/icons</a></small>
</p>

---

<div style="text-align: center; padding: 3rem 0; margin: 3rem 0; background: var(--gradient-primary); color: white; border-radius: 1rem;">
  <h2 style="color: white; margin-bottom: 1rem;">🎉 Tất cả components đã sẵn sàng!</h2>
  <p style="color: rgba(255,255,255,0.9); margin-bottom: 2rem;">
    Copy code từ trang này để sử dụng trong blog posts hoặc pages của bạn.
  </p>
  <a href="/" class="btn btn-ghost" style="border-color: white; color: white;">
    Về Trang Chủ
  </a>
</div>

