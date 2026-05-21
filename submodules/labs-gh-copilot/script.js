
// Pennywise: Income/Expense Data, Validation, and Chart
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// In-memory data model with visually appealing defaults
const data = {
  income: [800, 950, 700, 1000, 850, 900, 600, 750, 500, 950, 850, 650],
  expense: [400, 600, 350, 800, 500, 700, 300, 450, 200, 650, 550, 400]
};


let chart = null;
let chartInitialized = false;

function getInputs() {
  return {
    income: Array.from(document.querySelectorAll('.income-input')),
    expense: Array.from(document.querySelectorAll('.expense-input'))
  };
}

function validateInput(input) {
  const value = input.value.trim();
  if (value === '' || isNaN(value) || Number(value) < 0) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    return false;
  } else {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    return true;
  }
}

function updateDataFromInputs() {
  const inputs = getInputs();
  let allValid = true;
  inputs.income.forEach((input, i) => {
    if (validateInput(input)) {
      data.income[i] = Number(input.value);
    } else {
      allValid = false;
    }
  });
  inputs.expense.forEach((input, i) => {
    if (validateInput(input)) {
      data.expense[i] = Number(input.value);
    } else {
      allValid = false;
    }
  });
  return allValid;
}


function debugLog(msg) {
  const debugDiv = document.getElementById('debug-output');
  if (debugDiv) {
    debugDiv.textContent = msg;
  }
  console.log('[Pennywise Debug]', msg);
}

function renderChart() {
  const canvas = document.getElementById('incomeExpenseChart');
  if (!canvas) {
    debugLog('Chart canvas not found.');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (chartInitialized && chart) {
    chart.data.datasets[0].data = data.income;
    chart.data.datasets[1].data = data.expense;
    chart.update();
    debugLog('Chart updated with new data.');
    return;
  }
  try {
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Income',
            data: data.income,
            backgroundColor: 'rgba(40, 167, 69, 0.7)',
          },
          {
            label: 'Expense',
            data: data.expense,
            backgroundColor: 'rgba(220, 53, 69, 0.7)',
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Income vs Expense by Month' }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
    chartInitialized = true;
    debugLog('Chart initialized successfully.');
  } catch (e) {
    debugLog('Chart.js error: ' + e.message);
  }
}

function setupInputListeners() {
  const inputs = getInputs();
  [...inputs.income, ...inputs.expense].forEach((input) => {
    input.addEventListener('input', () => {
      const allValid = updateDataFromInputs();
      if (allValid) {
        renderChart();
      }
    });
    // Initial validation
    validateInput(input);
  });
}


window.addEventListener('DOMContentLoaded', () => {
  setupInputListeners();
  updateDataFromInputs();

  // Username validation and message rendering
  const usernameForm = document.getElementById('username-form');
  const usernameInput = document.getElementById('username');
  const usernameError = document.getElementById('usernameError');
  const usernamePattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{5,}$/;

  function renderUsernameMessage(isValid) {
    if (isValid) {
      usernameError.style.display = 'block';
      usernameError.classList.remove('text-danger');
      usernameError.classList.add('text-success');
      usernameError.textContent = 'Username is valid!';
    } else {
      usernameError.style.display = 'block';
      usernameError.classList.remove('text-success');
      usernameError.classList.add('text-danger');
      usernameError.textContent = 'Username does not meet requirements.';
    }
  }

  if (usernameForm && usernameInput && usernameError) {
    usernameForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = usernameInput.value.trim();
      const isValid = usernamePattern.test(value);
      renderUsernameMessage(isValid);
    });
    usernameInput.addEventListener('input', () => {
      const value = usernameInput.value.trim();
      if (value === '') {
        usernameError.style.display = 'none';
        return;
      }
      const isValid = usernamePattern.test(value);
      renderUsernameMessage(isValid);
    });
  }

  const chartTab = document.getElementById('chart-tab');
  if (chartTab) {
    chartTab.addEventListener('shown.bs.tab', () => {
      renderChart();
    });
    // If user starts on Chart tab, render immediately after DOM is ready
    if (chartTab.classList.contains('active')) {
      setTimeout(renderChart, 0);
    }
  }

  // Always update chart data on every input
  const inputs = getInputs();
  [...inputs.income, ...inputs.expense].forEach((input, idx) => {
    input.addEventListener('input', () => {
      debugLog('Input event on ' + (idx < 12 ? 'income' : 'expense') + ' field #' + (idx % 12 + 1) + ' value: ' + input.value);
      if (chartInitialized && chart) {
        chart.data.datasets[0].data = data.income;
        chart.data.datasets[1].data = data.expense;
        chart.update();
        debugLog('Chart updated after input.');
      }
    });
  });
  // Download Chart functionality
  const downloadBtn = document.getElementById('download-chart');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      if (chart && chart.canvas) {
        const link = document.createElement('a');
        link.href = chart.toBase64Image();
        link.download = 'pennywise-chart.png';
        link.click();
        debugLog('Chart downloaded as pennywise-chart.png');
      } else {
        debugLog('Chart is not initialized.');
      }
    });
  }
});