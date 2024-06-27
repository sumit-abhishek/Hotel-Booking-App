// Save Form Data
const registrationForm = document.getElementById("registration-form");
const userData = JSON.parse(localStorage.getItem("userData")) || [];

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const { fullName, email, password, confirmPassword } =
    registrationForm.elements;

  if (!fullName.value.trim() || !isValidFullName(fullName.value)) {
    alert("Please Enter a valid Full Name.");
    return;
  }
  if (!email.value.trim() || !isValidEmail(email.value)) {
    alert("Please enter a valid Email Address.");
    return;
  }

  if (!password.value.trim() || !isStrongPassword(password.value)) {
    alert(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    );
    return;
  }
  if (password.value.trim() !== confirmPassword.value.trim()) {
    alert("Password must Match.");
    return;
  }

  //Check if Email Existed
  const emailExists = userData.some((e) => e.email === email.value);
  if (emailExists) {
    alert("Email already exists");
    return;
  }

  //Storing No. Of Users
  let obj = {
    id: Date.now(),
    fullName: fullName.value,
    email: email.value,
    password: confirmPassword.value,
  };
  userData.push(obj);
  console.log(userData);
  localStorage.setItem("userData", JSON.stringify(userData));

  // localStorage.setItem("Full Name", fullName.value);
  // localStorage.setItem("Email", email.value);
  // if (password.value === confirmPassword.value) {
  //   localStorage.setItem("Password", confirmPassword.value);
  // }
  alert("Registration Successful Kindly Login!");
  registrationForm.reset();
  window.location.href = "/pages/login.html";
});

function displayError(message) {
  errorMessages.innerHTML += `<div class="error">${message}</div>`;
}

function isValidFullName(fullName) {
  return /^[a-zA-Z ]+$/.test(fullName);
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);
}
function isConfirmPassword(confirmPassword) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(
    confirmPassword
  );
}
