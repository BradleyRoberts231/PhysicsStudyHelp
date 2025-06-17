document.addEventListener("DOMContentLoaded", () => {
  const calcButton = document.getElementById("calculate-btn");

  calcButton.addEventListener("click", () => {
    const m = parseFloat(document.getElementById("mass").value);
    const v = parseFloat(document.getElementById("velocity").value);
    const outputDiv = document.getElementById("ke-output");

    if (isNaN(m) || isNaN(v)) {
      outputDiv.innerHTML = `<p style="color: red;">Please enter valid numbers for mass and velocity.</p>`;
      if (window.MathJax) MathJax.typeset();
      return;
    }

    const ke = 0.5 * m * v * v;

    outputDiv.innerHTML = `
      \\[
      \\textbf{\\text{Formula:}} \\quad KE = \\frac{1}{2}mv^2 \\\\
      \\textbf{\\text{Substitute:}} \\quad KE = \\frac{1}{2}(${m})(${v})^2 \\\\
      \\textbf{\\text{Step:}} \\quad KE = 0.5 \\times ${m} \\times ${v * v} \\\\
      \\textbf{\\text{Result:}} \\quad KE = \\boxed{${ke.toFixed(2)}\\ \\text{J}}
      \\]
    `;

    if (window.MathJax) {
      MathJax.typesetPromise()
        .then(() => console.log("MathJax rendered"))
        .catch((err) => console.error("MathJax error:", err));
    }
  });
});
