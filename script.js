document.addEventListener("DOMContentLoaded", () => {
  const renderLatex = () => MathJax.typesetPromise().catch(console.error);

  // === KINETIC ENERGY CALCULATOR ===
  const keBtn = document.getElementById("calculate-ke");
  keBtn.addEventListener("click", () => {
    const m = parseFloat(document.getElementById("mass").value);
    const v = parseFloat(document.getElementById("velocity").value);
    const output = document.getElementById("ke-output");

    if (isNaN(m) || isNaN(v)) {
      output.innerHTML = `<p style="color:red;">Please enter valid numbers.</p>`;
      renderLatex();
      return;
    }

    const ke = 0.5 * m * v * v;
    output.innerHTML = `
      <div>\\[ KE = \\frac{1}{2}mv^2 \\]</div>
      <div>\\[ KE = \\frac{1}{2}(${m})(${v})^2 \\]</div>
      <div>\\[ KE = 0.5 \\times ${m} \\times ${v * v} \\]</div>
      <div>\\[ \\boxed{KE = ${ke.toFixed(2)}\\ \\text{J}} \\]</div>
    `;
    renderLatex();
  });

  // === KINEMATIC SOLVER ===
  const formulaSelect = document.getElementById("formula-select");
  const inputArea = document.getElementById("kinematic-inputs");
  const solveBtn = document.getElementById("solve-kinematic");
  const output = document.getElementById("kinematic-output");

  const variableFields = {
    v0: { label: "Initial velocity \( v_0 \) (m/s)", id: "v0" },
    a:  { label: "Acceleration \( a \) (m/s²)", id: "a" },
    t:  { label: "Time \( t \) (s)", id: "t" },
    dx: { label: "Displacement \( \\Delta x \) (m)", id: "dx" },
  };

  const formulaInputs = {
    v:  ["v0", "a", "t"],
    x:  ["v0", "a", "t"],
    v2: ["v0", "a", "dx"],
  };

  function renderInputs(formulaKey) {
    inputArea.innerHTML = "";
    formulaInputs[formulaKey].forEach(varKey => {
      const field = variableFields[varKey];
      const label = document.createElement("label");
      label.setAttribute("for", field.id);
      label.innerHTML = field.label;

      const input = document.createElement("input");
      input.type = "number";
      input.id = field.id;

      inputArea.appendChild(label);
      inputArea.appendChild(input);
    });
    renderLatex();
  }

  formulaSelect.addEventListener("change", () => {
    renderInputs(formulaSelect.value);
  });

  solveBtn.addEventListener("click", () => {
    const formula = formulaSelect.value;
    const vars = {};
    formulaInputs[formula].forEach(id => {
      vars[id] = parseFloat(document.getElementById(id).value);
    });

    if (Object.values(vars).some(val => isNaN(val))) {
      output.innerHTML = `<p style="color:red;">Please fill in all required values.</p>`;
      renderLatex();
      return;
    }

    let result = "";

    try {
      if (formula === "v") {
        const v = vars.v0 + vars.a * vars.t;
        result = `
          \\[
            v = v_0 + at \\\\
            v = ${vars.v0} + ${vars.a} \\times ${vars.t} \\\\
            \\boxed{v = ${v.toFixed(2)}\\ \\text{m/s}}
          \\]
        `;
      } else if (formula === "x") {
        const x = vars.v0 * vars.t + 0.5 * vars.a * vars.t ** 2;
        result = `
          \\[
            \\Delta x = v_0t + \\frac{1}{2}at^2 \\\\
            = ${vars.v0} \\times ${vars.t} + \\frac{1}{2} \\times ${vars.a} \\times ${vars.t}^2 \\\\
            \\boxed{\\Delta x = ${x.toFixed(2)}\\ \\text{m}}
          \\]
        `;
      } else if (formula === "v2") {
        const v2 = vars.v0 ** 2 + 2 * vars.a * vars.dx;
        if (v2 < 0) throw "Negative result under square root.";
        const v = Math.sqrt(v2);
        result = `
          \\[
            v^2 = v_0^2 + 2a\\Delta x \\\\
            = ${vars.v0}^2 + 2 \\times ${vars.a} \\times ${vars.dx} \\\\
            = ${v2.toFixed(2)} \\\\
            \\boxed{v = ${v.toFixed(2)}\\ \\text{m/s}}
          \\]
        `;
      }
    } catch (err) {
      result = `<p style="color:red;">Error: ${err}</p>`;
    }

    output.innerHTML = result;
    renderLatex();
  });

  renderInputs(formulaSelect.value); // Initial render
});
