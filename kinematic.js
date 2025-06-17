const formulaMap = {
  v: ['v0', 'a', 't'],         // v = v0 + at
  x: ['v0', 'a', 't'],         // Δx = v0t + ½at²
  v2: ['v0', 'a', 'dx']        // v² = v0² + 2aΔx
};

document.getElementById("formula-select").addEventListener("change", generateInputs);
document.getElementById("solve-kinematic").addEventListener("click", solveFormula);

function generateInputs() {
  const selected = document.getElementById("formula-select").value;
  const container = document.getElementById("kinematic-inputs");
  container.innerHTML = '';

  formulaMap[selected].forEach((variable) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    label.textContent = variable;
    label.setAttribute("for", variable);
    input.id = variable;
    input.type = "number";
    input.placeholder = variable;
    container.appendChild(label);
    container.appendChild(input);
  });
}

function solveFormula() {
  const selected = document.getElementById("formula-select").value;
  const output = document.getElementById("kinematic-output");

  let result = '';
  let v0, a, t, dx, v;

  try {
    switch (selected) {
      case 'v':
        v0 = parseFloat(document.getElementById("v0").value);
        a = parseFloat(document.getElementById("a").value);
        t = parseFloat(document.getElementById("t").value);
        if (isNaN(v0) || isNaN(a) || isNaN(t)) throw "Missing input.";

        v = v0 + a * t;
        result = `
          \\[
          \\text{Given: } v_0 = ${v0},\\ a = ${a},\\ t = ${t} \\\\
          v = v_0 + at = ${v0} + (${a})(${t}) = ${v.toFixed(2)}\\ \\text{m/s}
          \\]
        `;
        break;

      case 'x':
        v0 = parseFloat(document.getElementById("v0").value);
        a = parseFloat(document.getElementById("a").value);
        t = parseFloat(document.getElementById("t").value);
        if (isNaN(v0) || isNaN(a) || isNaN(t)) throw "Missing input.";

        dx = v0 * t + 0.5 * a * t * t;
        result = `
          \\[
          \\text{Given: } v_0 = ${v0},\\ a = ${a},\\ t = ${t} \\\\
          \\Delta x = v_0 t + \\frac{1}{2} a t^2 = ${v0} \\cdot ${t} + \\frac{1}{2} \\cdot ${a} \\cdot ${t}^2 = ${dx.toFixed(2)}\\ \\text{m}
          \\]
        `;
        break;

      case 'v2':
        v0 = parseFloat(document.getElementById("v0").value);
        a = parseFloat(document.getElementById("a").value);
        dx = parseFloat(document.getElementById("dx").value);
        if (isNaN(v0) || isNaN(a) || isNaN(dx)) throw "Missing input.";

        const v2 = v0 * v0 + 2 * a * dx;
        result = `
          \\[
          \\text{Given: } v_0 = ${v0},\\ a = ${a},\\ \\Delta x = ${dx} \\\\
          v^2 = v_0^2 + 2a\\Delta x = (${v0})^2 + 2 \\cdot ${a} \\cdot ${dx} = ${v2.toFixed(2)}\\ \\text{(m/s)}^2
          \\]
        `;
        break;
    }

    output.innerHTML = result;
    MathJax.typesetPromise();
  } catch (e) {
    output.innerHTML = `<p>Please fill in all required values.</p>`;
  }
}

// Initialize inputs on first load
generateInputs();
