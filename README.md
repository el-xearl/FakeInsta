Here is your **English, clean, professional GitHub-ready README** for *FakeInsta*.

---

# 📸 **FakeInsta – Instagram Clone**

FakeInsta is a simple Instagram-style clone built using **HTML, CSS, and Vanilla JavaScript**.
All data is loaded from local JSON files inside the `/data` folder, simulating an API.

---

## 🚀 Features

### ✔ **Login Screen**

A minimal demo login page.

### ✔ **Story Bar**

Displays profile photos as stories, similar to Instagram.

### ✔ **Feed (Posts)**

Each post includes:

* Post title
* Post body
* User info
* Photo
* Randomized like count
* Randomized comment list

### ✔ **Like System**

* Every post starts with a random number of likes
* Clicking the like button increases the like count by **+1**

### ✔ **Comment Button**

A comment icon takes the user directly to the **comment section** of that post.

### ✔ **Local JSON Data (Fake API)**

The app loads:

* `users.json`
* `posts.json`
* `photos.json`
* `comments.json`

Fetch paths are GitHub Pages–compatible:

```js
fetch("data/posts.json");
fetch("data/users.json");
fetch("data/photos.json");
fetch("data/comments.json");
```

---

## 📂 Project Structure

```
/css
    style.css
    home.css

/js
    app.js
    feed.js
    api.js

/data
    users.json
    posts.json
    photos.json
    comments.json

/img
    (icons & images)

home.html
login.html
README.md
```

---

## 🛠 Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript
* JSON (mock data)
* Fetch API

---

## 📦 Installation & Setup

1. Clone the repository:

```
git clone https://github.com/<your-username>/FakeInsta.git
```

2. Open the project using a local server
   (VS Code **Live Server** extension recommended)

3. Open `home.html` in the browser.

The app will load automatically.

---

## 🌐 Using on GitHub Pages

When hosting on GitHub Pages, **do NOT use leading slashes** in fetch paths.

❌ Wrong:

```
fetch("/data/posts.json")
```

✅ Correct:

```
fetch("data/posts.json")
```

---

## 📜 License

This project is for **educational purposes only**.
It has no affiliation with Instagram or Meta.

---

