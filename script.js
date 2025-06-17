document.addEventListener("DOMContentLoaded", () => {
  const massInput = document.getElementById("mass");
  const velocityInput = document.getElementById("velocity");
  const output = document.getElementById("ke-output");
  const button = document.getElementById("calculate-ke");

  button.addEventListener("click", () => {
    const m = parseFloat(massInput.value);
    const v = parseFloat(velocityInput.value);

    if (isNaN(m) || isNaN(v)) {
      output.innerHTML = `<p style="color: red;">Please enter valid numbers for mass and velocity.</p>`;
      MathJax.typesetPromise();
      return;
    }

    const ke = 0.5 * m * v * v;

    output.innerHTML = `
      <div>\\[ KE = \\frac{1}{2}mv^2 \\]</div>
      <div>\\[ KE = \\frac{1}{2}(${m})(${v})^2 \\]</div>
      <div>\\[ KE = 0.5 \\times ${m} \\times ${v * v} \\]</div>
      <div>\\[ KE = \\boxed{${ke.toFixed(2)} \\text{ J}} \\]</div>
    `;

    MathJax.typesetPromise().catch(err => console.error("MathJax render error:", err));
  });
});
