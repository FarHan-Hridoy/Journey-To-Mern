# Day 9: Promises & Async/Await Playground

## Overview
An interactive playground demonstrating the differences between Promise-based and Async/Await approaches to handling asynchronous operations in JavaScript.

## Features

### 1. Side-by-Side Comparison
- Promise implementation
- Async/Await implementation
- Visual code examples
- Real-time output display

### 2. User Interface
- Clean, modern design
- Loading indicators
- Error handling
- User profile display
- JSON data visualization

### 3. Interactive Elements
- Separate buttons for each implementation
- Real-time data fetching
- Visual feedback during loading
- Error state handling

## Key Concepts Demonstrated

### 1. Promises
- Promise chaining
- Error handling with .catch()
- Promise resolution
- Data transformation

### 2. Async/Await
- Async function declaration
- Await operator usage
- Try/catch error handling
- Sequential async operations

### 3. Data Fetching
- Fetch API usage
- JSON parsing
- Error handling
- Loading states

## Code Examples

### Promise Implementation
```javascript
function loadDataWithPromise() {
    return fetch("https://randomuser.me/api/")
        .then(res => res.json())
        .then(data => data.results[0])
        .catch(err => {
            throw new Error("Failed to fetch: " + err.message);
        });
}
```

### Async/Await Implementation
```javascript
async function loadDataWithAsync() {
    try {
        const res = await fetch("https://randomuser.me/api/");
        const data = await res.json();
        return data.results[0];
    } catch (err) {
        throw new Error("Failed to fetch: " + err.message);
    }
}
```

## How to Use
1. Open `index.html` in a web browser
2. Click either "Fetch with Promise" or "Fetch with Async/Await"
3. Observe the loading state and data display
4. Compare the implementations side by side

## Learning Points
- Understanding Promise-based async operations
- Converting Promise chains to Async/Await
- Error handling in both approaches
- Best practices for async code
- Data fetching and transformation

## API Used
- Random User Generator API (https://randomuser.me/api/)
- Fetch API
- JSON parsing

## Resources
- [MDN Web Docs - Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN Web Docs - Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [JavaScript.info - Promises](https://javascript.info/promise-basics)
- [JavaScript.info - Async/Await](https://javascript.info/async-await) 