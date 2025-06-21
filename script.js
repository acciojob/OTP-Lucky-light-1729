const inputs = document.querySelectorAll('.code');

inputs.forEach((input, index) => {
  input.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value.length > 0 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      if (input.value === '') {
        if (index > 0) {
          inputs[index - 1].focus();
          inputs[index - 1].value = '';
          e.preventDefault();
        }
      } else {
        input.value = '';
      }
    } else if (e.key >= '0' && e.key <= '9') {
      // Allow input
    } else {
      e.preventDefault(); // Disallow non-digit characters
    }
  });

  input.addEventListener('paste', (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = paste[i] || '';
    }
    const next = paste.length < inputs.length ? paste.length : inputs.length - 1;
    inputs[next].focus();
    e.preventDefault();
  });
});

window.addEventListener('load', () => inputs[0].focus());
