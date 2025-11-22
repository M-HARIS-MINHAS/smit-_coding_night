const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Auth
const signupCard = document.getElementById('signup-card');
const loginCard = document.getElementById('login-card');
const goLogin = document.getElementById('go-login');
const goSignup = document.getElementById('go-signup');
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');
const authSection = document.getElementById('auth-section');
const welcomeUser = document.getElementById('welcome-user');

// Feed
const postBtn = document.getElementById('post-btn');
const postText = document.getElementById('post-text');
const postImage = document.getElementById('post-image');
const postsFeed = document.getElementById('posts-feed');
const searchInput = document.getElementById('search-posts');
const sortSelect = document.getElementById('sort-posts');

let posts = [];

// === Dark/Light Mode ===
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// === Switch Auth Forms ===
goLogin.addEventListener('click', () => {
    signupCard.style.display = 'none';
    loginCard.style.display = 'block';
});
goSignup.addEventListener('click', () => {
    loginCard.style.display = 'none';
    signupCard.style.display = 'block';
});

// === Signup/Login ===
signupBtn.addEventListener('click', () => {
    const name = document.getElementById('signup-name').value.trim();
    if(!name) return alert("✋ Please enter your name!");
    welcomeUser.textContent = `👋 ${name}`;
    authSection.style.display = 'none';
});
loginBtn.addEventListener('click', () => {
    const email = document.getElementById('login-email').value.trim();
    if(!email) return alert("📧 Please enter your email!");
    welcomeUser.textContent = `👋 User`;
    authSection.style.display = 'none';
});

// === Create Post ===
postBtn.addEventListener('click', () => {
    const text = postText.value.trim();
    const image = postImage.value.trim();
    if(!text && !image) return alert("⚠️ Post cannot be empty!");
    const post = { id: Date.now(), text, image, likes:0, date:new Date() };
    posts.unshift(post);
    postText.value=''; postImage.value='';
    renderPosts();
});

// === Render Posts ===
function renderPosts(filteredPosts){
    const displayPosts = filteredPosts || posts;
    postsFeed.innerHTML='';
    displayPosts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <div class="post-header">
                <img src="assesssts/502812481_1111382034135680_3549831926681809439_n.jpg" alt="Profile" class="profile-pic">
                <strong>${welcomeUser.textContent}</strong>
                <small>🕒 ${post.date.toLocaleString()}</small>
            </div>
            <p>💬 ${post.text}</p>
            ${post.image ? `<img src="${post.image}" alt="Post Image">` : ''}
            <div class="actions">
                <button onclick="toggleLike(${post.id})">❤️ ${post.likes}</button>
                <button onclick="deletePost(${post.id})">🗑️ Delete</button>
            </div>
        `;
        postsFeed.appendChild(postEl);
    });
}

// === Like/Unlike Post ===
function toggleLike(id){
    posts = posts.map(post => { if(post.id===id) post.likes = post.likes?0:1; return post; });
    renderPosts();
}

// === Delete Post ===
function deletePost(id){
    if(!confirm("❌ Are you sure you want to delete this post?")) return;
    posts = posts.filter(post => post.id!==id);
    renderPosts();
}

// === Search Posts ===
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = posts.filter(post => post.text.toLowerCase().includes(query));
    renderPosts(filtered);
});

// === Sort Posts ===
sortSelect.addEventListener('change', () => {
    if(sortSelect.value==='latest') posts.sort((a,b)=>b.id-a.id);
    if(sortSelect.value==='oldest') posts.sort((a,b)=>a.id-b.id);
    if(sortSelect.value==='most-liked') posts.sort((a,b)=>b.likes-b.likes);
    renderPosts();
});
