let app = document.createElement('div');
document.body.prepend(app);
app.id = 'app';

class App {
  constructor() {
    this.tableHeaders = ['Name', 'Last Name', 'Email'];
  }

  createHeader() {
    return `<header class="header"><div class="container top-radius"><h2>Contacts</h2></div></header>`;
  }


  createTableBody(param) {
    let users;
    if (param) {
      users = param;
    } else { users = this.users }
    users.forEach(elem => {
      let arr = elem.fullName.split(' ');
      elem.name = arr[0];
      elem.lastname = arr[1];
    })
    console.log(users);
    let tbody = '<tbody>'
    users.forEach(el => {
      tbody += `<tr><td>${el.name}</td><td>${el.lastname}</td><td>${el.email}</td></tr>`;
    })
    tbody += `</tbody>`;
    return tbody;
  }


  createTable() {
    let table = `<table class = "table table-hover contacts"><thead>`;
    this.tableHeaders.forEach((el, index) => {
      table += `<th class = "header${index}">${el}</th>`;
    });
    table += `</thead>`;
    table += this.createTableBody();
    table += `</table>`;
    return table;
  }


  createMain() {
    let main = `<main class ="main app"><div class = "container"><form class="form-inline search-form"><div class="form-group"><label class="sr-only" for="search">Search</label><input type="text" class="form-control" id= "search" placeholder="Search"></div></form>`;
    main += this.createTable();
    return main += `</div></main>`
  }


  sortUsers(param) {
    return this.users.sort(function (a, b) {
      var nameA = a[param].toUpperCase();
      var nameB = b[param].toUpperCase();
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      return 0;
    })
  }


  findUsersByName(param) {

    let finedUsers = [];
    this.users.forEach(elem => {
      if (elem.name.search([param]) != -1 || elem.name.toLowerCase().search([param]) != -1) {
        finedUsers.push(elem);
      }
    })
    return finedUsers
  }


  events() {
    this.nameHeader = document.querySelector('.header0');
    this.lastNameHeader = document.querySelector('.header1');
    this.emailHeader = document.querySelector('.header2');
    this.tbody = document.querySelector('tbody');
    this.search = document.getElementById('search');
    this.nameHeader.addEventListener('click', e => {
      this.users = this.sortUsers('name');
      this.tbody.innerHTML = this.createTableBody();

    });

    this.lastNameHeader.addEventListener('click', e => {
      this.users = this.sortUsers('lastname');
      this.tbody.innerHTML = this.createTableBody();
    });

    this.emailHeader.addEventListener('click', e => {
      this.users = this.sortUsers('email');
      this.tbody.innerHTML = this.createTableBody();
    });

    this.search.addEventListener('keyup', e => {
      this.newUsers = this.findUsersByName(this.search.value);
      this.tbody.innerHTML = this.createTableBody(this.newUsers);
    })
  }
  request() {
    const url = 'https://easycode-js.herokuapp.com/alexm/users';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        this.users = JSON.parse(xhr.responseText);
        this.render();
        this.events();
      }
    }
  }

  render() {
    let app = document.getElementById('app');
    app.innerHTML = this.createHeader() + this.createMain();
  }

}

let myTelephoneBook = new App();
myTelephoneBook.request();



//---------------ROUTER------------------------//
let links = [...document.querySelectorAll('.main-nav>a')];

links.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();

    // ------ INDEX.HTML--------------------------//
    if (link.getAttribute('href') == 'index.html') {
      myTelephoneBook.render();
      myTelephoneBook.events();
    }
    //--------------KEYPAD-----------------------------//
    if (link.getAttribute('href') == 'keypad.html') {
      let myKeypad = new Keypad();
      myKeypad.render();
      myKeypad.events();
    }
    //-----------------EDIT-CONTACT---------------//
    if (link.getAttribute('href') == 'edit-contact.html') {
      myEditContact.render()
    }

    //-----------------USER---------------------//
    if (link.getAttribute('href') == 'user.html') {
      myUser.render()
    }

    // ---------------ADD-USER -----------------//
    if (link.getAttribute('href') == 'add-user.html') {
      myAddUser.render()
    }

  })
}) 
