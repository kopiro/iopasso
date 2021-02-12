// window.API_URL = "http://10.0.0.9:5000";
window.API_URL = "https://iopasso.kopiro.me";

function docReady(fn) {
  // see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
docReady(() => {
  //Get identify token from localStorage to be authorized later from the server {attention!! GetItem() need only the key value!}
  const current_token = localStorage.getItem("access_token");
  const form = document.querySelector("form[data-javascript]");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      //check the errors
      const inputs = document.querySelectorAll("input.error");
      inputs.forEach((element) => {
        element.classList.remove("error");
      });

      document.querySelectorAll(".div_error").forEach((e) => {
        e.remove();
      });

      const response = await fetch(`${window.API_URL}${form.dataset.action}`, {
        method: form.dataset.method,
        body: formData,
        headers: {
          authorization: "Bearer " + current_token,
        },
      });

      //Get server response to check if there is errors
      const json = await response.json();

      if (json.error === true) {
        //prendere il messaggio generico di errore
        const genericMessage = json.message;
        box_error.innerText = "* " + genericMessage + "!";

        // Get the json value given by the backend as an array of array
        const validation = json.validations;
        //[
        //[ "name",["Name is required", "Name should have only letter",..] ],
        //[ "password",["Name is required", "Name should have only letter",..] ]
        // ]
        const messagesArray = [];
        validation.forEach((error) => {
          //[ "name",["Name is required", "Name should have only letter",..] ]
          const id = error[0];
          const message = error[1][0];
          messagesArray.push(message);

          const element = document.querySelector(`[name=${id}]`);
          element.classList.add("error");

          let div_error = document.createElement("div");
          div_error.classList.add("div_error");
          element.after(div_error);
          div_error.innerText = "* " + message + "";

          const box_error = document.querySelector("#box_error");

          //Show display with errors
          box_error.classList.remove("box_error");
        });
      } else {
        onFormSuccess(json);
      }
    });
  }
});
