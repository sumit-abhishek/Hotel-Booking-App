import { setElementStyle, disableInput, displayData } from "../js/module.js";

window.propertyForm = function propertyForm() {
  setElementStyle("add-property-id", { display: "flex" });
  setElementStyle("propertyEdit", { display: "none" });
};

window.propertyFormCloseButton = function propertyFormCloseButton() {
  setElementStyle("add-property-id", { display: "none" });
  window.location.reload();
};

window.dashboard = function dashboard() {
  setElementStyle("dashboard-area", { display: "block" });
  setElementStyle("booking-area", { display: "none" });
  setElementStyle("property-area", { display: "none" });
  setElementStyle("dashboard-button", {
    background: "white",
    color: "Black",
  });
  setElementStyle("booking-button", {
    background: "",
    color: "",
  });
  setElementStyle("property-button", {
    background: "",
    color: "",
  });
};
window.property = function property() {
  setElementStyle("dashboard-area", { display: "none" });
  setElementStyle("booking-area", { display: "none" });
  setElementStyle("property-area", { display: "flex" });
  setElementStyle("property-button", {
    background: "white",
    color: "Black",
  });
  setElementStyle("booking-button", {
    background: "",
    color: "",
  });
  setElementStyle("dashboard-button", {
    background: "",
    color: "",
  });
  displayData("totalProperty", addedProperty.length);
};
window.booking = function booking() {
  setElementStyle("booking-area", { display: "flex" });
  setElementStyle("property-area", { display: "none" });
  setElementStyle("dashboard-area", { display: "none" });
  setElementStyle("booking-button", {
    background: "white",
    color: "Black",
  });
  setElementStyle("property-button", {
    background: "",
    color: "",
  });
  setElementStyle("dashboard-button", {
    background: "",
    color: "",
  });

  const adminData = JSON.parse(localStorage.getItem("adminData")) || [];
  const cancelledBookings = adminData.filter(
    (booking) => booking.status === "Cancelled"
  );
  const confirmedBookings = adminData.filter(
    (booking) => booking.status === "Booked"
  );
  const bookingDashboard = document.querySelector(".booking-dashboard");
  displayData("totalBooking", adminData.length);
  displayData("cancelledBooking", cancelledBookings.length);
  displayData("confirmBooking", confirmedBookings.length);

  bookingDashboard.innerHTML = "";
  for (let i = 0; i < adminData.length; i++) {
    const bookingInfo = document.createElement("div");
    bookingInfo.className = "row booking-info";
    bookingInfo.innerHTML = `
    <div class="col">EUR-123</div>
    <div class="col user-image">
      <img
        src="../Assets/user-image.png"
        alt=""
        style="object-fit: contain; height: 30px; width: 30px"
      />
      <span id="user-name">${adminData[i].username}</span>
    </div>
    <div class="col" id="user-location">${adminData[i].hotel}</div>
    <div class="col" id="user-checkin-date">${adminData[i].checkInDate
      .split("-")
      .reverse()
      .join("-")}</div>
    <div class="col" id="user-checkout-date">${adminData[i].checkOutDate
      .split("-")
      .reverse()
      .join("-")}</div>
    <div class="col booking-info-status" id="booking-status">
      ${adminData[i].status}
    </div>
    `;
    bookingDashboard.appendChild(bookingInfo);
    const div2 = document.createElement("div");
    div2.className = "col";
    div2.id = "booking-action";
    bookingInfo.appendChild(div2);

    //Cancel Booking Button

    let cancelButton = document.createElement("button");
    cancelButton.className = "btn btn-sm btn-outline-danger";
    cancelButton.innerHTML = `<i class="fa-solid fa-trash-can"></i> Cancel Booking`;
    div2.appendChild(cancelButton);
    if (adminData[i].status == "Cancelled") {
      cancelButton.disabled = true;
    }
    cancelButton.addEventListener("click", () => {
      adminData[i].status = "Cancelled";
      localStorage.setItem("adminData", JSON.stringify(adminData));
      window.location.reload();
    });
  }
};

