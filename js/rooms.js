function getFilterValue(name) {
  const radioButtonValue = document.getElementsByName(name);
  let value;
  for (let i = 0; i < radioButtonValue.length; i++) {
    if (radioButtonValue[i].checked) {
      value = radioButtonValue[i].value;
    }
  }
  return value;
}

function getcheckboxValue(name) {
  const checkboxes = document.getElementsByName(name);
  const values = [];
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      values.push(checkboxes[i].value);
    }
  }
  return values;
}
const searchFilter = document.getElementById("search-filter");
searchFilter.addEventListener("reset", () => {
  let hotelCards = document.querySelectorAll(".card");
  hotelCards.forEach((card) => {
    card.style.display = "block";
  });
});

searchFilter.addEventListener("submit", (e) => {
  e.preventDefault();
  let locationValue = getFilterValue("location");
  let hotelClass = getFilterValue("hotel-class");
  let facilities = getcheckboxValue("popular-filter");

  let filterObj = {
    location: locationValue,
    hotelClass: hotelClass,
    facilities: facilities,
  };

  addedProperty.forEach((item) => {
    if (item.hotelLocation.toLowerCase() == filterObj.location) {
      let hotelCards = document.querySelectorAll(".card");
      hotelCards.forEach((card) => {
        if (card.classList.contains(filterObj.location)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    }
  });
});

function saveHotelName(hotelObj) {
  localStorage.setItem("hotelDetails", JSON.stringify(hotelObj));
  window.location.href = "/pages/reservation.html";
}
let addedProperty = JSON.parse(localStorage.getItem("addedProperty")) || [];
const roomsAvailability = document.querySelector(".rooms-availability");
roomsAvailability.innerHTML = "";
addedProperty.forEach((element) => {
  let roomsCard = document.createElement("div");
  roomsCard.className = `card ${element.hotelLocation.toLowerCase()} mb-3`;
  roomsCard.style.maxWidth = "90%";
  roomsCard.innerHTML = `<div class="row g-0 hotelCards">
    <div class="col-md-4">
      <img
        src="${element.hotelImg}"
        class="img-fluid rounded-start card-img"
        alt="..."
        style="object-fit: cover; height: 100%; width: 100%"
      />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h4 class="card-title">${element.hotelName}</h4>
        <p class="card-text">
          <small class="text-body-secondary">600 meter away</small>
        </p>
        <p class="card-text">
          ${element.hotelDescription}
        </p>
        <div class="popular-facilities">
          <div class="popular-facilities-left">
            <p>Popular Facilities</p>
            <span>
              <i class="fa-solid fa-dumbbell fa-lg"></i>
              <span>Fitness Studio</span>
            </span>
            <span>
              <i class="fa-solid fa-utensils fa-lg"></i>
              <span> Breakfast</span>
            </span>
            <span>
              <i class="fa-solid fa-person-swimming fa-lg"></i>
              <span>Swimming Pool</span>
            </span>
          </div>
          <div class="popular-facilities-right">
            <h5 class="card-price">&#x20B9; ${element.hotelPrice}</h5>
            <small>Total Package Price</small>
            <button
              class="btn btn-primary"
              type="submit"
              onclick='saveHotelName([{name:"${element.hotelName}",price:${element.hotelPrice},image:"${element.hotelImg}"}])'
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  roomsAvailability.appendChild(roomsCard);
});
