import {
  displayData,
  setDateFormat,
  displayImg,
  displayNight,
  totalPrice,
  totalBookedPrice,
} from "../js/module.js";

// Retriving Data From Local Storage
document.addEventListener("DOMContentLoaded", () => {
  var hotelDetails = JSON.parse(localStorage.getItem("hotelDetails"));
  hotelDetails.forEach((e) => {
    displayData("hotel-name", e.name);
    displayImg("card-img", e.image);
    displayData("normal-price", e.price);
  });
  const loginUserLocation =
    JSON.parse(localStorage.getItem("userLocation")) || [];
  loginUserLocation.forEach((e) => {
    displayData("location", e.searchLocation);
    displayData("stay-location", e.searchLocation);
    setDateFormat("checkInDate", e.checkInDate);
    setDateFormat("checkOutDate", e.checkOutDate);
    displayData("guests", e.numberGuest);
    displayNight("stay-night", e.checkInDate, e.checkOutDate);
  });
  let cardObj = {
    normalPrice: hotelDetails[0].price,
    checkInDate: loginUserLocation[0].checkInDate,
    checkOutDate: loginUserLocation[0].checkOutDate,
  };
  localStorage.setItem("cardData", JSON.stringify(cardObj));
  totalPrice(
    "total-price",
    cardObj.normalPrice,
    cardObj.checkInDate,
    cardObj.checkOutDate
  );
  totalBookedPrice(
    "booked-price",
    cardObj.normalPrice,
    cardObj.checkInDate,
    cardObj.checkOutDate
  );
});

window.submit = function submit() {
  window.location.href = "confirmation.html";
};