// Saving Properties Detail Through Input Data
const addPropertyForm = document.getElementById("addProperty");
let addedProperty = JSON.parse(localStorage.getItem("addedProperty")) || [];
if (!Array.isArray(addedProperty)) {
  addedProperty = [];
}
addPropertyForm.addEventListener("click", () => {
  const defaultLocationValue = "Select Location";
  let checkedValues = [];
  let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
  if (
    !hotelName.value ||
    hotelLocation.value == defaultLocationValue ||
    !hotelDescription.value ||
    !hotelPrice.value ||
    !hotelImg.value
  ) {
    alert("Please Enter All the Details");
    return;
  } else if (checkboxes.length === 0) {
    alert("Please check at least one item");
    return;
  }
  checkboxes.forEach((item) => {
    checkedValues.push(item.value);
  });

  let propertyObj = {
    hotelName: hotelName.value,
    hotelLocation: hotelLocation.value,
    hotelDescription: hotelDescription.value,
    hotelPrice: hotelPrice.value,
    hotelImg: hotelImg.value,
    checkbox: checkedValues,
  };
  addedProperty.push(propertyObj);
  localStorage.setItem("addedProperty", JSON.stringify(addedProperty));
});
const propertyList = document.querySelector(".property-list");

function renderingData() {
  propertyList.innerHTML = "";
  addedProperty.forEach((property, index) => {
    const propertyListItems = document.createElement("div");
    propertyListItems.className = "row property-list-items";
    propertyListItems.innerHTML = `
                    <div class="col-md-3"><h6>${index + 1}</h6></div>
                    <div class="col-md-3"><h6>${property.hotelName}</h6></div>
                    <div class="col-md-3"><h6>${
                      property.hotelLocation
                    }</h6></div>
                  </div>`;
    let div1 = document.createElement("div");
    propertyListItems.appendChild(div1);
    div1.className = "col-md-3 action";
    propertyList.appendChild(propertyListItems);

    // View Button

    let viewButton = document.createElement("button");
    viewButton.className = "btn btn-outline-info";
    viewButton.innerHTML = `<i class="fa-regular fa-eye"></i> View`;
    div1.appendChild(viewButton);
    viewButton.addEventListener("click", () => {
      propertyForm();
      setElementStyle("addProperty", { display: "none" });
      setElementStyle("propertyEdit", { display: "none" });
      hotelName.value = addedProperty[index].hotelName;
      hotelLocation.value = addedProperty[index].hotelLocation;
      hotelDescription.value = addedProperty[index].hotelDescription;
      hotelPrice.value = addedProperty[index].hotelPrice;
      hotelImg.value = addedProperty[index].hotelImg;
      const checkboxValues = addedProperty[index].checkbox;
      const checkboxes = document.getElementsByName("popular-filter");
      checkboxes.forEach((i) => {
        if (checkboxValues.includes(i.value)) {
          i.checked = true;
        }
      });
      disableInput("hotelLocation", "hotelDescription", "input");
    });

    // Edit Button

    let editButton = document.createElement("button");
    editButton.className = "btn btn-outline-success";
    editButton.innerHTML = `<i class="fa-solid fa-pen"></i> Edit`;
    div1.appendChild(editButton);
    editButton.addEventListener("click", () => {
      propertyForm();
      setElementStyle("addProperty", { display: "none" });
      setElementStyle("propertyEdit", { display: "flex" });
      hotelName.value = addedProperty[index].hotelName;
      hotelLocation.value = addedProperty[index].hotelLocation;
      hotelDescription.value = addedProperty[index].hotelDescription;
      hotelPrice.value = addedProperty[index].hotelPrice;
      hotelImg.value = addedProperty[index].hotelImg;
      const checkboxValues = addedProperty[index].checkbox;
      const checkboxes = document.getElementsByName("popular-filter");
      checkboxes.forEach((i) => {
        if (checkboxValues.includes(i.value)) {
          i.checked = true;
        }
      });
      let forEditButton = document.getElementById("propertyEdit");
      forEditButton.addEventListener("click", () => {
        let editedCheck = [];
        checkboxes.forEach((i) => {
          if (i.checked) {
            editedCheck.push(i.value);
          }
        });
        let editedObj = {
          hotelName: hotelName.value,
          hotelLocation: hotelLocation.value,
          hotelDescription: hotelDescription.value,
          hotelPrice: hotelPrice.value,
          hotelImg: hotelImg.value,
          checkbox: editedCheck,
        };
        addedProperty[index] = editedObj;
        localStorage.setItem("addedProperty", JSON.stringify(addedProperty));
      });
    });

    // Delete Button

    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-outline-danger";
    deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i> Delete`;
    div1.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
      addedProperty.splice(index, 1);
      localStorage.setItem("addedProperty", JSON.stringify(addedProperty));
      renderingData();
    });
  });
}
renderingData();
