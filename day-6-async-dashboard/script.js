// JavaScript Engine and Execution Context Explanation
console.log("Script start - Global Execution Context created");
console.log("V8 Engine starts parsing and executing the code");

// DOM Elements
const clockElement = document.getElementById("clock");
const loaderElement = document.getElementById("loader");
const userElement = document.getElementById("user");
const tasksElement = document.getElementById("tasks");
const retryButton = document.getElementById("retry-btn");

// Clock using setInterval
console.log("Setting up clock interval - Event Loop will handle this");
setInterval(() => {
    // This callback will be executed every second by the Event Loop
    clockElement.innerText = `🕒 ${new Date().toLocaleTimeString()}`;
}, 1000);

// Simulate initial loading with setTimeout
console.log("Setting up loading timeout - Event Loop will handle this");
setTimeout(() => {
    // This callback will be executed after 2 seconds by the Event Loop
    loaderElement.innerText = "✅ Loaded!";
}, 2000);

// Custom user data
const userData = {
    name: "Farhan Hridoy",
    email: "farhan.hridoy@example.com",
    city: "Dhaka",
    company: "Tech Solutions Inc.",
    role: "Software Engineer",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
    experience: "2+ years",
    education: "BSc in Computer Science"
};

// Custom software engineering tasks
const engineeringTasks = [
    { title: "Complete MERN Stack Portfolio Project", completed: true },
    { title: "Implement RESTful API endpoints", completed: true },
    { title: "Write unit tests for authentication module", completed: false },
    { title: "Optimize database queries", completed: false },
    { title: "Code review for frontend components", completed: true },
    { title: "Deploy application to production", completed: false },
    { title: "Update LinkedIn profile with new projects", completed: false },
    { title: "Prepare for technical interviews", completed: false }
];

// Async function to load user and tasks
async function loadDashboard() {
    console.log("loadDashboard called - New Execution Context created");
    
    try {
        console.log("📤 Loading data - Call stack non-blocking...");
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Data loaded - Ready to update DOM");

        // Update user information
        userElement.innerHTML = `
            <h2>👤 ${userData.name}</h2>
            <p>📧 ${userData.email}</p>
            <p>📍 ${userData.city}</p>
            <p>🏢 ${userData.company}</p>
            <p>💻 ${userData.role}</p>
            <p>⭐ Experience: ${userData.experience}</p>
            <p>🎓 ${userData.education}</p>
            <p>🛠️ Skills: ${userData.skills.join(", ")}</p>
        `;

        // Update tasks
        const taskHTML = engineeringTasks.map(t =>
            `<li>${t.completed ? "✅" : "❌"} ${t.title}</li>`
        ).join("");
        
        tasksElement.innerHTML = `
            <h3>📝 Career Development Tasks:</h3>
            <ul>${taskHTML}</ul>
        `;

        console.log("✅ Data displayed - Event loop finished the async job");
        
        // Hide retry button if everything is successful
        retryButton.style.display = 'none';
        
    } catch (err) {
        console.error("❌ Error caught:", err);
        userElement.innerHTML = `<p style="color:red;">Error loading user data</p>`;
        tasksElement.innerHTML = `<p style="color:red;">Error loading tasks</p>`;
        
        // Show retry button on error
        retryButton.style.display = 'block';
    } finally {
        console.log("🧹 Cleanup with finally block");
        loaderElement.style.display = 'none';
    }
}

// Add retry functionality
retryButton.addEventListener('click', () => {
    console.log("Retry button clicked - Starting new data fetch");
    loaderElement.style.display = 'block';
    loaderElement.innerText = "⏳ Loading data...";
    loadDashboard();
});

// Initial load
console.log("Calling loadDashboard - Starting the async operation");
loadDashboard(); 