// Contact Form với EmailJS
(function() {
  'use strict';

  // Cấu hình EmailJS - Load từ file emailjs-config.js (không commit)
  // Nếu không có config, sẽ thử lấy từ window.EMAILJS_CONFIG hoặc dùng giá trị mặc định
  const EMAILJS_CONFIG = window.EMAILJS_CONFIG || {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY'
  };

  // Email để nhận thư - ẩn khỏi spam
  const RECIPIENT_EMAIL = atob('bmd1eWVubWluaGxvbmdjbnR0QGdtYWlsLmNvbQ==');

  // Hàm hiển thị thông báo
  function showMessage(message, type = 'info') {
    const formMessage = document.getElementById('form-message');
    if (!formMessage) return;

    formMessage.style.display = 'block';
    formMessage.textContent = message;
    
    // Xóa các class cũ
    formMessage.classList.remove('success', 'error', 'info');
    
    // Thêm class mới
    if (type === 'success') {
      formMessage.classList.add('success');
      formMessage.style.color = '#4caf50';
      formMessage.style.borderColor = '#4caf50';
    } else if (type === 'error') {
      formMessage.classList.add('error');
      formMessage.style.color = '#f44336';
      formMessage.style.borderColor = '#f44336';
    } else {
      formMessage.classList.add('info');
      formMessage.style.color = 'var(--accent)';
    }
  }

  // Hàm ẩn thông báo
  function hideMessage() {
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
      formMessage.style.display = 'none';
    }
  }

  // Hàm hiển thị loading
  function setLoading(isLoading) {
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoader = submitBtn?.querySelector('.btn-loader');
    
    if (!submitBtn) return;

    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      submitBtn.style.cursor = 'not-allowed';
      if (btnText) btnText.style.display = 'none';
      if (btnLoader) btnLoader.style.display = 'inline';
    } else {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
      if (btnText) btnText.style.display = 'inline';
      if (btnLoader) btnLoader.style.display = 'none';
    }
  }

  // Hàm validate form
  function validateForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
      errors.push('Tên phải có ít nhất 2 ký tự');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.push('Email không hợp lệ');
    }

    if (!formData.message || formData.message.trim().length < 10) {
      errors.push('Tin nhắn phải có ít nhất 10 ký tự');
    }

    return errors;
  }

  // Hàm gửi email qua EmailJS
  async function sendEmail(formData) {
    try {
      // Kiểm tra xem EmailJS đã được load chưa
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS chưa được tải. Vui lòng kiểm tra lại cấu hình.');
      }

      // Khởi tạo EmailJS
      emailjs.init(EMAILJS_CONFIG.publicKey);

      // Chuẩn bị template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: RECIPIENT_EMAIL,
        subject: formData.subject || 'Liên hệ từ website',
        message: formData.message,
        reply_to: formData.email
      };

      // Gửi email
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      return { success: true, response };
    } catch (error) {
      console.error('EmailJS Error:', error);
      throw error;
    }
  }

  // Hàm xử lý submit form
  async function handleFormSubmit(event) {
    event.preventDefault();
    hideMessage();

    const form = event.target;
    const formData = {
      name: form.querySelector('#name').value.trim(),
      email: form.querySelector('#email').value.trim(),
      subject: form.querySelector('#subject').value.trim(),
      message: form.querySelector('#message').value.trim()
    };

    // Validate
    const errors = validateForm(formData);
    if (errors.length > 0) {
      showMessage(errors.join('. '), 'error');
      return;
    }

    // Hiển thị loading
    setLoading(true);
    showMessage('Đang gửi tin nhắn...', 'info');

    try {
      // Gửi email
      await sendEmail(formData);

      // Thành công
      showMessage('✓ Tin nhắn đã được gửi thành công! Mình sẽ phản hồi sớm nhất có thể.', 'success');
      
      // Reset form
      form.reset();

      // Ẩn thông báo sau 5 giây
      setTimeout(() => {
        hideMessage();
      }, 5000);
    } catch (error) {
      // Lỗi
      let errorMessage = 'Có lỗi xảy ra khi gửi tin nhắn. ';
      
      if (error.text) {
        errorMessage += error.text;
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Vui lòng thử lại sau.';
      }

      showMessage(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  }

  // Khởi tạo form khi DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', handleFormSubmit);

      // Kiểm tra xem EmailJS config đã được setup chưa
      if (!EMAILJS_CONFIG || 
          EMAILJS_CONFIG.serviceId === 'YOUR_SERVICE_ID' || 
          EMAILJS_CONFIG.templateId === 'YOUR_TEMPLATE_ID' || 
          EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
        console.warn('EmailJS chưa được cấu hình. Vui lòng:');
        console.warn('1. Thêm GitHub Secrets (EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY)');
        console.warn('2. Hoặc tạo file static/js/emailjs-config.js với config thực tế');
      }
    }
  });
})();

