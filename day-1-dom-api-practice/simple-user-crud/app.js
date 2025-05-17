// GET - Load users
function loadUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => displayUsers(users.slice(0, 5))); 
  }
  
  function displayUsers(users) {
    const container = document.getElementById('users-container');
    container.innerHTML = '';
    users.forEach(user => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${user.name}</h3>
        <p>${user.email}</p>
        <button onclick="deleteUser(${user.id})">Delete</button>
        <hr>
      `;
      container.appendChild(div);
    });
  }
  
  // POST - Add new user
  function addUser() {
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
  
    const newUser = { name, email };
  
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        alert('User added (fake)');
        loadUsers();
      });
  }
  
  // DELETE - Delete user
  function deleteUser(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          alert(`User ${id} deleted (fake)`);
          loadUsers();
        }
      });
  }
  
  // Initial Load
  loadUsers();
  