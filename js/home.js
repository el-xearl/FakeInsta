import { getUsers, getPosts, getPhotos, getComments } from './api.js';
// Story sistemi

const storyContainer = document.getElementById("stories");
const storyModal = document.getElementById("storyModal");
const storyImage = document.getElementById("storyImage");

async function loadStories() {
    const users = await getUsers(); // fake user verileri
    storyContainer.innerHTML = "";

    const storyCount = Math.floor(Math.random() * 5) + 8;

    for (let i = 0; i < storyCount; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];

        // Story küçük, modal büyük
        const storySmall = `https://picsum.photos/70/70?random=${Math.floor(Math.random() * 5000)}`;
        const storyLarge = `https://picsum.photos/600/600?random=${Math.floor(Math.random() * 5000)}`;

        const div = document.createElement("div");
        div.className = "story-item";

        div.innerHTML = `<img src="${storySmall}" alt="${randomUser.username} Story">`;

        div.addEventListener("click", () => {
            storyImage.src = storyLarge; // modalda büyük boyut
            storyModal.classList.remove("hidden");
        });

        storyContainer.appendChild(div);
    }
}

// Modal kapatma
storyModal.addEventListener("click", () => {
    storyModal.classList.add("hidden");
});

// Storyleri yükle
loadStories();


// Feed bölümünü seçiyoruz
const feed = document.getElementById("feed");

// Navbar butonları
const toProfileBtn = document.getElementById('toProfileBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Login kontrolü: Eğer kullanıcı login değilse login sayfasına yönlendir
const currentUserId = localStorage.getItem('userId');
const currentUserName = localStorage.getItem('username') || 'Anonim';
if (!currentUserId) {
    window.location.href = 'index.html';
}

// Navbar butonları işlevi
toProfileBtn.addEventListener('click', () => window.location.href = 'profile.html');
logoutBtn.addEventListener('click', () => {
    localStorage.clear(); // Login bilgilerini temizle
    window.location.href = 'index.html';
});

// Feed verisi için array ve index
let feedData = []; 
let feedIndex = 1;

// Rastgele post üretme fonksiyonu
async function generateRandomPosts(batch = 10) {
    const users = await getUsers();
    const posts = await getPosts();
    const photos = await getPhotos();
    const commentsJson = await getComments();

    for (let i = 0; i < batch; i++) {
        const post = posts[Math.floor(Math.random() * posts.length)];
        const user = users[Math.floor(Math.random() * users.length)];
        const photo = photos[Math.floor(Math.random() * photos.length)];

        let photoUrl = photo.url;
        if (!photoUrl || photoUrl.includes("via.placeholder.com")) {
            photoUrl = `https://picsum.photos/600?random=${Math.random()}`;
        }

        const likes = Math.floor(Math.random() * 1000);

        const comments = [];
        const commentCount = Math.floor(Math.random() * 3) + 2;

        for (let j = 0; j < commentCount; j++) {
            const randomComment = commentsJson[Math.floor(Math.random() * commentsJson.length)];
            const randomUser = users[Math.floor(Math.random() * users.length)];

            comments.push({
                user: randomUser.username,
                text: randomComment.body
            });
        }

        feedData.push({
            id: feedIndex++,
            title: post.title,
            body: post.body,
            user,
            photoUrl,
            liked: false,
            likes,
            comments
        });
    }

    displayPosts();
}

// Feed'i ekranda gösterme fonksiyonu
function displayPosts() {
    feed.innerHTML = '';

    feedData.forEach(post => {
        const card = document.createElement('div');
        card.className = 'post-card';

        const userAvatar = post.user.profilePhoto || '/img/default-profile.jpg';

        card.innerHTML = `
            <div class="post-header">
                <img src="${userAvatar}" alt="Avatar" class="post-user-avatar">
                <span class="username">${post.user.name}</span>
            </div>

            <img src="${post.photoUrl}" class="post-img">

          <div class="post-actions">
    <button class="like-btn" data-id="${post.id}">
        ${post.liked ? '❤️' : '🤍'} <span class="like-count">${post.likes}</span>
    </button>

    <!-- 🆕 Yorum ikonu -->
    <button class="comment-btn" data-id="${post.id}">
        💬
    </button>
</div>


            <div class="comments">
                ${post.comments.map(c => `<div class="comment"><b>${c.user}</b>: ${c.text}</div>`).join('')}
                <input class="comment-input" placeholder="Yorum yap..." data-id="${post.id}">
            </div>
        `;

        feed.appendChild(card);
    });
}

// Like butonuna tıklama işlemi
document.addEventListener('click', e => {
    if (!e.target.classList.contains('like-btn') && !e.target.classList.contains('like-count')) return;

    // Eğer span tıklanırsa buton elementini al
    const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('.like-btn');
    const id = button.dataset.id;
    const post = feedData.find(p => p.id == id);

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    // Sadece sayı ve emoji güncelleniyor
    const span = button.querySelector('.like-count');
    span.textContent = post.likes;
    button.innerHTML = `${post.liked ? '❤️' : '🤍'} <span class="like-count">${post.likes}</span>`;
});


// Yorum ekleme

document.addEventListener('keypress', e => {
    if (!e.target.classList.contains('comment-input') || e.key !== 'Enter') return;

    const id = e.target.dataset.id;
    const post = feedData.find(p => p.id == id);

    // Yeni yorum ekle
    post.comments.push({
        user: currentUserName,
        text: e.target.value
    });

    e.target.value = ''; // inputu temizle
    displayPosts();      // postları tekrar göster
});

// Sonsuz scroll

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        generateRandomPosts(5); // sayfa sonuna yaklaşıldığında yeni post ekle
    }
});


// Sayfa yüklendiğinde başlangıç postları

window.addEventListener('DOMContentLoaded', () => {
    generateRandomPosts(15); // başlangıçta 15 post
});
// 🆕 Yorum ikonuna basınca yorum alanına inme + focus
document.addEventListener("click", e => {
    if (!e.target.classList.contains("comment-btn")) return;

    const id = e.target.dataset.id;

    // Bu posta ait yorum inputunu bul
    const input = document.querySelector(`.comment-input[data-id="${id}"]`);

    if (input) {
        input.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => input.focus(), 300);
    }
});
