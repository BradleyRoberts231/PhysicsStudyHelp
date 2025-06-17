document.getElementById("calculate-ke").addEventListener("click", () => {
  const m = parseFloat(document.getElementById("mass").value);
  const v = parseFloat(document.getElementById("velocity").value);
  const output = document.getElementById("ke-output");

  if (isNaN(m) || isNaN(v)) {
    output.innerHTML = "Please enter valid numbers for both mass and velocity.";
    return;
  }

  const ke = 0.5 * m * v * v;

  output.innerHTML = `
    \\[
    \\text{Given:} \\\\
    m = ${m}\\ \\text{kg}, \\quad v = ${v}\\ \\text{m/s} \\\\
    \\text{Kinetic Energy formula:}\\quad KE = \\frac{1}{2}mv^2 \\\\
    \\text{Step 1:}\\quad KE = \\frac{1}{2} \\times ${m} \\times (${v})^2 \\\\
    \\text{Step 2:}\\quad KE = ${0.5 * m} \\times ${v * v} \\\\
    \\text{Result:}\\quad KE = ${ke.toFixed(2)}\\ \\text{Joules}
    \\]
  `;
  MathJax.typesetPromise();
});
