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
  //Take the data from the form
  const data = new FormData(form);

  //When the user correct the errors the inputs return not more red
  const inputs = document.querySelectorAll("input.error");
  inputs.forEach((element) => {
    element.classList.remove("error");
  });

  //Send data to the server linked at the action of the form
  const response = await fetch(e.target.action, {
    method: "POST",
    body: data,
  });

  //Get the response from the server
  const json = await response.json();

  if (json.error === true) {
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

      // const element = document.querySelectorAll("input["name= + id + "]");
      const element = document.getElementById(id);
      element.classList.add("error");

      const box_error = document.querySelector("#box_error");

      //Show display with errors
      box_error.classList.remove("box_error");

      //(for (let i = 0; i < error.length; i++) {
      //let validation_message = element[i].toString()
      // }
    });
    //Dobbiamo trasformare l'array dei messaggi di errore in un unica stringa e non più in un array di stringhe
    box_error.innerText = messagesArray;
  } else {
    location.href = "/login.html";
  }
});
