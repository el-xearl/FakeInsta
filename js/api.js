export async function getUsers() {
    const res = await fetch('data/users.json'); 
    return await res.json();
}

export async function getPosts() {
    const res = await fetch('data/posts.json'); 
    return await res.json();
}

export async function getPhotos() {
    const res = await fetch('data/photos.json'); 
    return await res.json();
}

export async function getComments() {
    const res = await fetch('data/comments.json'); 
    return res.json();
}
