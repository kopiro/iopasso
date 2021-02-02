const form_event = document.querySelector("#form_event");
//Get identify token from localStorage to be authorized later from the server {attention!! GetItem() need only the key value!}
const current_token = localStorage.getItem("access_token");

//Make a fetch in get from file Me in the server to know all users' online data {es. name= Ani, id=2, email=ani@me.com etc...}
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
//Call ALWAYS the fuynction to be data usable!
getMe();

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
  //Iterate the fetch response to gat from this only tha value of kay name of the  users
  for (const item of guests) {
    //Create in javascript the html option of the select tag because this is a variable dependent from how many users the app will have
    const options = document.createElement("option");
    options.text = item.name;
    //Add the users' name as select'options
    select.options.add(options);
  }
}
//ALWAYS CALL THE FUNCTION!!
listGuests();

//On submit the form doesn't send the events date because we want to use fetch in POST
form_event.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form_event);

  const select = document.querySelector("#guests");

  const response = await fetch("https://iopasso.kopiro.me/form_event", {
    method: "POST",
    body: formData,
  });
});
