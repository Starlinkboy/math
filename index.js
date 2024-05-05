  const express = require('express');
  const bodyParser = require('body-parser');

  const app = express();

  // Middleware to parse JSON bodies
  app.use(bodyParser.json());

  // Middleware to serve static files
  app.use(express.static('public'));

  // Basic home route to serve the HTML page
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

  // Route to solve quadratic equations
  app.post('/solve-quadratic', (req, res) => {
    const { a, b, c } = req.body;

    // Calculate the discriminant
    const discriminant = b * b - 4 * a * c;

    let roots;
    if (discriminant > 0) {
      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      roots = `Root 1: ${root1}, Root 2: ${root2}`;
    } else if (discriminant === 0) {
      const root = -b / (2 * a);
      roots = `One root: ${root}`;
    } else {
      const realPart = -b / (2 * a);
      const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * a);
      roots = `Complex roots: ${realPart} ± ${imaginaryPart}i`;
    }

    res.json({ roots });
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
