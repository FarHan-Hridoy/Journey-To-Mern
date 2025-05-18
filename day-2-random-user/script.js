// Global variables
let allUsers = [];
const searchInput = document.getElementById('searchInput');
const loading = document.getElementById('loading');
const modal = document.getElementById('userModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');

// Load users from API
function loadUsers() {
    loading.style.display = 'block';
    fetch('https://randomuser.me/api/?results=20')  // Fetch more to ensure we get 10 males
        .then(res => res.json())
        .then(data => {
            // Filter for male users only
            allUsers = data.results.filter(user => user.gender === 'male').slice(0, 10);
            displayUsers(allUsers);
            loading.style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
            loading.style.display = 'none';
        });
}

// Display users in cards
function displayUsers(users) {
    const container = document.getElementById('user-container');
    container.innerHTML = '';

    if (users.length === 0) {
        container.innerHTML = '<p style="text-align: center;">No users found</p>';
        return;
    }

    users.forEach(user => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <h3>${user.name.title} ${user.name.first} ${user.name.last}</h3>
            <p>Gender: ${user.gender}</p>
            <p>Country: ${user.location.country}</p>
            <button onclick="showUserDetails('${user.email}')">Details</button>
        `;
        container.appendChild(div);
    });
}

// Show user details in modal
function showUserDetails(email) {
    const user = allUsers.find(u => u.email === email);
    if (user) {
        modalContent.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}" style="width: 150px; height: 150px; border-radius: 50%;">
            <h2>${user.name.title} ${user.name.first} ${user.name.last}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Location:</strong> ${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}</p>
            <p><strong>Age:</strong> ${user.dob.age}</p>
        `;
        modal.style.display = 'block';
    }
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = allUsers.filter(user => 
        user.name.first.toLowerCase().includes(searchTerm) ||
        user.name.last.toLowerCase().includes(searchTerm)
    );
    displayUsers(filteredUsers);
});

// Close modal when clicking the X
closeBtn.onclick = function() {
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Initial load
loadUsers(); 