// DOM Elements
const postForm = document.getElementById('post-form');
const postContainer = document.getElementById('post-container');
const loader = document.getElementById('loader');

// API URL
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Show/Hide Loader
const toggleLoader = (show) => {
    loader.classList.toggle('hidden', !show);
};

// Load all posts
async function loadPosts() {
    try {
        toggleLoader(true);
        const res = await fetch(API_URL);
        const posts = await res.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Error loading posts:', error);
        alert('Failed to load posts. Please try again.');
    } finally {
        toggleLoader(false);
    }
}

// Display posts in the container
function displayPosts(posts) {
    postContainer.innerHTML = posts.map(post => `
        <div class="post-card" data-id="${post.id}">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <div class="post-actions">
                <button class="btn edit-btn" onclick="editPost(${post.id})">Edit</button>
                <button class="btn delete-btn" onclick="deletePost(${post.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Create new post
async function createPost(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    try {
        toggleLoader(true);
        const res = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                title,
                body,
                userId: 1
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const newPost = await res.json();
        const posts = await fetch(API_URL).then(res => res.json());
        displayPosts([newPost, ...posts]);
        
        // Clear form
        postForm.reset();
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post. Please try again.');
    } finally {
        toggleLoader(false);
    }
}

// Edit post
async function editPost(id) {
    const newTitle = prompt('Enter new title:');
    if (!newTitle) return;

    try {
        toggleLoader(true);
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                title: newTitle
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const updatedPost = await res.json();
        const posts = await fetch(API_URL).then(res => res.json());
        displayPosts(posts);
    } catch (error) {
        console.error('Error updating post:', error);
        alert('Failed to update post. Please try again.');
    } finally {
        toggleLoader(false);
    }
}

// Delete post
async function deletePost(id) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
        toggleLoader(true);
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        const posts = await fetch(API_URL).then(res => res.json());
        displayPosts(posts);
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
    } finally {
        toggleLoader(false);
    }
}

// Event Listeners
postForm.addEventListener('submit', createPost);

// Initial load
loadPosts(); 