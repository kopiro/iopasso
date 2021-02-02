function check_login() {
  const current_token = localStorage.getItem("access_token");
  if (!current_token) {
    location.href = "/login.html";
  }
}

check_login();
