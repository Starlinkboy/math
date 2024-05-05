document.getElementById('quadratic-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const c = parseFloat(document.getElementById('c').value);
  
  document.getElementById('eq').textContent = `Equation: ${a}x^2 + ${b}x + ${c} = 0`;
  fetch('/solve-quadratic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ a, b, c })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('result').textContent = `Roots: ${data.roots}`;
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
