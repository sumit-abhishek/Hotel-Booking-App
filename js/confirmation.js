import {
  setElementStyle,
  displayData,
  setDateFormat,
  displayImg,
  totalPrice,
  totalBookedPrice,
  displayNight,
} from "../js/module.js";
const loginUser = JSON.parse(localStorage.getItem("loggedInUser"));
const hotelDetails = JSON.parse(localStorage.getItem("hotelDetails")) || [];
const adminData = JSON.parse(localStorage.getItem("adminData")) || [];
document.addEventListener("DOMContentLoaded", () => {
  const cardData = JSON.parse(localStorage.getItem("cardData"));

  totalPrice(
    "total-price",
    cardData.normalPrice,
    cardData.checkInDate,
    cardData.checkOutDate
  );
  totalBookedPrice(
    "booked-price",
    cardData.normalPrice,
    cardData.checkInDate,
    cardData.checkOutDate
  );

  const loginUserLocation = JSON.parse(localStorage.getItem("userLocation"));

  hotelDetails.forEach((e) => {
    displayData("stay-name", e.name);
    displayData("hotel-title", e.name);
    displayImg("reserve-card-img", e.image);
    displayData("normal-price", e.price);
  });
  // displayData("stay-name", hotelName);
  // displayData("hotel-title", hotelName);
  loginUserLocation.forEach((e) => {
    displayData("stay-location", e.searchLocation);
    setDateFormat("dateOfIn", e.checkInDate);
    setDateFormat("arrivalDate", e.checkInDate);
    setDateFormat("dateOfOut", e.checkOutDate);
    displayData("people", e.numberGuest);

    console.log("Check-in Date:", e.checkInDate);
    console.log("Check-out Date:", e.checkOutDate);

    displayNight("stay-night", e.checkInDate, e.checkOutDate);
  });
  setDateFormat("loginUser", loginUser[0].fullName);
  const adminLocation = loginUserLocation[0];
  const adminObj = {
    username: loginUser[0].fullName,
    hotel: hotelDetails[0].name,
    checkInDate: adminLocation.checkInDate,
    checkOutDate: adminLocation.checkOutDate,
    status: "Booked",
  };
  adminData.push(adminObj);
  localStorage.setItem("adminData", JSON.stringify(adminData));
});

window.showCustomAlert = function showCustomAlert() {
  setElementStyle("customAlert", { display: "block" });
};
window.closeCustomAlert = function closeCustomAlert() {
  setElementStyle("customAlert", { display: "none" });
};
document.getElementById("home-button").addEventListener("click", () => {
  localStorage.removeItem("cardData");
  localStorage.removeItem("userLocation");
  window.location.href = "../index.html";
});
document.getElementById("home-button").addEventListener("click", () => {
  localStorage.removeItem("cardData");
  localStorage.removeItem("userLocation");
  window.location.href = "../index.html";
});
document.getElementById("homeNav").addEventListener("click", () => {
  localStorage.removeItem("cardData");
  localStorage.removeItem("userLocation");
});
document.getElementById("cancelReservation").addEventListener("click", () => {
  adminData.forEach((adminObj) => {
    if (
      adminObj.username == loginUser[0].fullName &&
      adminObj.hotel == hotelDetails[0].name
    ) {
      adminObj.status = "Cancelled";
    }
  });
  localStorage.removeItem("cardData");
  localStorage.setItem("adminData", JSON.stringify(adminData));
  localStorage.removeItem("userLocation");
  localStorage.removeItem("hotelDetails");
  window.location.href = "../index.html";
});
