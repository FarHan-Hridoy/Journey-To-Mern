async function loadUsers() {
  const loader = document.getElementById('loader');
  const container = document.getElementById('users-container');
  loader.classList.add('show');
  container.innerHTML = '';
  try {
    const res = await fetch('https://randomuser.me/api/?results=5');
    if (!res.ok) throw new Error('Failed to fetch users');
    const data = await res.json();
    displayUsers(data.results);
  } catch (error) {
    container.innerHTML = `<p style='color:red;text-align:center;'>${error.message}</p>`;
  } finally {
    loader.classList.remove('show');
  }
}

function displayUsers(users) {
  const container = document.getElementById('users-container');
  container.innerHTML = '';
  users.forEach(user => {
    const div = document.createElement('div');
    div.className = 'user-card';
    div.innerHTML = `
      <img src="${user.picture.medium}" alt="${user.name.first}">
      <h3>${user.name.first} ${user.name.last}</h3>
      <p>Email: ${user.email}</p>
    `;
    container.appendChild(div);
  });
}

// Initial load
loadUsers(); 