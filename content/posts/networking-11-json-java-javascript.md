---
title: "Xử lý JSON trong Java và JavaScript"
date: 2025-01-14
lastmod: 2025-01-14
draft: false
author: "Nguyễn Minh Long"
description: "Tìm hiểu cách xử lý JSON trong Java và JavaScript: JSON format, parse và stringify trong JavaScript, sử dụng Jackson và Gson trong Java với ví dụ thực tế."
tags:
  - Java
  - JavaScript
  - JSON
  - Tutorial
categories:
  - "Lập trình mạng"
featuredImage: "/images/posts/networking/json-intro.jpg"
featuredImagePreview: "/images/posts/networking/json-intro-preview.jpg"
toc: true
ShowToc: true
math: false
code: true
---

## Giới thiệu

**JSON (JavaScript Object Notation)** là định dạng dữ liệu phổ biến nhất trong web hiện đại, được dùng để trao đổi dữ liệu giữa client và server.

![JSON](/images/posts/networking/json-intro.jpg)

*JSON - Định dạng dữ liệu phổ biến nhất trong web*

Bài viết này sẽ giới thiệu:

- **JSON format**: Cú pháp và cấu trúc
- **JSON trong JavaScript**: Parse và stringify (native)
- **JSON trong Java**: Sử dụng Jackson và Gson
- **Ví dụ thực tế**: Parse và stringify trong cả hai ngôn ngữ

## JSON là gì?

**JSON (JavaScript Object Notation)** là định dạng text đơn giản để lưu trữ và trao đổi dữ liệu.

### Tại sao dùng JSON?

- ✅ **Dễ đọc**: Con người có thể đọc được
- ✅ **Nhẹ**: Kích thước nhỏ hơn XML
- ✅ **Hỗ trợ rộng rãi**: Hầu hết ngôn ngữ đều hỗ trợ
- ✅ **Native trong JavaScript**: Không cần thư viện bên ngoài
- ✅ **Phù hợp cho API**: RESTful API thường dùng JSON

### Cú pháp JSON

```json
{
  "name": "Nguyễn Minh Long",
  "age": 22,
  "isStudent": true,
  "hobbies": ["Đọc sách", "Lập trình", "Nghe nhạc"],
  "address": {
    "city": "Hồ Chí Minh",
    "district": "Quận 7"
  },
  "email": null
}
```

**Quy tắc:**
- Keys phải là strings (trong dấu ngoặc kép)
- Values có thể là: string, number, boolean, null, object, array
- Không có comments
- Không có trailing comma

## JSON trong JavaScript

JavaScript có **built-in support** cho JSON, không cần thư viện bên ngoài.

### JSON.stringify() - Chuyển Object thành JSON

```javascript
// Object JavaScript
const user = {
  name: "Nguyễn Minh Long",
  age: 22,
  isStudent: true,
  hobbies: ["Đọc sách", "Lập trình"],
  address: {
    city: "Hồ Chí Minh",
    district: "Quận 7"
  }
};

// Chuyển thành JSON string
const jsonString = JSON.stringify(user);
console.log(jsonString);
// {"name":"Nguyễn Minh Long","age":22,"isStudent":true,"hobbies":["Đọc sách","Lập trình"],"address":{"city":"Hồ Chí Minh","district":"Quận 7"}}

// Với formatting (indent)
const jsonPretty = JSON.stringify(user, null, 2);
console.log(jsonPretty);
// {
//   "name": "Nguyễn Minh Long",
//   "age": 22,
//   ...
// }
```

### JSON.parse() - Chuyển JSON thành Object

```javascript
// JSON string
const jsonString = '{"name":"Nguyễn Minh Long","age":22}';

// Parse thành object
const user = JSON.parse(jsonString);
console.log(user.name); // "Nguyễn Minh Long"
console.log(user.age);  // 22
```

### Xử lý lỗi khi parse

```javascript
try {
  const jsonString = '{"name":"Minh Long","age":22}';
  const user = JSON.parse(jsonString);
  console.log(user);
} catch (error) {
  console.error('Lỗi parse JSON:', error.message);
  // Xử lý lỗi
}
```

### Replacer và Reviver

**Replacer** - Lọc/thay đổi giá trị khi stringify:

