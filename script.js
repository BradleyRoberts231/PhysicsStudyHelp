
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
      \\[
        \\begin{aligned}
        \\text{Formula:} &\\quad KE = \\frac{1}{2}mv^2 \\\\
        \\text{Substitute:} &\\quad KE = \\frac{1}{2}(${m})(${v})^2 \\\\
        \\text{Steps:} &\\quad KE = 0.5 \\times ${m} \\times ${v * v} \\\\
        \\text{Result:} &\\quad KE = \\boxed{${ke.toFixed(2)}\\ \\text{J}}
        \\end{aligned}
      \\]
    `;

    if (window.MathJax) {
      MathJax.typesetPromise().catch(err =>
        console.error("MathJax render error:", err)
      );
    }
  });
});
