---
title: "Asynchronous JavaScript: Promises và Async/Await"
date: 2025-01-09
lastmod: 2025-01-09
draft: false
author: "Nguyễn Minh Long"
description: "Tìm hiểu về Asynchronous JavaScript: Callbacks, Promises và Async/Await - cách xử lý các tác vụ bất đồng bộ trong JavaScript, bao gồm error handling và best practices."
tags:
  - JavaScript
  - Async
  - Tutorial
categories:
  - "JavaScript"
featuredImage: "/images/posts/javascript/javascript-async.jpg"
featuredImagePreview: "/images/posts/javascript/javascript-async-preview.jpg"
toc: true
ShowToc: true
math: false
code: true
---

# Asynchronous JavaScript: Promises và Async/Await

## Giới thiệu

JavaScript là ngôn ngữ **single-threaded** (đơn luồng), nhưng với **Asynchronous Programming** (lập trình bất đồng bộ), chúng ta có thể thực hiện nhiều tác vụ mà không chặn luồng chính.

![JavaScript Async](/images/posts/javascript/javascript-async.jpg)

*Asynchronous JavaScript - Xử lý tác vụ không đồng bộ*

Bài viết này sẽ giới thiệu:

- **Callbacks** - Cách xử lý bất đồng bộ truyền thống
- **Promises** - Cải tiến từ callbacks
- **Async/Await** - Cú pháp hiện đại, dễ đọc hơn
- **Error Handling** - Xử lý lỗi trong async code

## Synchronous vs Asynchronous

### Synchronous (Đồng bộ)

```javascript
// Code chạy tuần tự, từng dòng một
console.log("Bước 1");
console.log("Bước 2");
console.log("Bước 3");

// Kết quả:
// Bước 1
// Bước 2
// Bước 3
```

### Asynchronous (Bất đồng bộ)

```javascript
// Code không chạy tuần tự
console.log("Bước 1");

setTimeout(() => {
  console.log("Bước 2");
}, 1000);

console.log("Bước 3");

// Kết quả:
// Bước 1
// Bước 3
// Bước 2 (sau 1 giây)
```

**Tại sao cần Asynchronous?**
- Tải dữ liệu từ server (API calls)
- Đọc/ghi file
- Xử lý hình ảnh
- Tương tác với database
- Không muốn chặn UI trong khi chờ

## Callbacks

**Callback** là hàm được truyền vào hàm khác như một tham số, được gọi sau khi tác vụ hoàn thành.

### Callback cơ bản

```javascript
// Hàm nhận callback
function xuLyXong(callback) {
  console.log("Đang xử lý...");
  setTimeout(() => {
    console.log("Xử lý xong!");
    callback(); // Gọi callback
  }, 1000);
}

// Truyền callback
xuLyXong(function() {
  console.log("Callback được gọi!");
});

// Kết quả:
// Đang xử lý...
// Xử lý xong!
// Callback được gọi!
```

### Callback với dữ liệu

```javascript
function layDuLieu(callback) {
  setTimeout(() => {
    const duLieu = { ten: "Minh Long", tuoi: 22 };
    callback(duLieu);
  }, 1000);
}

layDuLieu(function(duLieu) {
  console.log(`Tên: ${duLieu.ten}, Tuổi: ${duLieu.tuoi}`);
});
```

### Callback Hell (Địa ngục callback)

```javascript
// Vấn đề: Callback lồng nhau quá nhiều
layDuLieu(function(duLieu) {
  xuLyDuLieu(duLieu, function(ketQua) {
    luuKetQua(ketQua, function(id) {
      guiThongBao(id, function() {
        console.log("Hoàn thành!");
        // ... và còn nhiều tầng nữa
      });
    });
  });
});
```

**Vấn đề với Callbacks:**
- ❌ Khó đọc và bảo trì (Callback Hell)
- ❌ Khó xử lý lỗi
- ❌ Khó debug

## Promises

**Promise** là đối tượng đại diện cho kết quả (thành công hoặc thất bại) của một tác vụ bất đồng bộ.

### Tạo Promise

