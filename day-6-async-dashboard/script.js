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

// Async function to load user and tasks
async function loadDashboard() {
    console.log("loadDashboard called - New Execution Context created");
    
    try {
        console.log("📤 Fetching data - Call stack non-blocking...");
        console.log("Promise.all creates multiple microtasks");
        
        // Using Promise.all to load multiple API endpoints concurrently
        const [userRes, tasksRes] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users/1"),
            fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
        ]);

        console.log("API responses received - Microtasks completed");

        if (!userRes.ok || !tasksRes.ok) {
            throw new Error("Failed to load data");
        }

        // Parse JSON responses
        const user = await userRes.json();
        const tasks = await tasksRes.json();

        console.log("Data parsed - Ready to update DOM");

        // Update user information
        userElement.innerHTML = `
            <h2>👤 ${user.name}</h2>
            <p>📧 ${user.email}</p>
            <p>📍 ${user.address.city}</p>
            <p>🏢 ${user.company.name}</p>
        `;

        // Update tasks
        const taskHTML = tasks.slice(0, 5).map(t =>
            `<li>${t.completed ? "✅" : "❌"} ${t.title}</li>`
        ).join("");
        
        tasksElement.innerHTML = `
            <h3>📝 Top Tasks:</h3>
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