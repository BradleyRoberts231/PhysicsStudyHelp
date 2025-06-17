// kinematic.js — Redesigned for modular layout, LaTeX output, and consistent formatting

document.addEventListener('DOMContentLoaded', () => {
  const formulaSelect = document.getElementById('formula-select');
  const inputContainer = document.getElementById('input-fields');
  const resultContainer = document.getElementById('kinematic-result');
  const solveButton = document.getElementById('solve-btn');

  const formulas = {
    'v = v₀ + at': ['v₀', 'a', 't'],
    'x = x₀ + v₀t + ½at²': ['x₀', 'v₀', 'a', 't'],
    'v² = v₀² + 2a(x − x₀)': ['v₀', 'a', 'x', 'x₀']
  };

  formulaSelect.addEventListener('change', () => {
    const selected = formulaSelect.value;
    renderInputs(formulas[selected]);
    resultContainer.innerHTML = '';
  });

  solveButton.addEventListener('click', () => {
    const selected = formulaSelect.value;
    const inputs = getInputs();
    const result = solveFormula(selected, inputs);
    renderResult(result);
  });

  function renderInputs(variables) {
    inputContainer.innerHTML = '';
    variables.forEach(v => {
      const div = document.createElement('div');
      div.className = 'input-group';
      div.innerHTML = `
        <label for="${v}">${v}</label>
        <input type="number" id="${v}" placeholder="Enter ${v}" required />
      `;
      inputContainer.appendChild(div);
    });
  }

  function getInputs() {
    const inputs = {};
    document.querySelectorAll('#input-fields input').forEach(input => {
      inputs[input.id] = parseFloat(input.value);
    });
    return inputs;
  }

  function solveFormula(formula, vars) {
    let steps = [];
    let result = null;
    try {
      switch (formula) {
        case 'v = v₀ + at':
          result = vars['v₀'] + vars['a'] * vars['t'];
          steps.push(`v = ${vars['v₀']} + ${vars['a']} * ${vars['t']}`);
          break;
        case 'x = x₀ + v₀t + ½at²':
          result = vars['x₀'] + vars['v₀'] * vars['t'] + 0.5 * vars['a'] * vars['t'] ** 2;
          steps.push(`x = ${vars['x₀']} + ${vars['v₀']} * ${vars['t']} + 0.5 * ${vars['a']} * ${vars['t']}²`);
          break;
        case 'v² = v₀² + 2a(x − x₀)':
          result = Math.sqrt(vars['v₀'] ** 2 + 2 * vars['a'] * (vars['x'] - vars['x₀']));
          steps.push(`v² = ${vars['v₀']}² + 2 * ${vars['a']} * (${vars['x']} − ${vars['x₀']})`);
          break;
      }
    } catch (e) {
      return { error: 'Invalid input or missing value.' };
    }
    return { result, steps };
  }

  function renderResult(res) {
    if (res.error) {
      resultContainer.innerHTML = `<p class="error">${res.error}</p>`;
    } else {
      let output = `\\[${res.steps[0]}\\]`;
      output += `<br>\\[\\text{Result: } ${res.result.toFixed(2)}\\]`;
      resultContainer.innerHTML = output;
      if (typeof MathJax !== 'undefined') MathJax.typesetPromise([resultContainer]);
    }
  }

  // Initialize default inputs
  renderInputs(formulas[formulaSelect.value]);
});
