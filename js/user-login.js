const userLoginForm = document.getElementById("user-login-form");
const userData = JSON.parse(localStorage.getItem("userData")) || [];
userLoginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Checking Email Existed
  const userExist = userData.find((e) => e.email === email.value);
  console.log(userExist);
  if (!userExist) {
    alert("User not Exist Please Sign up ");
    return;
  } else if (userExist.password !== password.value) {
    alert("Wrong Password");
    document.getElementById("user-login-form").reset();
  } else {
    const loginUserData = userData.filter((e) => e.email === email.value);

    //Storing Logged In Of User

    localStorage.setItem("loggedInUser", JSON.stringify(loginUserData));
    window.location.href = "/index.html";
  }
});
