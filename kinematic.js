const formulaMap = {
  v: ['v0', 'a', 't'],
  x: ['v0', 'a', 't'],
  v2: ['v0', 'a', 'dx']
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
    label.textContent = `${variable}`;
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
          v = v_0 + at \\\\
          = ${v0} + ${a} \\times ${t} = ${v.toFixed(2)}\\ \\text{m/s}
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
          \\Delta x = v_0t + \\frac{1}{2}at^2 \\\\
          = ${v0} \\times ${t} + \\frac{1}{2} \\times ${a} \\times ${t}^2 = ${dx.toFixed(2)}\\ \\text{m}
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
          v^2 = v_0^2 + 2a\\Delta x \\\\
          = (${v0})^2 + 2 \\times ${a} \\times ${dx} = ${v2.toFixed(2)}\\ \\text{(m/s)}^2
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

// Trigger initial input field generation
generateInputs();
