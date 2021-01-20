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

    validation.forEach((error) => {
      //[
      //   "name",
      //   [
      //     "Name is required"
      //   ]
      // ]
      const id = error[0];

      const element = document.getElementById(id);
      element.classList.add("error");

      //(for (let i = 0; i < error.length; i++) {
      //let validation_message = element[i].toString()
      // }
    });
  }

  // If the data is empty or, server respons with error message
  //   if (json.error === true) {
  //     alert(json.message);
  //   } else {
  //     location.href = "/login.html";
  //   }
});
