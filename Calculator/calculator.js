let calculation = localStorage.getItem("calculation") || "";

//Displays the calculation when the page first loads.
displayCalculation();

function updateCalculation(value) {
  calculation += value;
  console.log(calculation);

  displayCalculation();
  localStorage.setItem("calculation", calculation);
}

function displayCalculation() {
  //using DOM to display calculation on the page.
  document.querySelector(".displayCalculation").innerText = calculation;
}
