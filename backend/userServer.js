const express = require('express');
const path = require('path');

const app = express();
const PORT = process.argv[3] || 4000;
// const userId = process.argv[2];
const userDirectory = process.argv[2];

if (!userDirectory) {
  console.error('userId is required');
  process.exit(1);
}

console.log(PORT);

app.use(express.static(userDirectory));

app.get('/', (req, res) => {
  res.sendFile(path.join(userDirectory, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`User server running at http://localhost:${PORT}/, serving folder ${userDirectory}`);
});