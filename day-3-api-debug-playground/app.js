// DOM Elements
const loading = document.getElementById('loading');
const statusInfo = document.getElementById('status-info');
const userContainer = document.getElementById('user-container');
const searchInput = document.getElementById('searchInput');

// Islamic names data
const islamicNames = {
    male: [
        { first: "Muhammad", last: "Ali" },
        { first: "Ahmed", last: "Hassan" },
        { first: "Ibrahim", last: "Khan" },
        { first: "Omar", last: "Rahman" },
        { first: "Yusuf", last: "Malik" },
        { first: "Zain", last: "Hussain" },
        { first: "Hamza", last: "Iqbal" },
        { first: "Bilal", last: "Kareem" },
        { first: "Tariq", last: "Noor" },
        { first: "Khalid", last: "Rashid" }
    ],
    female: [
        { first: "Aisha", last: "Fatima" },
        { first: "Zainab", last: "Khan" },
        { first: "Maryam", last: "Ali" },
        { first: "Safiya", last: "Hassan" },
        { first: "Khadija", last: "Rahman" },
        { first: "Fatima", last: "Malik" },
        { first: "Layla", last: "Hussain" },
        { first: "Noor", last: "Iqbal" },
        { first: "Amina", last: "Kareem" },
        { first: "Hafsa", last: "Rashid" }
    ]
};

// Store loaded users globally
let loadedUsers = [];

// Function to get a random Islamic name
function getRandomIslamicName() {
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    const names = islamicNames[gender];
    const randomName = names[Math.floor(Math.random() * names.length)];
    return {
        ...randomName,
        gender
    };
}

// Function to create a user with Islamic name
function createUserWithIslamicName(user) {
    const islamicName = getRandomIslamicName();
    return {
        ...user,
        name: {
            first: islamicName.first,
            last: islamicName.last
        },
        gender: islamicName.gender
    };
}

// Function to create user card with animation
function createUserCard(user, index) {
    const userCard = document.createElement('div');
    userCard.className = 'user-card animate__animated animate__fadeIn';
    userCard.style.animationDelay = `${index * 0.1}s`;
    
    userCard.innerHTML = `
        <h3 class="arabic-text">${user.name.first} ${user.name.last}</h3>
        <p><strong>Gender:</strong> ${user.gender}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
    `;
    
    return userCard;
}

// Function to filter users based on search input
function filterUsers(searchTerm) {
    const filteredUsers = loadedUsers.filter(user => {
        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });
    
    displayUsers(filteredUsers);
}

// Function to display users
function displayUsers(users) {
    userContainer.innerHTML = '';
    users.forEach((user, index) => {
        const userCard = createUserCard(user, index);
        userContainer.appendChild(userCard);
    });
}

// Function to load users
async function loadUsers(isCorrectAPI) {
    loading.style.display = 'block';
    userContainer.innerHTML = '';
    statusInfo.innerHTML = '';

    try {
        const url = isCorrectAPI 
            ? 'https://randomuser.me/api/?results=10'
            : 'https://randomuser.me/api/incorrect';

        console.log(`Attempting to fetch from: ${url}`);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('API Response:', data);

        if (!isCorrectAPI) {
            throw new Error('This is a simulated error for the broken API endpoint');
        }

        // Transform the data to use Islamic names
        loadedUsers = data.results.map(createUserWithIslamicName);
        displayUsers(loadedUsers);

        statusInfo.innerHTML = `
            <strong>Status:</strong> Success<br>
            <strong>API Endpoint:</strong> ${url}<br>
            <strong>Users Loaded:</strong> ${loadedUsers.length}
        `;

    } catch (error) {
        console.error('Error:', error);
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message animate__animated animate__shakeX';
        errorMessage.innerHTML = `
            <strong>Error:</strong> ${error.message}<br>
            <strong>API Endpoint:</strong> ${isCorrectAPI ? 'Correct' : 'Broken'}<br>
            <strong>Time:</strong> ${new Date().toLocaleTimeString()}
        `;
        userContainer.appendChild(errorMessage);

        statusInfo.innerHTML = `
            <strong>Status:</strong> Error<br>
            <strong>API Endpoint:</strong> ${url}<br>
            <strong>Error Message:</strong> ${error.message}
        `;
    } finally {
        loading.style.display = 'none';
    }
}

// Add search functionality
searchInput.addEventListener('input', (e) => {
    filterUsers(e.target.value);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        loadUsers(true);
    }
});

// Bonus: Test with slow internet
function simulateSlowInternet() {
    const slowUrl = 'https://jsonplaceholder.typicode.com/users';
    console.log('🌐 Testing with slow internet simulation...');
    
    // Add artificial delay
    setTimeout(() => {
        fetch(slowUrl)
            .then(res => res.json())
            .then(data => {
                console.log('✅ Slow connection test completed');
                displayUsers(data);
            })
            .catch(error => console.error('❌ Error:', error));
    }, 3000); // 3 second delay
}

// Bonus: Test with custom fake API
function testCustomAPI() {
    const fakeUrl = 'https://jsonplaceholder.typicode.com/nonexistent';
    console.log('🌐 Testing with custom fake API...');
    
    fetch(fakeUrl)
        .then(res => {
            if (!res.ok) throw new Error(`Custom API Error: ${res.status}`);
            return res.json();
        })
        .then(data => console.log('✅ Custom API test completed'))
        .catch(error => console.error('❌ Custom API Error:', error));
} 