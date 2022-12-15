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