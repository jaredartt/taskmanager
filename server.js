const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Name: John Doe'); // Replace with the name you want to display
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});