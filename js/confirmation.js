const button = document.querySelector("#confirmation-button");
const errorBack = document.querySelector("#error-back");

button.addEventListener("click", redirectToLogin);

function redirectToLogin() {
    location.href= "/login.html"
}

errorBack.addEventListener("click", redirectToIndex);

function redirectToIndex() {
    location.href= "/index.html"
}