```javascript
// Promise có 3 trạng thái:
// 1. Pending (đang chờ)
// 2. Fulfilled (thành công)
// 3. Rejected (thất bại)

const promise = new Promise((resolve, reject) => {
  // Tác vụ bất đồng bộ
  setTimeout(() => {
    const thanhCong = true;
    
    if (thanhCong) {
      resolve("Thành công!"); // Promise fulfilled
    } else {
      reject("Thất bại!"); // Promise rejected
    }
  }, 1000);
});
```

### Sử dụng Promise

```javascript
// .then() - xử lý khi thành công
// .catch() - xử lý khi thất bại
// .finally() - luôn chạy (thành công hay thất bại)

promise
  .then((ketQua) => {
    console.log(ketQua); // "Thành công!"
  })
  .catch((loi) => {
    console.error(loi); // "Thất bại!"
  })
  .finally(() => {
    console.log("Luôn chạy!");
  });
```

### Promise Chain (Chuỗi Promise)

```javascript
// Promise có thể nối chuỗi
function layDuLieu() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ten: "Minh Long", tuoi: 22 });
    }, 1000);
  });
}

function xuLyDuLieu(duLieu) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Xin chào, ${duLieu.ten}!`);
    }, 500);
  });
}

// Nối chuỗi
layDuLieu()
  .then((duLieu) => {
    console.log("Đã lấy dữ liệu:", duLieu);
    return xuLyDuLieu(duLieu); // Trả về Promise mới
  })
  .then((ketQua) => {
    console.log(ketQua); // "Xin chào, Minh Long!"
  })
  .catch((loi) => {
    console.error("Lỗi:", loi);
  });
```

### Promise.all() - Chạy song song

```javascript
// Chạy nhiều Promise cùng lúc, đợi tất cả hoàn thành
const promise1 = new Promise((resolve) => setTimeout(() => resolve("Kết quả 1"), 1000));
const promise2 = new Promise((resolve) => setTimeout(() => resolve("Kết quả 2"), 2000));
const promise3 = new Promise((resolve) => setTimeout(() => resolve("Kết quả 3"), 1500));

Promise.all([promise1, promise2, promise3])
  .then((ketQua) => {
    console.log(ketQua); // ["Kết quả 1", "Kết quả 2", "Kết quả 3"]
    // Tất cả đều thành công
  })
  .catch((loi) => {
    console.error("Có lỗi xảy ra:", loi);
    // Nếu một Promise thất bại, tất cả thất bại
  });
```

### Promise.allSettled() - Đợi tất cả (thành công hay thất bại)

```javascript
// Đợi tất cả Promise hoàn thành, không quan tâm thành công hay thất bại
const promise1 = Promise.resolve("Thành công");
const promise2 = Promise.reject("Thất bại");
const promise3 = Promise.resolve("Thành công 2");

Promise.allSettled([promise1, promise2, promise3])
  .then((ketQua) => {
    console.log(ketQua);
    // [
    //   { status: 'fulfilled', value: 'Thành công' },
    //   { status: 'rejected', reason: 'Thất bại' },
    //   { status: 'fulfilled', value: 'Thành công 2' }
    // ]
  });
```

### Promise.race() - Lấy kết quả đầu tiên

```javascript
// Lấy kết quả của Promise hoàn thành đầu tiên
const promise1 = new Promise((resolve) => setTimeout(() => resolve("Nhanh"), 500));
const promise2 = new Promise((resolve) => setTimeout(() => resolve("Chậm"), 2000));

Promise.race([promise1, promise2])
  .then((ketQua) => {
    console.log(ketQua); // "Nhanh" (hoàn thành trước)
  });
```

## Async/Await

**Async/Await** là cú pháp hiện đại, giúp viết code bất đồng bộ giống như code đồng bộ.

### Cú pháp cơ bản

```javascript
// async function - luôn trả về Promise
async function layDuLieu() {
  // await - đợi Promise hoàn thành
  const duLieu = await new Promise((resolve) => {
    setTimeout(() => resolve({ ten: "Minh Long" }), 1000);
  });
  
  return duLieu;
}

