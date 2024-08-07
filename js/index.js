import { setElementStyle, displayData } from "../js/module.js";

//When User is Logged In or Registered//
const loginUserData = JSON.parse(localStorage.getItem("loggedInUser"));
document.addEventListener("DOMContentLoaded", () => {
  const checkInDateElement = document.getElementById("checkInDate");
  const checkOutDateElement = document.getElementById("checkOutDate");

  // Reset the dates
  if (checkInDateElement && checkOutDateElement) {
    checkInDateElement.value = "";
    checkOutDateElement.value = "";
  }
  if (Array.isArray(loginUserData)) {
    const user = loginUserData[loginUserData.length - 1];
    if (user.fullName && user.email) {
      setElementStyle("logged-in-user", { display: "block" });
      displayData("user-email", user.email);
      displayData("user-name", user.fullName);
      setElementStyle("login-button", { display: "none" });
      setElementStyle("register-button", { display: "none" });
    } else {
      setElementStyle("logged-in-user", { display: "none" });
    }
  }
});

//Show User Details
window.showUserAlert = function showUserAlert() {
  setElementStyle("staticBackdrop", { display: "block" });
};
window.closeUserAlert = function closeUserAlert() {
  setElementStyle("staticBackdrop", { display: "none" });
};
window.signoutUser = function signoutUser() {
  setElementStyle("logged-in-user", { display: "none" });
  setElementStyle("login-button", { display: "flex" });
  setElementStyle("register-button", { display: "flex" });
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("userLocation");
  localStorage.removeItem("hotelName");
};

// Locally saving The Search Bar Values
const searchLoaction = document.getElementById("search-locations");
const userLocation = JSON.parse(localStorage.getItem("userLocation")) || [];
if (loginUserData) {
  searchLoaction.addEventListener("submit", (e) => {
    e.preventDefault();

    const { searchLocation, checkInDate, checkOutDate, numberGuest } =
      searchLoaction.elements;
    //Check for Correct Input Date
    let dateObj = new Date();
    let month = String(dateObj.getMonth() + 1).padStart(2, "0");
    let day = String(dateObj.getDate()).padStart(2, "0");
    let year = dateObj.getFullYear();
    let output = year + "-" + month + "-" + day;

    if (checkInDate.value < output) {
      alert("Choose Correct Check-In Date");
      return;
    }
    if (checkInDate.value >= checkOutDate.value) {
      alert("Choose Correct Check-Out Date");
      return;
    }
    if (
      !searchLocation.value ||
      !checkInDate.value ||
      !checkOutDate.value ||
      !numberGuest.value
    ) {
      alert("Choose Location you want to stay and fill all required fields");
      return;
    }
    let obj = {
      searchLocation: searchLocation.value,
      checkInDate: checkInDate.value,
      checkOutDate: checkOutDate.value,
      numberGuest: numberGuest.value,
    };
    userLocation.push(obj);
    localStorage.setItem("userLocation", JSON.stringify(userLocation));

    window.location.href = "pages/rooms.html";
  });
} else {
  searchLoaction.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Please Login First");
    searchLoaction.reset();
  });
}
