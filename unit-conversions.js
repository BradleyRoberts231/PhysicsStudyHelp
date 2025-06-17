// unit-conversions.js — Cleaned and LaTeX-corrected

document.addEventListener('DOMContentLoaded', () => {
  setupConverter('distance-converter', 'Distance', [
    { name: 'Meters', factor: 1 },
    { name: 'Kilometers', factor: 0.001 },
    { name: 'Feet', factor: 3.28084 },
    { name: 'Inches', factor: 39.3701 },
    { name: 'Miles', factor: 0.000621371 }
  ]);

  setupConverter('time-converter', 'Time', [
    { name: 'Seconds', factor: 1 },
    { name: 'Minutes', factor: 1 / 60 },
    { name: 'Hours', factor: 1 / 3600 },
    { name: 'Days', factor: 1 / 86400 }
  ]);

  setupConverter('mass-converter', 'Mass', [
    { name: 'Grams', factor: 1 },
    { name: 'Kilograms', factor: 0.001 },
    { name: 'Pounds', factor: 0.00220462 },
    { name: 'Ounces', factor: 0.035274 }
  ]);

  setupConverter('energy-converter', 'Energy', [
    { name: 'Joules', factor: 1 },
    { name: 'Calories', factor: 0.239006 },
    { name: 'Electron Volts (eV)', factor: 6.242e+18 }
  ]);

  setupConverter('force-converter', 'Force', [
    { name: 'Newtons', factor: 1 },
    { name: 'Dynes', factor: 100000 },
    { name: 'Pound-force', factor: 0.224809 }
  ]);

  setupTemperatureConverter('temperature-converter', 'Temperature');
});

function setupConverter(containerId, label, units) {
  const container = document.getElementById(containerId);

  const section = document.createElement('section');
  section.className = 'conversion-section';

  const heading = document.createElement('h3');
  heading.className = 'conversion-title';
  heading.textContent = label;

  const fieldset = document.createElement('fieldset');
  fieldset.className = 'converter-fieldset compact';

  const input = document.createElement('input');
  input.type = 'number';
  input.placeholder = `Enter ${label.toLowerCase()} value`;
  input.className = 'converter-input styled-input';

  const fromSelect = document.createElement('select');
  const toSelect = document.createElement('select');

  units.forEach(unit => {
    const opt1 = document.createElement('option');
    const opt2 = document.createElement('option');
    opt1.value = opt2.value = unit.factor;
    opt1.textContent = opt2.textContent = unit.name;
    fromSelect.appendChild(opt1);
    toSelect.appendChild(opt2);
  });

  const button = document.createElement('button');
  button.textContent = 'Convert';
  button.className = 'toggle-btn';

  const output = document.createElement('div');
  output.className = 'converter-output';

  button.onclick = () => {
    const val = parseFloat(input.value);
    if (isNaN(val)) {
      output.innerHTML = '<p class="error">Please enter a valid number.</p>';
      return;
    }
    const from = parseFloat(fromSelect.value);
    const to = parseFloat(toSelect.value);
    const unitLabel = toSelect.options[toSelect.selectedIndex].text;
    const result = val * (1 / from) * to;

    output.innerHTML = `\\[${result.toPrecision(6)}\\ \\text{${unitLabel}}\\]`;
    if (typeof MathJax !== 'undefined') MathJax.typesetPromise([output]);
  };

  fieldset.appendChild(input);
  fieldset.appendChild(fromSelect);
  fieldset.appendChild(toSelect);
  fieldset.appendChild(button);
  fieldset.appendChild(output);

  section.appendChild(heading);
  section.appendChild(fieldset);
  container.appendChild(section);
}

function setupTemperatureConverter(containerId, label) {
  const container = document.getElementById(containerId);

  const section = document.createElement('section');
  section.className = 'conversion-section';

  const heading = document.createElement('h3');
  heading.className = 'conversion-title';
  heading.textContent = label;

  const fieldset = document.createElement('fieldset');
  fieldset.className = 'converter-fieldset compact';

  const input = document.createElement('input');
  input.type = 'number';
  input.placeholder = 'Enter temperature';
  input.className = 'converter-input styled-input';

  const fromSelect = document.createElement('select');
  const toSelect = document.createElement('select');
  const units = ['Celsius', 'Fahrenheit', 'Kelvin'];

  units.forEach(u => {
    const opt1 = document.createElement('option');
    const opt2 = document.createElement('option');
    opt1.value = opt2.value = u;
    opt1.textContent = opt2.textContent = u;
    fromSelect.appendChild(opt1);
    toSelect.appendChild(opt2);
  });

  const button = document.createElement('button');
  button.textContent = 'Convert';
  button.className = 'toggle-btn';

  const output = document.createElement('div');
  output.className = 'converter-output';

  button.onclick = () => {
    const value = parseFloat(input.value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (isNaN(value)) {
      output.innerHTML = '<p class="error">Please enter a valid number.</p>';
      return;
    }

    let result;
    if (from === to) {
      result = value;
    } else {
      let tempC;
      if (from === 'Celsius') tempC = value;
      else if (from === 'Fahrenheit') tempC = (value - 32) * 5 / 9;
      else if (from === 'Kelvin') tempC = value - 273.15;

      if (to === 'Celsius') result = tempC;
      else if (to === 'Fahrenheit') result = tempC * 9 / 5 + 32;
      else if (to === 'Kelvin') result = tempC + 273.15;
    }

    output.innerHTML = `\\[${result.toFixed(2)}\\ \\text{${to}}\\]`;
    if (typeof MathJax !== 'undefined') MathJax.typesetPromise([output]);
  };

  fieldset.appendChild(input);
  fieldset.appendChild(fromSelect);
  fieldset.appendChild(toSelect);
  fieldset.appendChild(button);
  fieldset.appendChild(output);

  section.appendChild(heading);
  section.appendChild(fieldset);
  container.appendChild(section);
}
