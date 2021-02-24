const buttonSendEmail = document.querySelector("#button-send-email");
const email = document.querySelector("#email");

function onFormSuccess(json) {
  location.href = "/waiting-activation.html";
}
