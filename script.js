function calculateKineticEnergy() {
  const m = parseFloat(document.getElementById("mass").value);
  const v = parseFloat(document.getElementById("velocity").value);
  const output = document.getElementById("result");

  if (isNaN(m) || isNaN(v)) {
    output.textContent = "Please enter valid numbers.";
    return;
  }

  const ke = 0.5 * m * v * v;
  output.textContent = `Kinetic Energy: ${ke.toFixed(2)} J`;
}
