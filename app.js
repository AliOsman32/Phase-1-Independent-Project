let wrapperLogin = document.getElementById("wrapper-login")
let wrapperIndex = document.getElementById("wrapper-index")
let wrapperRegister = document.getElementById("wrapper-register")
let wrapperSuggest = document.getElementById("wrapper-suggestions")
let wrapperEdit = document.getElementById("wrapper-edit")
let wrapperAdd= document.getElementById("wrapper-add")


if (window.location.href=== "https://aliosman32.github.io/Phase-1-Independent-Project/#login") {
  const header = document.getElementById("header")
  wrapperLogin.style.display = "block";
  header.style.display = "none";
    const loginForm = document.getElementById("login-form");
    const loginButton = document.getElementById("submit");
    const loginErrorMsg = document.getElementById("error-msg");
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      const username = loginForm.usernameLogin.value;
      const password = loginForm.passwordLogin.value;
  
       if (username === "") {
        loginErrorMsg.style.opacity = 1;
        loginErrorMsg.innerHTML = "Username is required";
      } else if (password === "") {
        loginErrorMsg.style.opacity = 1;
        loginErrorMsg.innerHTML = "Password is required";
      } else {
          fetch(`http://localhost:3000/users?username=${username}&&password=${password}`)
          .then(function (response) {
            console.log(response);
            return response.json();
          })
          .then(function (data) {
            if(data.length >0){
                alert("You have successfully logged in.");
                localStorage.setItem("id", data[0].id);
                localStorage.setItem("username", username);
                localStorage.setItem("password", password);
                location.replace("https://aliosman32.github.io/Phase-1-Independent-Project/");
            }else{
                loginErrorMsg.style.opacity = 1;
              loginErrorMsg.innerHTML = "Wrong credentials";
            }
              
          }).catch((error)=>{
              loginErrorMsg.style.opacity = 1;
              loginErrorMsg.innerHTML = "An error occurred";
          })
        
      }
    });
  }
