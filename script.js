function calculateKE() {
  const m = parseFloat(document.getElementById("mass").value);
  const v = parseFloat(document.getElementById("velocity").value);
  const output = document.getElementById("ke-output");

  if (isNaN(m) || isNaN(v)) {
    output.innerHTML = `<p style="color:red;">Please enter valid numbers for mass and velocity.</p>`;
    if (window.MathJax) MathJax.typeset();
    return;
  }

  const ke = 0.5 * m * v * v;

  output.innerHTML = `
    \\[
      \\textbf{\\text{Formula:}} \\quad KE = \\frac{1}{2}mv^2 \\\\
      \\textbf{\\text{Substitute:}} \\quad KE = \\frac{1}{2}(${m})(${v})^2 \\\\
      \\textbf{\\text{Step:}} \\quad KE = 0.5 \\times ${m} \\times ${v * v} \\\\
      \\textbf{\\text{Result:}} \\quad KE = \\boxed{${ke.toFixed(2)}\\ \\text{J}}
    \\]
  `;

  if (window.MathJax) {
    MathJax.typesetPromise()
      .catch(err => console.error("MathJax rendering error:", err));
  }
}
