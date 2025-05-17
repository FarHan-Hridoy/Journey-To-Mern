function loadUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => displayUsers(data))
    .catch(error => console.error('Error:', error));
}

function displayUsers(users) {
  const container = document.getElementById('users-container');
  container.innerHTML = '';

  users.forEach(user => {
    const div = document.createElement('div');
    div.style.border = '1px solid #ccc';
    div.style.margin = '10px';
    div.style.padding = '10px';

    div.innerHTML = `
      <h3>Name: ${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
    `;

    container.appendChild(div);
  });
}
