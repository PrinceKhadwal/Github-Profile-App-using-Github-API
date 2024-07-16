const container = document.querySelector('.container')

const form = document.querySelector('.search form')
const search_user = document.querySelector('#search-bar')

const getUser =async (username) =>{
    const url = `https://api.github.com/users/${username}`
    const response = await fetch(url);
    const data = await response.json();
    container.innerHTML = `
    <div class="image-container">
                <img src="${data.avatar_url}">
            </div>
            <div class="info-container">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>following</strong></li>
                    <li>${data.public_repos}<strong>repos</strong></li>
                </ul>
                
                <div id="repos">
                </div>
            </div>`
        getRepos(username)
}

const getRepos = async (username) =>{
    const repos_box = document.querySelector('#repos')
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data =await response.json();
    data.forEach(repo => {
        const element = document.createElement('a');
        element.classList.add = 'repo';
        element.target = '_blank'
        element.innerText = repo.name;
        element.href = repo.html_url;
        repos_box.appendChild(element);
    });
}

form.addEventListener('submit',
(event) =>{
    var res = search_user.value.replace(/[ ]+/g, "");
    getUser(res);
    event.preventDefault();
})