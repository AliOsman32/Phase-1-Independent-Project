if (window.location.pathname == "/login.html") {
    const loginForm = document.getElementById("login-form");
    const loginButton = document.getElementById("submit");
    const loginErrorMsg = document.getElementById("error-msg");
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      const username = loginForm.username.value;
      const password = loginForm.password.value;
  
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
                localStorage.setItem("id", data.id);
                localStorage.setItem("username", username);
                localStorage.setItem("password", password);
                location.replace("http://127.0.0.1:5500/index.html");
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
  if (window.location.pathname == "/signup.html") {
    const registerForm = document.getElementById("register-form");
    const registerButton = document.getElementById("submit");
    const registerErrorMsg = document.getElementById("error-msg");
    registerButton.addEventListener("click", (e) => {
      e.preventDefault();
      const username = registerForm.username.value;
      const email = registerForm.email.value;
      const password = registerForm.password.value;
  
      if (email === "") {
        registerErrorMsg.style.opacity = 1;
        registerErrorMsg.innerHTML = "Email is required";
      } else if (username === "") {
        registerErrorMsg.style.opacity = 1;
        registerErrorMsg.innerHTML = "Username is required";
      } else if (password === "") {
        registerErrorMsg.style.opacity = 1;
        registerErrorMsg.innerHTML = "Password is required";
      } else {
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
              .then((json) => location.replace("http://127.0.0.1:5500/login.html"));
          });
      }
    });
  }
  if (window.location.pathname == "/index.html"||window.location.pathname == "/") {
    if(!localStorage.getItem("id")){
      location.replace("http://127.0.0.1:5500/index.html");
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
      fetch(`http://localhost:3000/todo`)
        .then(function (response) {
          console.log(response);
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
              location.replace(`http://127.0.0.1:5500/edit.html?id=${todo.id}`)
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
              location.replace(`http://127.0.0.1:5500/edit.html?id=${todo.id}`)
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
  if (window.location.pathname == "/add.html") {
    if(localStorage.getItem("id") ===undefined){
      location.replace("http://127.0.0.1:5500/index.html");
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
      const todo = todoForm.todo.value;
      const date = todoForm.date.value;
      const time = todoForm.time.value;
  
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
              .then((json) => location.replace("http://127.0.0.1:5500/index.html"));
          });
      }
    });
  }
  if (window.location.pathname == "/edit.html") {
    if(!localStorage.getItem("id")){
      location.replace("http://127.0.0.1:5500/index.html");
    }
    
      const username = document.getElementById("username");
      username.innerHTML = "(" + localStorage.getItem("username") + ")";
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const urlId = urlParams.get('id')
      const addErrorMsg = document.getElementById("error-msg");
      const todoForm = document.getElementById("todo-form");
      const todoButton = document.getElementById("addtodo");
      const currentDate = new Date();
      
      fetch(`http://localhost:3000/todo/${urlId}`)
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
          todoForm.todo.value = data.todo
  
          todoForm.date.value = new Date(data.time_recorded[10])
          console.log( data.time_recorded[10])
      })
      todoButton.addEventListener("click", (e) => {
        e.preventDefault();
        const todo = todoForm.todo.value;
        const date = todoForm.date.value;
        const time = todoForm.time.value;
    
        if (todo === "" || date === "" || time === "") {
          addErrorMsg.style.opacity = 1;
          addErrorMsg.innerHTML = "Fill in the empty fields";
        } else {
          
              fetch(`http://localhost:3000/todo/${urlId}`, {
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
                .then((json) => location.replace("http://127.0.0.1:5500/index.html"));
            
        }
      });
    }
    if (window.location.pathname == "/suggestion.html") {
        if(localStorage.getItem("id") ===undefined){
          location.replace("http://127.0.0.1:5500/index.html");
        }
        console.log(localStorage.getItem("id"))
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