```javascript
const user = {
  name: "Minh Long",
  age: 22,
  password: "secret123", // Không muốn gửi password
  email: "long@example.com"
};

// Chỉ lấy name và email
const json = JSON.stringify(user, ['name', 'email']);
console.log(json);
// {"name":"Minh Long","email":"long@example.com"}

// Hoặc dùng function
const json2 = JSON.stringify(user, (key, value) => {
  if (key === 'password') {
    return undefined; // Bỏ qua password
  }
  return value;
});
```

**Reviver** - Xử lý giá trị khi parse:

```javascript
const jsonString = '{"name":"Minh Long","birthDate":"2002-01-01"}';

const user = JSON.parse(jsonString, (key, value) => {
  if (key === 'birthDate') {
    return new Date(value); // Chuyển thành Date object
  }
  return value;
});

console.log(user.birthDate instanceof Date); // true
```

### Ví dụ: Gửi JSON qua API

```javascript
// Tạo object
const newUser = {
  name: "Nguyễn Minh Long",
  email: "nguyenminhlongcntt@gmail.com",
  age: 22
};

// Gửi POST request với JSON
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newUser) // Chuyển object thành JSON
})
  .then(response => response.json()) // Parse JSON response
  .then(data => {
    console.log('User created:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### Ví dụ: Nhận JSON từ API

```javascript
// Nhận JSON từ API
fetch('https://api.example.com/users/1')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse JSON
  })
  .then(user => {
    console.log('User:', user.name);
    console.log('Email:', user.email);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

![JSON in JavaScript](/images/posts/networking/json-javascript.jpg)

*JSON trong JavaScript - Native support, không cần thư viện*

## JSON trong Java

Java **không có built-in JSON support**, cần dùng thư viện bên ngoài. Hai thư viện phổ biến nhất là **Jackson** và **Gson**.

### Jackson

**Jackson** là thư viện phổ biến nhất để xử lý JSON trong Java.

#### Cài đặt

**Maven:**
```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.15.2</version>
</dependency>
```

**Gradle:**
```gradle
implementation 'com.fasterxml.jackson.core:jackson-databind:2.15.2'
```

#### ObjectMapper - Parse và Stringify

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;

public class JacksonExample {
    public static void main(String[] args) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        
        // Object → JSON string
        User user = new User("Nguyễn Minh Long", 22, "long@example.com");
        String json = mapper.writeValueAsString(user);
        System.out.println(json);
        // {"name":"Nguyễn Minh Long","age":22,"email":"long@example.com"}
        
        // JSON string → Object
        String jsonString = "{\"name\":\"Minh Long\",\"age\":22}";
        User parsedUser = mapper.readValue(jsonString, User.class);
        System.out.println(parsedUser.getName()); // "Minh Long"
    }
}

class User {
    private String name;
    private int age;
    private String email;
    
    // Constructors, getters, setters
    public User() {}
    
    public User(String name, int age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
    
    // Getters và Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
```

#### Parse JSON thành Map

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;

ObjectMapper mapper = new ObjectMapper();
String jsonString = "{\"name\":\"Minh Long\",\"age\":22}";

// Parse thành Map
Map<String, Object> map = mapper.readValue(jsonString, Map.class);
System.out.println(map.get("name")); // "Minh Long"
System.out.println(map.get("age"));  // 22
```

#### Parse JSON Array

```java
String jsonArray = "[{\"name\":\"Minh Long\"},{\"name\":\"Văn A\"}]";

// Parse thành List
List<Map<String, Object>> users = mapper.readValue(
    jsonArray, 
    new TypeReference<List<Map<String, Object>>>() {}
);

users.forEach(user -> {
    System.out.println(user.get("name"));
});
```

#### Pretty Print (Format JSON)

```java
ObjectMapper mapper = new ObjectMapper();
mapper.enable(SerializationFeature.INDENT_OUTPUT);

String json = mapper.writeValueAsString(user);
// JSON sẽ được format với indent
```

#### Xử lý lỗi

```java
try {
    User user = mapper.readValue(jsonString, User.class);
} catch (JsonProcessingException e) {
    System.err.println("Lỗi parse JSON: " + e.getMessage());
    e.printStackTrace();
}
```

### Gson

**Gson** là thư viện của Google, đơn giản và dễ sử dụng.

#### Cài đặt

**Maven:**
```xml
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.10.1</version>
</dependency>
```

**Gradle:**
```gradle
implementation 'com.google.code.gson:gson:2.10.1'
```

#### Parse và Stringify

```java
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class GsonExample {
    public static void main(String[] args) {
        Gson gson = new Gson();
        
        // Object → JSON string
        User user = new User("Nguyễn Minh Long", 22, "long@example.com");
        String json = gson.toJson(user);
        System.out.println(json);
        // {"name":"Nguyễn Minh Long","age":22,"email":"long@example.com"}
        
        // JSON string → Object
        String jsonString = "{\"name\":\"Minh Long\",\"age\":22}";
        User parsedUser = gson.fromJson(jsonString, User.class);
        System.out.println(parsedUser.getName()); // "Minh Long"
    }
}
```

#### Parse JSON thành JsonObject

```java
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

String jsonString = "{\"name\":\"Minh Long\",\"age\":22}";

// Parse thành JsonObject
JsonObject jsonObject = JsonParser.parseString(jsonString).getAsJsonObject();
String name = jsonObject.get("name").getAsString();
int age = jsonObject.get("age").getAsInt();

System.out.println(name); // "Minh Long"
System.out.println(age);  // 22
```

#### Parse JSON Array

```java
import com.google.gson.reflect.TypeToken;
import java.util.List;

String jsonArray = "[{\"name\":\"Minh Long\"},{\"name\":\"Văn A\"}]";

// Parse thành List
List<User> users = gson.fromJson(
    jsonArray, 
    new TypeToken<List<User>>(){}.getType()
);

users.forEach(user -> {
    System.out.println(user.getName());
});
```

#### Pretty Print

```java
Gson gson = new GsonBuilder()
    .setPrettyPrinting()
    .create();

String json = gson.toJson(user);
// JSON sẽ được format đẹp
```

![JSON in Java](/images/posts/networking/json-java.jpg)

*JSON trong Java - Sử dụng Jackson hoặc Gson*

## So sánh Jackson vs Gson

| Đặc điểm | Jackson | Gson |
|----------|---------|------|
| **Performance** | ⚡ Nhanh hơn | ⚠️ Chậm hơn một chút |
| **API** | Phức tạp hơn | Đơn giản hơn |
| **Spring Integration** | ✅ Tích hợp tốt | ⚠️ Cần config |
| **Annotations** | Nhiều annotations | Ít annotations |
| **Documentation** | Tốt | Tốt |
| **Community** | Rất lớn | Lớn |

**Khuyến nghị:**
- ✅ **Jackson**: Dùng với Spring Boot, cần performance cao
- ✅ **Gson**: Dự án đơn giản, API dễ sử dụng

## Ví dụ thực tế

### Ví dụ 1: Parse JSON từ HTTP Response (Java)

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonApiExample {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        ObjectMapper mapper = new ObjectMapper();
        
        // Gọi API
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.github.com/users/KLBMinhLong"))
            .GET()
            .header("Accept", "application/json")
            .build();
        
        HttpResponse<String> response = client.send(
            request,
            HttpResponse.BodyHandlers.ofString()
        );
        
        if (response.statusCode() == 200) {
            // Parse JSON response
            GitHubUser user = mapper.readValue(
                response.body(), 
                GitHubUser.class
            );
            
            System.out.println("Username: " + user.getLogin());
            System.out.println("Name: " + user.getName());
            System.out.println("Repos: " + user.getPublicRepos());
        }
    }
}

class GitHubUser {
    private String login;
    private String name;
    private int public_repos;
    
    // Getters và Setters
    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public int getPublicRepos() { return public_repos; }
    public void setPublicRepos(int public_repos) { 
        this.public_repos = public_repos; 
    }
}
```

### Ví dụ 2: Tạo và gửi JSON (Java)

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class CreateUserExample {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        ObjectMapper mapper = new ObjectMapper();
        
        // Tạo user object
        User newUser = new User(
            "Nguyễn Minh Long",
            22,
            "nguyenminhlongcntt@gmail.com"
        );
        
        // Chuyển thành JSON
        String jsonData = mapper.writeValueAsString(newUser);
        
        // Gửi POST request
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.example.com/users"))
            .POST(HttpRequest.BodyPublishers.ofString(jsonData))
            .header("Content-Type", "application/json")
            .header("Accept", "application/json")
            .build();
        
        HttpResponse<String> response = client.send(
            request,
            HttpResponse.BodyHandlers.ofString()
        );
        
        if (response.statusCode() == 201) {
            // Parse response
            User createdUser = mapper.readValue(
                response.body(), 
                User.class
            );
            System.out.println("User created: " + createdUser.getName());
        }
    }
}
```

### Ví dụ 3: Xử lý JSON phức tạp (JavaScript)

```javascript
// JSON phức tạp với nested objects và arrays
const apiResponse = {
  status: "success",
  data: {
    users: [
      {
        id: 1,
        name: "Nguyễn Minh Long",
        profile: {
          email: "long@example.com",
          social: {
            github: "KLBMinhLong",
            linkedin: "minh-long-nguyen"
          }
        }
      },
      {
        id: 2,
        name: "Trần Văn A",
        profile: {
          email: "a@example.com"
        }
      }
    ],
    total: 2
  }
};

// Stringify
const jsonString = JSON.stringify(apiResponse, null, 2);
console.log(jsonString);

// Parse
const parsed = JSON.parse(jsonString);

// Truy cập dữ liệu
parsed.data.users.forEach(user => {
  console.log(`${user.name}: ${user.profile.email}`);
  if (user.profile.social?.github) {
    console.log(`  GitHub: ${user.profile.social.github}`);
  }
});
```

### Ví dụ 4: Validate JSON

**JavaScript:**
```javascript
function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

console.log(isValidJSON('{"name":"Minh Long"}')); // true
console.log(isValidJSON('invalid json')); // false
```

**Java:**
```java
public static boolean isValidJSON(String json) {
    try {
        ObjectMapper mapper = new ObjectMapper();
        mapper.readTree(json);
        return true;
    } catch (JsonProcessingException e) {
        return false;
    }
}
```

## Best Practices

### 1. Luôn xử lý lỗi khi parse

```javascript
// ✅ Tốt
try {
  const user = JSON.parse(jsonString);
} catch (error) {
  console.error('Invalid JSON:', error);
  // Xử lý lỗi
}

// ❌ Không tốt
const user = JSON.parse(jsonString); // Có thể throw error
```

### 2. Validate dữ liệu sau khi parse

```javascript
const user = JSON.parse(jsonString);

// Validate
if (!user.name || !user.email) {
  throw new Error('Invalid user data');
}
```

### 3. Dùng TypeScript hoặc JSDoc cho type safety

```typescript
// TypeScript
interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = JSON.parse(jsonString);
```

### 4. Escape special characters

```javascript
// JSON.stringify tự động escape
const text = 'He said "Hello"';
const json = JSON.stringify({ message: text });
// {"message":"He said \"Hello\""}
```

### 5. Xử lý null và undefined

```javascript
// undefined bị bỏ qua khi stringify
const obj = { name: "Minh Long", age: undefined };
JSON.stringify(obj); // {"name":"Minh Long"}

// null được giữ lại
const obj2 = { name: "Minh Long", email: null };
JSON.stringify(obj2); // {"name":"Minh Long","email":null}
```

## Kết luận

Trong bài 11, bạn đã học được:

- ✅ **JSON Format**: Cú pháp và quy tắc
- ✅ **JSON trong JavaScript**: `JSON.stringify()` và `JSON.parse()` (native)
- ✅ **JSON trong Java**: Sử dụng Jackson và Gson
- ✅ **Parse và Stringify**: Cách chuyển đổi giữa object và JSON
- ✅ **Xử lý lỗi**: Validate và xử lý lỗi khi parse
- ✅ **Ví dụ thực tế**: Parse JSON từ API, tạo và gửi JSON

**Best Practices:**
- ✅ Luôn xử lý lỗi khi parse JSON
- ✅ Validate dữ liệu sau khi parse
- ✅ Dùng try-catch cho JSON.parse()
- ✅ Escape special characters đúng cách
- ✅ Xử lý null và undefined cẩn thận

**Lưu ý quan trọng:**
- JavaScript có native JSON support
- Java cần thư viện (Jackson hoặc Gson)
- Luôn validate JSON trước khi parse
- JSON keys phải là strings (trong dấu ngoặc kép)

Với kiến thức về JSON, bạn đã sẵn sàng xử lý dữ liệu từ API và trao đổi dữ liệu giữa client và server một cách hiệu quả!

