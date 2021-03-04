//Get identify token from localStorage to be authorized later from the server {attention!! GetItem() need only the key value!}
const current_token = localStorage.getItem("access_token");

//Make a fetch in get from file Me in the server to know all users' online data {es. name= Ani, id=2, email=ani@me.com etc...}
//and also we return from this async function only the current user name which is online! {we need it later..}

//Fetch in get to the server from Guests file to get the obj of all users
async function listGuests(model) {
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
      options.value = item.id;
      if (model) {
        const found = model.guests.find((e) => e.id === item.id);
        if (found) {
          options.selected = true;
        }
      } else {
        options.selected = false;
      }
      //Add the users' name as select'options
      select.options.add(options);
    }
  }
}

async function setUpForCreation() {
  listGuests();
}

async function setUpForEditing(id) {
  const form = document.querySelector("form");
  form.dataset.action = "/events/" + id;
  form.dataset.method = "PUT";
  const response = await fetch(window.API_URL + "/events/" + id, {
    method: "GET",
    headers: {
      authorization: "Bearer " + current_token,
    },
  });
  const model = await response.json();
  const $name = document.querySelector("#name");
  $name.value = model.name;
  const $address = document.querySelector("#address");
  $address.value = model.address;
  const $datetime = document.querySelector("#datetime");
  $datetime.value = model.datetime.replace(" ", "T").replace(/\:00$/, "");

  listGuests(model);
}

const url = new URL(location.href);
const id = url.searchParams.get("id");

if (id) {
  setUpForEditing(id);
} else {
  setUpForCreation();
}

function onFormSuccess(json) {
  location.href = "/index.html";
}
