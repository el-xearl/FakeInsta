import { getUsers } from './api.js';

const select = document.getElementById('userSelect');
const loginBtn = document.getElementById('loginBtn');

async function init() {
    const users = await getUsers();

    // Dropdown oluştur
    select.innerHTML = users.map(u => 
        `<option value="${u.id}">${u.name} (@${u.username})</option>`
    ).join('');
}

// Giriş butonu
loginBtn.addEventListener('click', () => {
    const id = select.value;
    if(!id) return alert('Lütfen bir kullanıcı seçin');

    // Kullanıcı id ve username kaydı
    const selectedUser = select.options[select.selectedIndex];
    localStorage.setItem('userId', id);
    localStorage.setItem('username', selectedUser.textContent.split(' (@')[1].slice(0, -1));

    // Home sayfasına yönlendir
    window.location.href = 'home.html';
});

init();
