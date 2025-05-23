// DOM Elements
const postForm = document.getElementById('post-form');
const postContainer = document.getElementById('post-container');
const loader = document.getElementById('loader');

// API URL
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Sample Islamic History Posts
const samplePosts = [
    {
        id: 1,
        title: "The Birth of Prophet Muhammad ﷺ",
        body: "Prophet Muhammad ﷺ was born in the Year of the Elephant (570 CE) in Makkah. His father Abdullah had passed away before his birth, and his mother Amina raised him until she passed away when he was six years old. He was then cared for by his grandfather Abdul Muttalib and later by his uncle Abu Talib."
    },
    {
        id: 2,
        title: "The First Revelation",
        body: "At the age of 40, while meditating in the Cave of Hira, Prophet Muhammad ﷺ received his first revelation from Allah through the Angel Jibreel (Gabriel). The first words revealed were: 'Read in the name of your Lord who created...' (Surah Al-Alaq 96:1). This marked the beginning of the Quranic revelations."
    },
    {
        id: 3,
        title: "The Hijra to Madinah",
        body: "In 622 CE, Prophet Muhammad ﷺ and his followers migrated from Makkah to Madinah to escape persecution. This event, known as the Hijra, marks the beginning of the Islamic calendar. The people of Madinah welcomed the Muslims with open arms, and this migration established the first Islamic state."
    },
    {
        id: 4,
        title: "The Battle of Badr",
        body: "The Battle of Badr (624 CE) was the first major battle between Muslims and the Quraysh of Makkah. Despite being outnumbered, the Muslims achieved a decisive victory. This battle strengthened the position of the Muslim community in Madinah and demonstrated the divine support for the believers."
    },
    {
        id: 5,
        title: "The Conquest of Makkah",
        body: "In 630 CE, Prophet Muhammad ﷺ led 10,000 Muslims to peacefully conquer Makkah. The conquest was achieved without bloodshed, and the Prophet ﷺ forgave all his former enemies. This event marked a turning point in Islamic history and led to the rapid spread of Islam throughout Arabia."
    },
    {
        id: 6,
        title: "The Farewell Pilgrimage",
        body: "In 632 CE, Prophet Muhammad ﷺ performed his final Hajj, known as the Farewell Pilgrimage. During this pilgrimage, he delivered his famous farewell sermon, which contained important guidance for Muslims. Shortly after returning to Madinah, he passed away at the age of 63."
    },
    {
        id: 7,
        title: "The Compilation of the Quran",
        body: "After the Prophet's ﷺ death, the first Caliph Abu Bakr (RA) ordered the compilation of the Quran into a single book. This task was completed under the supervision of Zaid ibn Thabit (RA). Later, during Uthman's (RA) caliphate, the Quran was standardized and copies were sent to different regions."
    },
    {
        id: 8,
        title: "The Golden Age of Islam",
        body: "From the 8th to the 14th century, the Islamic world experienced a golden age of scientific, cultural, and intellectual achievements. During this period, Muslim scholars made significant contributions to mathematics, astronomy, medicine, philosophy, and architecture. The House of Wisdom in Baghdad became a center of learning and translation."
    },
    {
        id: 9,
        title: "The Ottoman Empire",
        body: "The Ottoman Empire (1299-1922) was one of the longest-lasting and most powerful Islamic empires. It reached its peak under Suleiman the Magnificent (1520-1566). The empire made significant contributions to architecture, art, and culture, and played a crucial role in spreading Islam to new regions."
    },
    {
        id: 10,
        title: "The Modern Islamic Renaissance",
        body: "The 20th and 21st centuries have seen a renewed interest in Islamic scholarship and practice. This period has witnessed the establishment of numerous Islamic educational institutions, the revival of traditional Islamic sciences, and the integration of Islamic values with modern technology and knowledge."
    }
];

// Show/Hide Loader
const toggleLoader = (show) => {
    loader.classList.toggle('hidden', !show);
};

// Load all posts
async function loadPosts() {
    try {
        toggleLoader(true);
        // For demo purposes, we'll use our sample posts instead of the API
        displayPosts(samplePosts);
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
        // For demo purposes, we'll add to our sample posts
        const newPost = {
            id: samplePosts.length + 1,
            title,
            body
        };
        samplePosts.unshift(newPost);
        displayPosts(samplePosts);
        
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
    const post = samplePosts.find(p => p.id === id);
    if (!post) return;

    const newTitle = prompt('Enter new title:', post.title);
    if (!newTitle) return;

    try {
        toggleLoader(true);
        post.title = newTitle;
        displayPosts(samplePosts);
    } catch (error) {
        console.error('Error updating post:', error);
        alert('Failed to update post. Please try again.');
    } finally {
        toggleLoader(false);
    }
}

// Delete post
async function deletePost(id) {
    if (!confirm('Are you sure you want to delete this historical entry?')) return;

    try {
        toggleLoader(true);
        const index = samplePosts.findIndex(p => p.id === id);
        if (index !== -1) {
            samplePosts.splice(index, 1);
            displayPosts(samplePosts);
        }
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