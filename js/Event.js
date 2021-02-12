//Get identify token from localStorage to be authorized later from the server {attention!! GetItem() need only the key value!}
const current_token = localStorage.getItem("access_token");

//Make a fetch in get from file Me in the server to know all users' online data {es. name= Ani, id=2, email=ani@me.com etc...}
//and also we return from this async function only the current user name which is online! {we need it later..}
async function getMe() {
  const response = await fetch(`${window.API_URL}/me`, {
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
  const response = await fetch(`${window.API_URL}/guests`, {
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

function onFormSuccess(json) {
  location.href = "/login.html";
}
