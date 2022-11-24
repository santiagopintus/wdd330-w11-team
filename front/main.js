import makeRequest from "./authHelpers.js";
import Auth from "./Auth.js";

const main = () => {
  listenLogin();
};

const listenLogin = () => {
  document.getElementById("loginBtn").addEventListener("click", e => runAuthProcess(e));
}

const runAuthProcess = (e) => {
  e.preventDefault();
  const auth = new Auth();
  auth.login(token => getPosts(token));
}

const getPosts = token => {
  makeRequest('posts', "GET", null, token).then(res => showPosts(res));
}

const showPosts = posts => {
  const postsContainer = document.getElementById("postsContainer");
  posts.forEach(post => {
    console.log(post);
    let $post = document.createElement('DIV');
    $post.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
    `;
    $post.classList.add('post-item');
    $post.setAttribute("id", `post-${post.id}`);
    postsContainer.appendChild($post);
  });
}

window.onload = main;