// Sử dụng
layDuLieu().then(duLieu => {
  console.log(duLieu); // { ten: "Minh Long" }
});
```

### So sánh Promise vs Async/Await

```javascript
// Cách 1: Promise
function layDuLieu() {
  return fetch('/api/user')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

// Cách 2: Async/Await (dễ đọc hơn)
async function layDuLieu() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

### Xử lý lỗi với try/catch

```javascript
async function xuLyDuLieu() {
  try {
    const duLieu = await layDuLieu();
    const ketQua = await xuLy(duLieu);
    return ketQua;
  } catch (error) {
    // Xử lý lỗi
    console.error("Lỗi:", error);
    throw error; // Ném lỗi tiếp
  }
}
```

### Nhiều await tuần tự

```javascript
async function xuLyTuTuanTu() {
  const ketQua1 = await ham1(); // Đợi ham1 xong
  const ketQua2 = await ham2(); // Rồi mới chạy ham2
  const ketQua3 = await ham3(); // Rồi mới chạy ham3
  
  return [ketQua1, ketQua2, ketQua3];
}
```

### Nhiều await song song

```javascript
// Cách 1: Promise.all với async/await
async function xuLySongSong() {
  const [ketQua1, ketQua2, ketQua3] = await Promise.all([
    ham1(),
    ham2(),
    ham3()
  ]);
  
  return [ketQua1, ketQua2, ketQua3];
}

// Cách 2: Khởi tạo trước, await sau
async function xuLySongSong2() {
  const promise1 = ham1();
  const promise2 = ham2();
  const promise3 = ham3();
  
  // Tất cả đã bắt đầu chạy song song
  const ketQua1 = await promise1;
  const ketQua2 = await promise2;
  const ketQua3 = await promise3;
  
  return [ketQua1, ketQua2, ketQua3];
}
```

![JavaScript Async Await](/images/posts/javascript/javascript-async-await.jpg)

*Async/Await - Cú pháp hiện đại cho code bất đồng bộ*

## Error Handling (Xử lý lỗi)

### Với Promises

```javascript
function layDuLieu() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const loi = Math.random() > 0.5;
      if (loi) {
        reject(new Error("Lỗi khi lấy dữ liệu"));
      } else {
        resolve({ ten: "Minh Long" });
      }
    }, 1000);
  });
}

// Xử lý lỗi
layDuLieu()
  .then(duLieu => {
    console.log(duLieu);
  })
  .catch(error => {
    console.error("Lỗi:", error.message);
  });
```

### Với Async/Await

```javascript
async function xuLy() {
  try {
    const duLieu = await layDuLieu();
    console.log(duLieu);
  } catch (error) {
    console.error("Lỗi:", error.message);
  }
}
```

### Xử lý lỗi trong Promise.all

```javascript
// Nếu một Promise thất bại, tất cả thất bại
async function xuLyNhieu() {
  try {
    const ketQua = await Promise.all([
      ham1(),
      ham2(),
      ham3()
    ]);
    return ketQua;
  } catch (error) {
    // Nếu bất kỳ ham nào thất bại, vào đây
    console.error("Lỗi:", error);
  }
}

// Hoặc dùng Promise.allSettled để xử lý từng lỗi
async function xuLyNhieu2() {
  const ketQua = await Promise.allSettled([
    ham1(),
    ham2(),
    ham3()
  ]);
  
  ketQua.forEach((item, index) => {
    if (item.status === 'fulfilled') {
      console.log(`Ham ${index + 1} thành công:`, item.value);
    } else {
      console.error(`Ham ${index + 1} thất bại:`, item.reason);
    }
  });
}
```

## Fetch API

**Fetch API** là cách hiện đại để gọi API, trả về Promise.

### Fetch cơ bản

```javascript
// GET request
fetch('https://api.example.com/users')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### Fetch với Async/Await

```javascript
async function layNguoiDung() {
  try {
    const response = await fetch('https://api.example.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### POST request

```javascript
async function taoNguoiDung(ten, tuoi) {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ten: ten,
        tuoi: tuoi
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

## Ví dụ thực tế

### Ví dụ 1: Tải dữ liệu từ nhiều API

```javascript
async function layDuLieuDayDu() {
  try {
    // Chạy song song để tối ưu thời gian
    const [nguoiDung, baiViet, binhLuan] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/comments').then(r => r.json())
    ]);
    
    return {
      nguoiDung,
      baiViet,
      binhLuan
    };
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu:', error);
    throw error;
  }
}
```

### Ví dụ 2: Retry logic (Thử lại khi thất bại)

```javascript
async function layDuLieuVoiRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error; // Lần cuối, ném lỗi
      }
      console.log(`Thử lại lần ${i + 1}...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Đợi tăng dần
    }
  }
}
```

### Ví dụ 3: Xử lý form với validation

```javascript
async function guiForm(formData) {
  try {
    // Validate
    if (!formData.ten || !formData.email) {
      throw new Error('Vui lòng điền đầy đủ thông tin');
    }
    
    // Gửi dữ liệu
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gửi form thất bại');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Lỗi:', error.message);
    throw error;
  }
}

// Sử dụng
document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    ten: document.getElementById('ten').value,
    email: document.getElementById('email').value
  };
  
  try {
    const result = await guiForm(formData);
    alert('Gửi thành công!');
  } catch (error) {
    alert('Lỗi: ' + error.message);
  }
});
```

### Ví dụ 4: Tạo hàm delay (tiện ích)

```javascript
// Hàm delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Sử dụng
async function xuLyVoiDelay() {
  console.log("Bắt đầu");
  await delay(1000);
  console.log("Sau 1 giây");
  await delay(2000);
  console.log("Sau 2 giây nữa");
}
```

## Best Practices

### 1. Luôn xử lý lỗi

```javascript
// ❌ Không tốt
async function layDuLieu() {
  const data = await fetch('/api/data');
  return data.json();
}

// ✅ Tốt
async function layDuLieu() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### 2. Sử dụng Promise.all cho tác vụ độc lập

```javascript
// ❌ Chậm (tuần tự)
async function layNhieuDuLieu() {
  const data1 = await fetch('/api/data1');
  const data2 = await fetch('/api/data2');
  const data3 = await fetch('/api/data3');
  return [data1, data2, data3];
}

// ✅ Nhanh (song song)
async function layNhieuDuLieu() {
  const [data1, data2, data3] = await Promise.all([
    fetch('/api/data1'),
    fetch('/api/data2'),
    fetch('/api/data3')
  ]);
  return [data1, data2, data3];
}
```

### 3. Tránh await trong vòng lặp không cần thiết

```javascript
// ❌ Chậm
async function xuLyMang(mang) {
  const ketQua = [];
  for (const item of mang) {
    ketQua.push(await xuLy(item));
  }
  return ketQua;
}

// ✅ Nhanh (nếu không cần tuần tự)
async function xuLyMang(mang) {
  return Promise.all(mang.map(item => xuLy(item)));
}
```

### 4. Sử dụng async/await thay vì Promise.then khi có thể

```javascript
// ✅ Dễ đọc hơn
async function xuLy() {
  const data = await layDuLieu();
  const ketQua = await xuLy(data);
  return ketQua;
}
```

## Kết luận

Trong bài 5, bạn đã học được:

- ✅ **Callbacks**: Cách xử lý bất đồng bộ truyền thống
- ✅ **Promises**: Cải tiến từ callbacks, tránh callback hell
- ✅ **Async/Await**: Cú pháp hiện đại, dễ đọc và bảo trì
- ✅ **Error Handling**: Xử lý lỗi với try/catch và .catch()
- ✅ **Fetch API**: Gọi API hiện đại
- ✅ **Best Practices**: Cách viết code async tốt nhất

**Best Practices:**
- ✅ Luôn xử lý lỗi với try/catch hoặc .catch()
- ✅ Dùng Promise.all() cho tác vụ độc lập
- ✅ Ưu tiên async/await thay vì Promise.then()
- ✅ Tránh await trong vòng lặp không cần thiết

**Lưu ý quan trọng:**
- Async function luôn trả về Promise
- await chỉ dùng được trong async function
- Promise.all() thất bại nếu một Promise thất bại
- Dùng Promise.allSettled() nếu muốn đợi tất cả

Với kiến thức về Asynchronous JavaScript, bạn đã sẵn sàng xây dựng các ứng dụng web hiện đại, tương tác với API và xử lý dữ liệu bất đồng bộ một cách hiệu quả!
