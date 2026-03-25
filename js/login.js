// login 

let loginForm = document.getElementById("loginForm");
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let email = loginEmail.value;
    let password = loginPassword.value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userFound = null;

    for (let i = 0; i < users.length; i++) {

        if (users[i].email === email) {
            userFound = users[i];
            break;
        }
    }

    if (!userFound) {

        loginMessage.classList.remove("d-none");
        loginMessage.innerText = "Account does not exist. Please register first.";
        return;
    }

    if (userFound.password !== password) {

        loginMessage.classList.remove("d-none");
        loginMessage.innerText = "Incorrect password.";
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(userFound));

    window.location.href = "./homee/home.html";
});

