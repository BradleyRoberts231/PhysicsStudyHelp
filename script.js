document.addEventListener("DOMContentLoaded", () => {
  // KE Calculator
  const massInput = document.getElementById("mass");
  const velocityInput = document.getElementById("velocity");
  const keOutput = document.getElementById("ke-output");
  const keBtn = document.getElementById("calculate-ke");

  keBtn.addEventListener("click", () => {
    const m = parseFloat(massInput.value);
    const v = parseFloat(velocityInput.value);
    if (isNaN(m) || isNaN(v)) {
      keOutput.innerHTML = `<p style="color:red;">Please enter valid numbers.</p>`;
      MathJax.typesetPromise();
      return;
    }
    const ke = 0.5 * m * v * v;
    keOutput.innerHTML = `
      <div>\\[ KE = \\frac{1}{2}mv^2 \\]</div>
      <div>\\[ KE = \\frac{1}{2}(${m})(${v})^2 \\]</div>
      <div>\\[ KE = 0.5 \\times ${m} \\times ${v * v} \\]</div>
      <div>\\[ KE = \\boxed{${ke.toFixed(2)} \\text{ J}} \\]</div>
    `;
    MathJax.typesetPromise();
  });

  // Kinematic Equation Solver
  const solveBtn = document.getElementById("solve-kinematic");
  const kinOutput = document.getElementById("kinematic-output");

  solveBtn.addEventListener("click", () => {
    const formula = document.getElementById("formula-select").value;
    const v0 = parseFloat(document.getElementById("v0").value);
    const a = parseFloat(document.getElementById("a").value);
    const t = parseFloat(document.getElementById("t").value);
    const dx = parseFloat(document.getElementById("dx").value);

    kinOutput.innerHTML = "";

    try {
      let latex = "";

      if (formula === "v") {
        if (isNaN(v0) || isNaN(a) || isNaN(t)) throw "Missing input.";
        const v = v0 + a * t;
        latex = `
          \\[
            v = v_0 + at \\\\
            v = ${v0} + ${a} \\times ${t} \\\\
            v = ${v.toFixed(2)} \\\\
            \\boxed{v = ${v.toFixed(2)}\\ \\text{m/s}}
          \\]
        `;
      } else if (formula === "x") {
        if (isNaN(v0) || isNaN(a) || isNaN(t)) throw "Missing input.";
        const x = v0 * t + 0.5 * a * t * t;
        latex = `
          \\[
            \\Delta x = v_0t + \\frac{1}{2}at^2 \\\\
            = ${v0} \\times ${t} + \\frac{1}{2} \\times ${a} \\times ${t}^2 \\\\
            = ${x.toFixed(2)} \\\\
            \\boxed{\\Delta x = ${x.toFixed(2)}\\ \\text{m}}
          \\]
        `;
      } else if (formula === "v2") {
        if (isNaN(v0) || isNaN(a) || isNaN(dx)) throw "Missing input.";
        const vSquared = v0 * v0 + 2 * a * dx;
        const v = Math.sqrt(vSquared);
        latex = `
          \\[
            v^2 = v_0^2 + 2a\\Delta x \\\\
            = ${v0}^2 + 2 \\times ${a} \\times ${dx} \\\\
            = ${vSquared.toFixed(2)} \\\\
            \\boxed{v = ${v.toFixed(2)}\\ \\text{m/s}}
          \\]
        `;
      }

      kinOutput.innerHTML = latex;
      MathJax.typesetPromise();
    } catch (err) {
      kinOutput.innerHTML = `<p style="color:red;">Error: ${err}</p>`;
    }
  });
});
