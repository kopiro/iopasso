const form = document.querySelector("form");
const password = document.querySelector("#password");
const password_2 = document.querySelector("#password_2");

// Create a listener to the event submit
form.addEventListener("submit", async (e) => {
  // Stop to send data to the server because we want to use fetch and we want check
  // if the password match
  e.preventDefault();
  if (password.value !== password_2.value) {
    alert("Password should match!");
    return; //After check if the passwords match return continued to the event submit
  }
});

function onFormSuccess(json) {
  location.href = "/waiting-activation.html";
}
