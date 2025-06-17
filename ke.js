// ke.js — Modular calculator for kinetic energy with LaTeX output and professional layout

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ke-form');
  const output = document.getElementById('ke-output');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const mass = parseFloat(document.getElementById('mass').value);
    const velocity = parseFloat(document.getElementById('velocity').value);

    if (isNaN(mass) || isNaN(velocity)) {
      output.innerHTML = '<p class="error">Please enter valid values for both mass and velocity.</p>';
      return;
    }

    const ke = 0.5 * mass * velocity ** 2;

    const steps = [
      `KE = \frac{1}{2}mv^2`,
      `KE = \frac{1}{2}(${mass})(${velocity})^2`,
      `KE = \frac{1}{2}(${mass})(${(velocity ** 2).toFixed(2)})`,
      `KE = ${(ke).toFixed(2)}\ \text{J}`
    ];

    output.innerHTML = steps.map(step => `\\[${step}\\]`).join('<br>');
    if (typeof MathJax !== 'undefined') MathJax.typesetPromise([output]);
  });
});