if (window.location.href === "https://aliosman32.github.io/Phase-1-Independent-Project/#register") {
  wrapperLogin.style.display = "none"
  wrapperRegister.style.display = "block";
  header.style.display = "none";
  const registerForm = document.getElementById("register-form");
  const registerButton = document.getElementById("submitRegister");
  const registerErrorMsg = document.getElementById("error-msg");
  registerButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = registerForm.usernameRegister.value;
    const email = registerForm.emailRegister.value;
    const password = registerForm.passwordRegister.value;


      fetch("http://localhost:3000/users")
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then(function (data) {
          console.log(data.length);
          fetch(`http://localhost:3000/users/`, {
            method: "POST",
            body: JSON.stringify({
              id: data.length + 1,
              username: username,
              email: email,
              password: password,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) =>  reloadLogin());
        });
    
  });
}
if (window.location.href === "https://aliosman32.github.io/Phase-1-Independent-Project/") {
  document.getElementById("index").classList.add("active")
  wrapperIndex.style.display = "block";
  if(localStorage.getItem("id")===undefined||localStorage.getItem("id")===null){
    location.replace("https://aliosman32.github.io/Phase-1-Independent-Project/#login");
    location.reload();
  }
  
  const username = document.getElementById("username");
  username.innerHTML = "(" + localStorage.getItem("username") + ")";
  const container = document.getElementById("container");
  const search = document.getElementById("search");
  const searchInput = document.getElementById("searchInput");
  const formSearch = document.getElementById("formSearch");
  let title,
    card,
    cardInfo,
    timeRecorded,
    deadline,
    btnEdit,
    btnDelete,
    btnDone,
    completed,
    actionButtons;
    fetch(`http://localhost:3000/todo?userid=${localStorage.getItem("id")}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data.forEach((todo) => {
          title = document.createElement("h3");
          card = document.createElement("div");
          cardInfo = document.createElement("div");
          timeRecorded = document.createElement("p");
          deadline = document.createElement("p");
          actionButtons = document.createElement("div");
          btnEdit = document.createElement("button");
          btnDelete = document.createElement("button");
          completed = document.createElement("div");
          btnDone = document.createElement("button");

          card.classList.add("card");
          cardInfo.classList.add("card-info");
          actionButtons.classList.add("action-buttons");
          btnEdit.classList.add("btn");
          btnEdit.classList.add("btn-edit");
          btnEdit.innerHTML = "Edit";
          btnDelete.classList.add("btn");
          btnDelete.classList.add("btn-delete");
          btnDelete.innerHTML = "Delete";
          btnDone.classList.add("btn");
          btnDone.classList.add("btn-done");
          btnDone.innerHTML = "Done  ✔️";
          completed.classList.add("completed");

          container.appendChild(card);
          card.appendChild(cardInfo);
          card.appendChild(completed);
          cardInfo.appendChild(title);
          cardInfo.appendChild(timeRecorded);
          cardInfo.appendChild(deadline);
          cardInfo.appendChild(actionButtons);
          actionButtons.appendChild(btnEdit);
          actionButtons.appendChild(btnDelete);
          completed.appendChild(btnDone);

          btnDone.setAttribute("onclick", `done(${todo.id})`);
          btnDelete.setAttribute("onclick", `deleteItem(${todo.id})`);
          btnEdit.addEventListener("click", ()=>{
            reloadEdit(todo.id)
          })
          title.innerHTML = todo.todo;
          timeRecorded.innerHTML = `Time Recorded : <span>${todo.time_recorded}</span>`;
          deadline.innerHTML = `Deadline : <span>${todo.deadline}</span>`;
          if (todo.is_done === true) {
            btnDone.style.display = "none";
            btnDelete.style.display = "none";
            btnEdit.style.display = "none";
            card.classList.add("cardcompleted");
          }
        });
      });
      function changeInput(){
       const  searchString = document.getElementById("searchInput").value
       fetch(`http://localhost:3000/todo?todo_like=${searchString}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.remove();
});
        data.forEach((todo) => {
          title = document.createElement("h3");
          card = document.createElement("div");
          cardInfo = document.createElement("div");
          timeRecorded = document.createElement("p");
          deadline = document.createElement("p");
          actionButtons = document.createElement("div");
          btnEdit = document.createElement("button");
          btnDelete = document.createElement("button");
          completed = document.createElement("div");
          btnDone = document.createElement("button");

          card.classList.add("card");
          cardInfo.classList.add("card-info");
          actionButtons.classList.add("action-buttons");
          btnEdit.classList.add("btn");
          btnEdit.classList.add("btn-edit");
          btnEdit.innerHTML = "Edit";
          btnDelete.classList.add("btn");
          btnDelete.classList.add("btn-delete");
          btnDelete.innerHTML = "Delete";
          btnDone.classList.add("btn");
          btnDone.classList.add("btn-done");
          btnDone.innerHTML = "Done  ✔️";
          completed.classList.add("completed");

          container.appendChild(card);
          card.appendChild(cardInfo);
          card.appendChild(completed);
          cardInfo.appendChild(title);
          cardInfo.appendChild(timeRecorded);
          cardInfo.appendChild(deadline);
          cardInfo.appendChild(actionButtons);
          actionButtons.appendChild(btnEdit);
          actionButtons.appendChild(btnDelete);
          completed.appendChild(btnDone);

          btnDone.setAttribute("onclick", `done(${todo.id})`);
          btnDelete.setAttribute("onclick", `deleteItem(${todo.id})`);
          btnEdit.addEventListener("click", ()=>{
            
            reloadEdit(todo.id)
          })
          title.innerHTML = todo.todo;
          timeRecorded.innerHTML = `Time Recorded : <span>${todo.time_recorded}</span>`;
          deadline.innerHTML = `Deadline : <span>${todo.deadline}</span>`;
          if (todo.is_done === true) {
            btnDone.style.display = "none";
            btnDelete.style.display = "none";
            btnEdit.style.display = "none";
            card.classList.add("cardcompleted");
          }
        });
      });
      }
  function done(id) {
    fetch(`http://localhost:3000/todo/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        is_done: true,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
  function deleteItem(id) {
    fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE",
      
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => alert(`Item with id ${id} will be deleted`));
  }
}
if (window.location.href ==="https://aliosman32.github.io/Phase-1-Independent-Project/#add") {
  document.getElementById("add").classList.add("active")
  wrapperAdd.style.display = "block";
  if(localStorage.getItem("id")===undefined||localStorage.getItem("id")===null){
    location.replace("https://aliosman32.github.io/Phase-1-Independent-Project/#login");
    location.reload();
  }
  const username = document.getElementById("username");
  username.innerHTML = "(" + localStorage.getItem("username") + ")";

  const addErrorMsg = document.getElementById("error-msg");
  const todoForm = document.getElementById("todo-form");
  const todoButton = document.getElementById("addtodo");
  const currentDate = new Date();
  console.log(
    currentDate.getDate() +
      "/" +
      currentDate.getMonth() +
      "/" +
      currentDate.getFullYear() +
      " " +
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes()
  );
  todoButton.addEventListener("click", (e) => {
    e.preventDefault();
    const todo = todoForm.todoAdd.value;
    const date = todoForm.dateAdd.value;
    const time = todoForm.timeAdd.value;

    if (todo === "" || date === "" || time === "") {
      addErrorMsg.style.opacity = 1;
      addErrorMsg.innerHTML = "Fill in the empty fields";
    } else {
      fetch("http://localhost:3000/todo")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const id = data[data.length-1].id
          fetch(`http://localhost:3000/todo`, {
            method: "POST",
            body: JSON.stringify({
              id: id + 1,
              userid:localStorage.getItem("id"),
              todo: todo,
              time_recorded:
                currentDate.getFullYear() +
                "-" +
                currentDate.getMonth() +
                "-" +
                currentDate.getDate() +
                " " +
                currentDate.getHours() +
                ":" +
                currentDate.getMinutes(),
              deadline: date + " " + time,
              is_done: false,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) => location.replace("https://aliosman32.github.io/Phase-1-Independent-Project/"));
        });
    }
  });
}
if (window.location.href ==="https://aliosman32.github.io/Phase-1-Independent-Project/#suggestions") {
  document.getElementById("suggestions").classList.add("active")
  if(localStorage.getItem("id")===undefined||localStorage.getItem("id")===null){
    location.replace("https://aliosman32.github.io/Phase-1-Independent-Project/#login");
    location.reload();
  }
  console.log(localStorage.getItem("id"))
  const wrapperSuggest = document.getElementById("wrapper-suggestions")
  wrapperSuggest.style.display = "block";
  const username = document.getElementById("username");
  username.innerHTML = "(" + localStorage.getItem("username") + ")";
  const activity = document.getElementById("activity");
  const type = document.getElementById("type");
  const participants = document.getElementById("participants");
  const price = document.getElementById("price");
  const buttonNext = document.getElementById("btnNext");

  fetch("https://www.boredapi.com/api/activity")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      activity.innerHTML = data.activity;
      type.innerHTML = data.type;
      participants.innerHTML = data.participants;
      price.innerHTML = data.price;
    });

  buttonNext.addEventListener("click", () => {
    fetch("https://www.boredapi.com/api/activity")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        activity.innerHTML = data.activity;
        type.innerHTML = data.type;
        participants.innerHTML = data.participants;
        price.innerHTML = data.price;
      });
  });
}
const url = window.location.href
const urlId =url.split("=")[1]
if (url.split("=")[1]) {
  console.log(url.split("=")[1])
  wrapperEdit.style.display = "block";
  if(localStorage.getItem("id")===undefined||localStorage.getItem("id")===null){
    location.replace("https://aliosman32.github.io/Phase-1-Independent-Project/#login");
    location.reload();
  }
  
    const username = document.getElementById("username");
    username.innerHTML = "(" + localStorage.getItem("username") + ")";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlId = urlParams.get('id')
    const addErrorMsg = document.getElementById("error-msg");
    const todoForm = document.getElementById("todo-form-update");
    const todoButton = document.getElementById("updatetodo");
    const currentDate = new Date();
    
    fetch(`http://localhost:3000/todo/${url.split("=")[1]}`)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
        todoForm.todoUpdate.value = data.todo

        todoForm.dateUpdate.value =data.time_recorded.split(" ")[0]
        todoForm.timeUpdate.value =data.time_recorded.split(" ")[1]
        
    })
    todoButton.addEventListener("click", (e) => {
      e.preventDefault();
      const todo = todoForm.todoUpdate.value;
      const date = todoForm.dateUpdate.value;
      const time = todoForm.timeUpdate.value;
  
      if (todo === "" || date === "" || time === "") {
        addErrorMsg.style.opacity = 1;
        addErrorMsg.innerHTML = "Fill in the empty fields";
      } else {
        
            fetch(`http://localhost:3000/todo/${url.split("=")[1]}`, {
              method: "PATCH",
              body: JSON.stringify({
                todo: todo,
                time_recorded:
                  currentDate.getDate() +
                  "/" +
                  currentDate.getMonth() +
                  "/" +
                  currentDate.getFullYear() +
                  " " +
                  currentDate.getHours() +
                  ":" +
                  currentDate.getMinutes(),
                deadline: date + " " + time,
                is_done: false,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            })
              .then((response) => response.json())
              .then((json) => location.replace("http://127.0.0.1:5500"));
          
      }
    });
  }

  function logout(){
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    location.reload();
  }
  function reloadSuggestions(){
    location.replace("https://aliosman32.github.io/Phase-1-Independent-Project/#suggestions")
    location.reload();
  }
  function reloadIndex(){
    location.replace("https://aliosman32.github.io/Phase-1-Independent-Project/#index")
    location.reload();
  }
  function reloadAdd(){
    location.replace("https://aliosman32.github.io/Phase-1-Independent-Project/#add")
    location.reload();
  }
  function reloadRegister(){
    location.replace("https://aliosman32.github.io/Phase-1-Independent-Project/#register")
    location.reload();
  }
  function reloadLogin(){
    location.replace("https://aliosman32.github.io/Phase-1-Independent-Project/#login")
    location.reload();
  }
  function reloadEdit(id){
    
    location.replace(`https://aliosman32.github.io/Phase-1-Independent-Project/#edit?id=${id}`)
    location.reload();
  }