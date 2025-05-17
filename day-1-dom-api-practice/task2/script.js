function loadPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => displayPosts(data.slice(0, 10))); 
  }
  
  function displayPosts(posts) {
    const container = document.getElementById('posts-container');
    container.innerHTML = '';
  
    posts.forEach(post => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      `;
      container.appendChild(div);
    });
  }
  