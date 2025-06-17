// script.js

// Confirm the JS file is connected
console.log("script.js loaded");

// Example: Calculate Kinetic Energy (KE = 0.5 * m * v^2)
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

// Placeholder for future tools
function comingSoon() {
  alert("This tool is coming soon!");
}
