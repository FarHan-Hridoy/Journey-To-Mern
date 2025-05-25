# Day 8: Event Loop Playground

## Overview
An interactive visualization tool to understand JavaScript's Event Loop, Task Queue, and Microtask Queue behavior.

## Features

### 1. Visual Event Loop Demonstration
- Real-time visualization of the Call Stack
- Microtask Queue visualization
- Task Queue visualization
- Step-by-step execution of code

### 2. Code Examples
- Basic Event Loop example with setTimeout and Promise
- Visual representation of execution order
- Console output display

### 3. Interactive Elements
- Run button to start the demonstration
- Clear visualization of queue states
- Color-coded elements for different types of tasks

## Key Concepts Demonstrated

### 1. Event Loop
- How JavaScript handles asynchronous operations
- The role of the Call Stack
- Queue processing order

### 2. Task Queues
- Microtask Queue (Promises)
- Task Queue (setTimeout, setInterval)
- Priority of queue processing

### 3. Execution Order
- Synchronous vs Asynchronous code
- Promise resolution timing
- setTimeout behavior

## Example Code
```javascript
console.log("1. Script start");

setTimeout(() => {
    console.log("2. setTimeout callback");
}, 0);

Promise.resolve().then(() => {
    console.log("3. Promise resolved");
});

console.log("4. Script end");
```

## Expected Output
```
1. Script start
4. Script end
3. Promise resolved
2. setTimeout callback
```

## How to Use
1. Open `index.html` in a web browser
2. Click the "Run Example" button
3. Watch the visualization of:
   - Code execution in the Call Stack
   - Promise resolution in the Microtask Queue
   - setTimeout callback in the Task Queue
4. Observe the console output order

## Learning Points
- Understanding the Event Loop mechanism
- Difference between microtasks and macrotasks
- How JavaScript handles asynchronous operations
- The importance of queue processing order

## Resources
- [MDN Web Docs - Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [JavaScript.info - Event Loop](https://javascript.info/event-loop)
- [Philip Roberts: What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ) 