// script.js

console.log("script.js loaded");

function calculateKineticEnergy() {
  const massInput = document.getElementById("mass");
  const velocityInput = document.getElementById("velocity");
  const resultOutput = document.getElementById("result");

  const m = parseFloat(massInput.value);
  const v = parseFloat(velocityInput.value);

  if (isNaN(m) || isNaN(v)) {
    resultOutput.textContent = "Please enter valid numbers for mass and velocity.";
    return;
  }

  const ke = 0.5 * m * v * v;
  resultOutput.textContent = `Kinetic Energy: ${ke.toFixed(2)} J`;
}

function comingSoon() {
  alert("This tool is coming soon!");
}
