document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("calculate-ke");

  button.addEventListener("click", () => {
    const m = parseFloat(document.getElementById("mass").value);
    const v = parseFloat(document.getElementById("velocity").value);
    const output = document.getElementById("ke-output");

    if (isNaN(m) || isNaN(v)) {
      output.innerHTML = `<p style="color:red;">Please enter valid numbers.</p>`;
      if (window.MathJax) MathJax.typesetPromise();
      return;
    }

    const ke = 0.5 * m * v * v;

    output.innerHTML = `
      <p><strong>Formula:</strong></p>
      \\[ KE = \\frac{1}{2}mv^2 \\]

      <p><strong>Substitute values:</strong></p>
      \\[ KE = \\frac{1}{2}(${m})(${v})^2 \\]

      <p><strong>Step-by-step:</strong></p>
      \\[ KE = 0.5 \\times ${m} \\times ${v * v} \\]

      <p><strong>Result:</strong></p>
      \\[ KE = \\boxed{${ke.toFixed(2)} \\text{ J}} \\]
    `;

    if (window.MathJax) {
      MathJax.typesetPromise()
        .catch((err) => console.error("MathJax render error:", err));
    }
  });
});
