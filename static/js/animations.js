// Page Transitions & Animations
(function() {
  'use strict';

  // ========================================
  // PAGE TRANSITIONS
  // ========================================
  
  // Fade out khi click link
  function initPageTransitions() {
    const links = document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]');
    
    links.forEach(link => {
      // Skip external links, mailto, tel, etc.
      if (link.href.includes('mailto:') || 
          link.href.includes('tel:') || 
          link.href.includes('#') ||
          link.target === '_blank' ||
          link.hasAttribute('download')) {
        return;
      }

      link.addEventListener('click', function(e) {
        // Skip if Ctrl/Cmd + click (open in new tab)
        if (e.ctrlKey || e.metaKey) {
          return;
        }

        const href = this.getAttribute('href');
        if (!href || href === '#' || href.startsWith('javascript:')) {
          return;
        }

        // Fade out effect
        document.body.style.transition = 'opacity 0.2s ease-out';
        document.body.style.opacity = '0.7';
      });
    });

    // Fade in khi page load
    window.addEventListener('pageshow', function(e) {
      if (e.persisted) {
        // Page was loaded from cache
        document.body.style.opacity = '1';
      }
    });

    // Fade in on load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fadeIn);
    } else {
      fadeIn();
    }
  }

  function fadeIn() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease-in';
    
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  }

  // ========================================
  // SCROLL ANIMATIONS
  // ========================================
  
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
      '.post-entry, .post-content > *, .about-section, .contact-section, .hero-content'
    );

    animateElements.forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  }

  // ========================================
  // MENU ANIMATIONS
  // ========================================
  
  function initMenuAnimations() {
    const menuItems = document.querySelectorAll('.nav-menu #menu li a');
    
    menuItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(-10px)';
      item.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
      
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 100);
    });
  }

  // ========================================
  // CARD HOVER EFFECTS
  // ========================================
  
  function initCardAnimations() {
    const cards = document.querySelectorAll('.post-entry, .cert-card, .about-section, .contact-section');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.01)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // ========================================
  // SMOOTH SCROLL
  // ========================================
  
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ========================================
  // INITIALIZE
  // ========================================
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initPageTransitions();
      initScrollAnimations();
      initMenuAnimations();
      initCardAnimations();
      initSmoothScroll();
    });
  } else {
    initPageTransitions();
    initScrollAnimations();
    initMenuAnimations();
    initCardAnimations();
    initSmoothScroll();
  }

  // Re-initialize on navigation (for SPA-like behavior)
  if (window.history && window.history.pushState) {
    const originalPushState = window.history.pushState;
    window.history.pushState = function() {
      originalPushState.apply(window.history, arguments);
      setTimeout(() => {
        initScrollAnimations();
        initCardAnimations();
        initSmoothScroll();
      }, 100);
    };
  }

})();

