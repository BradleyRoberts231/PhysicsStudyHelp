document.getElementById("calculate-ke").addEventListener("click", () => {
  const m = parseFloat(document.getElementById("mass").value);
  const v = parseFloat(document.getElementById("velocity").value);
  const output = document.getElementById("ke-output");

  if (isNaN(m) || isNaN(v)) {
    output.innerHTML = "Please enter valid numbers for both mass and velocity.";
    return;
  }

  const ke = 0.5 * m * v * v;
  const step1 = `\\( KE = \\frac{1}{2}mv^2 \\)`;
  const step2 = `\\( KE = \\frac{1}{2} \\times ${m} \\times (${v})^2 \\)`;
  const step3 = `\\( KE = ${0.5 * m} \\times ${v * v} \\)`;
  const final = `\\( KE = ${ke.toFixed(2)}\\ \\text{J} \\)`;

  output.innerHTML = `
    <p>\\( \\text{Given: } m = ${m}\\ \\text{kg},\\ v = ${v}\\ \\text{m/s} \\)</p>
    <p>${step1}</p>
    <p>${step2}</p>
    <p>${step3}</p>
    <p><strong>${final}</strong></p>
  `;

  MathJax.typesetPromise();
});
