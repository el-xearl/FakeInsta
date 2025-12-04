import { getUsers, getPosts, getPhotos } from './api.js';


// HTML elementlerini seçiyoruz

const profileName = document.getElementById('profileName');       // Profildeki isim
const profileUsername = document.getElementById('profileUsername'); // Profil kullanıcı adı
const postCount = document.getElementById('postCount');           // Post | Followers | Following
const profilePosts = document.getElementById('profilePosts');     // Kullanıcının postları
const toHomeBtn = document.getElementById('toHomeBtn');           // Navbar home butonu
const logoutBtn = document.getElementById('logoutBtn');           // Navbar çıkış butonu
const profilePhoto = document.querySelector('.avatar img');       // Profil avatar img


// Login kontrolü

const currentUserId = localStorage.getItem('userId');
const currentUserName = localStorage.getItem('username') || 'Anonim';
if(!currentUserId){
    window.location.href = 'index.html'; // Login değilse yönlendir
}


// Navbar butonları işlevleri

toHomeBtn.addEventListener('click', () => {
    window.location.href = 'home.html';
});

logoutBtn.addEventListener('click', () => {
    localStorage.clear();           // Login bilgilerini temizle
    window.location.href = 'index.html';
});


// Profil sayfasını render etme

async function renderProfile() {
    // API'den kullanıcılar, postlar ve fotoğrafları al
    const users = await getUsers();
    const posts = await getPosts();
    const photos = await getPhotos();

    // Giriş yapan kullanıcıyı bul
    const user = users.find(u => u.id == currentUserId);

    // Profil fotoğrafı: yoksa default avatar kullan
    const profilePhotoUrl = user?.profilePhoto || '/img/default-profile.jpg';
    profilePhoto.src = profilePhotoUrl;

    // Kullanıcı bilgilerini göster
    profileName.textContent = user?.name || currentUserName;
    profileUsername.textContent = '@' + (user?.username || 'anon');

    // Kullanıcının postlarını filtrele
    const userPosts = posts.filter(p => p.userId == currentUserId);

    // Post sayısı, followers ve following sayısı
    const followers = Math.floor(Math.random() * 500); 
    const following = Math.floor(Math.random() * 500);
    postCount.textContent = `${userPosts.length} Post | ${followers} Followers | ${following} Following`;

    // Kullanıcının postlarını ekranda göster
    profilePosts.innerHTML = ''; // önce temizle
    userPosts.forEach(post => {
        // Random foto seçimi
        let photo = photos[Math.floor(Math.random() * photos.length)];
        let photoUrl = photo?.url || `https://picsum.photos/200?random=${Math.random()}`;
        
        // Eğer placeholder gelirse fallback ile Picsum kullan
        if(photoUrl.includes("via.placeholder.com")){
            photoUrl = `https://picsum.photos/200?random=${Math.random()}`;
        }

        // Post öğesini oluştur ve ekle
        const div = document.createElement('div');
        div.className = 'post-item';
        div.innerHTML = `<img src="${photoUrl}" alt="Post">`;
        profilePosts.appendChild(div);
    });
}


// Sayfa yüklendiğinde çalıştır

window.addEventListener('DOMContentLoaded', renderProfile);
