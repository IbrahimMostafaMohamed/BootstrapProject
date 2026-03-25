
// main.js
var registerForm = document.getElementById("registerForm");
var regUsername = document.getElementById("regUsername");
var regEmail = document.getElementById("regEmail");
var regPassword = document.getElementById("regPassword");
var regConfirmPassword = document.getElementById("regConfirmPassword");
var regMessage = document.getElementById("regMessage");

registerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    var username = regUsername.value.trim();
    var email = regEmail.value.trim();
    var password = regPassword.value;
    var confirmPassword = regConfirmPassword.value;

    if (!username || !email || !password || !confirmPassword) {
        regMessage.classList.remove("d-none");
        regMessage.innerText = "Please fill in all fields.";
        return;
    }

    if (password !== confirmPassword) {
        regMessage.classList.remove("d-none");
        regMessage.innerText = "Passwords do not match.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
        regMessage.classList.remove("d-none");
        regMessage.innerText = "Email already registered.";
        return;
    }

    var newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now login.");
    window.location.href = "index.html";
});