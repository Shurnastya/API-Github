class View {
    constructor() {
        this.app = document.getElementById('app');

        this.title = this.createElement('h1', 'title');
        this.title.textContent = 'Github Users';

        this.searchLine = this.createElement('div', 'search-line');
        this.searchInput = this.createElement('input', 'search-input');
        this.searchCounter = this.createElement('span', 'counter');
        this.searchLine.append(this.searchInput);
        this.searchLine.append(this.searchCounter);

        this.usersWrapper = this.createElement('div', 'users-wrapper');
        this.usersList = this.createElement('ul', 'users');
        this.usersWrapper.append(this.usersList);

        this.main = this.createElement('div', 'main');
        this.main.append(this.usersWrapper);

        this.app.append(this.title);
        this.app.append(this.searchLine);
        this.app.append(this.main);
        this.app.append(this.usersWrapper);
    }

    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag);

        if(elementClass) {
            element.classList.add(elementClass);
        }
        return element;
    }

    createUser(userData) {
        const userElement = this.createElement('li', 'user-prev');
        userElement.innerHTML = `<img class="user-prev-photo" src="${userData.avatar_url}" alt="${userData.login}">
                                 <a class="user-prev-name" href="${userData.html_url}" target="_blank">${userData.login}</a>`;
        this.usersList.append(userElement);
    }

}

const USER_PER_PAGE = 10;

class Search {
    constructor(view) {
        this.view = view;

        this.view.searchInput.addEventListener('keyup', this.searchUsers.bind(this))
    }

    async searchUsers() {
        return await fetch(`https://api.github.com/search/users?q=${this.view.searchInput.value}&per_page=${USER_PER_PAGE}`).then((res) => {
            if(res.ok) {
                res.json().then(res => {
                    res.items.forEach(user => this.view.createUser(user))
                    console.log(res)
                })
            } else {

            }
        })
    }

}

new Search(new View());