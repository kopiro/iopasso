const form_event = document.querySelector("#form_event");
//Get identify token from localStorage to be authorized later from the server {attention!! GetItem() need only the key value!}
const current_token = localStorage.getItem("access_token");

//Make a fetch in get from file Me in the server to know all users' online data {es. name= Ani, id=2, email=ani@me.com etc...}
//and also we return from this async function only the current user name which is online! {we need it later..}
async function getMe() {
  const response = await fetch("https://iopasso.kopiro.me/me", {
    method: "GET",
    headers: {
      authorization: "Bearer " + current_token,
    },
  });
  const me = await response.json();
  const user_online = me.name;
  console.log(user_online);
  return user_online;
}

//Fetch in get to the server from Guests file to get the obj of all users
async function listGuests() {
  const response = await fetch("https://iopasso.kopiro.me/guests", {
    method: "GET",
    headers: {
      authorization: "Bearer " + current_token,
    },
  });
  //Always trasform the data get from the server in JSON
  const guests = await response.json();

  //Get the select html tag
  const select = document.querySelector("#guests");

  //Now Call the async function getMe() to make its the data usable!
  //Because we want to exclude the neme of the online user from the list of guests
  const current_user = await getMe();

  //Iterate the fetch response to get from this only the value of kay name of the  users
  for (const item of guests) {
    //So if the name of guests isn't the same of current user name do this
    if (item.name !== current_user) {
      //Create in javascript the html option of the select tag because this is a variable dependent from how many users the app will has
      const options = document.createElement("option");
      options.text = item.name;
      //Add the users' name as select'options
      select.options.add(options);
    }
  }
}
//ALWAYS CALL THE FUNCTION! When and where you need its return value!!
listGuests();

//On submit the form doesn't send the events date because we want to use fetch in POST
form_event.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form_event);

  const select = document.querySelector("#guests");

  const response = await fetch("https://iopasso.kopiro.me/events", {
    method: "POST",
    body: formData,
    headers: {
      authorization: "Bearer " + current_token,
    },
  });

  const inputs = document.querySelectorAll("input.error");
  inputs.forEach((element) => {
    element.classList.remove("error");
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

      // const element = document.querySelectorAll("input["name= + id + "]");
      const element = document.getElementById(id);
      element.classList.add("error");

      let div_error = document.createElement("div");
      div_error.classList.add("div_error");
      element.after(div_error);
      div_error.innerText = "* " + message + "";

      const box_error = document.querySelector("#box_error");

      //Show display with errors
      box_error.classList.remove("box_error");
    });
  }
});
