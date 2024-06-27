export function setElementStyle(id, styleObj) {
  document.getElementById(id).style = Object.keys(styleObj)
    .map((i) => `${i}:${styleObj[i]}`)
    .join(";");
}
export function setDateFormat(id, date) {
  document.getElementById(id).textContent = date.split("-").reverse().join("-");
}
export function displayData(id, data) {
  document.getElementById(id).textContent = data;
}
export function displayImg(id, data) {
  document.getElementById(id).src = data;
}

export function totalPrice(id, price, date1, date2) {
  const checkInDate = new Date(date1);
  const checkOutDate = new Date(date2);
  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  const dayDifference = timeDifference / (24 * 3600 * 1000);
  const totalPrice = dayDifference * price;
  console.log(totalPrice);
  document.getElementById(id).textContent = totalPrice;
}
export function totalBookedPrice(id, price, date1, date2) {
  const checkInDate = new Date(date1);
  const checkOutDate = new Date(date2);
  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  const dayDifference = timeDifference / (24 * 3600 * 1000);
  const totalPrice = dayDifference * price + (dayDifference * price) / 10;
  document.getElementById(id).textContent = totalPrice;
}
export function displayNight(id, date1, date2) {
  const checkInDate = new Date(date1);
  const checkOutDate = new Date(date2);
  const timeDifference = Number(checkOutDate.getTime() - checkInDate.getTime());
  const dayDifference = Number(timeDifference / (24 * 3600 * 1000));
  document.getElementById(id).textContent = dayDifference;
}
export function disableInput(select, textarea, input) {
  document.getElementById(select).disabled = true;
  document.getElementById(textarea).disabled = true;
  let inputs = document.getElementsByTagName(input);
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i]) {
      inputs[i].disabled = true;
    }
  }
}
