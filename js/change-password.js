const form = document.querySelector("form");
const password = document.querySelector("#password");
const password_2 = document.querySelector("#password_2");
const token = (location.search.match(/token=([^&]+)/) || [])[1];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (password.value !== password_2.value) {
    alert("Password should match!");
    return;
  }
});
docReady(() => {
  const inputToken = document.createElement("input");
  inputToken.type = "hidden";
  inputToken.name = "token";
  inputToken.value = token;
  form.appendChild(inputToken);
});
function onFormSuccess(json) {
  alert(json.message);
  location.href = "/login.html";
}
