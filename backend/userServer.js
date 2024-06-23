const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = process.argv[3] || 4000;
// const userId = process.argv[2];
const userDirectory = process.argv[2];

if (!userDirectory) {
  console.error('userId is required');
  process.exit(1);
}

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/aqula.tw1.ru/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/aqula.tw1.ru/fullchain.pem')
};


console.log(PORT);

app.use(express.static(userDirectory));

app.get('/', (req, res) => {
  res.sendFile(path.join(userDirectory, 'index.html'));
});

// app.listen(PORT, () => {
//   console.log(`User server running at http://localhost:${PORT}/, serving folder ${userDirectory}`);
// });

https.createServer(options, app).listen(PORT, () => {
  console.log(`User server running at http://localhost:${PORT}/, serving folder ${userDirectory}`);
});