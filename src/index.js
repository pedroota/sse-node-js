const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write('data: Connected\n\n');

  const intervalId = setInterval(() => {
    const message = `data: ${new Date().toLocaleTimeString()}\n\n`;
    res.write(message);
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalId);
    res.end('data: Disconnected\n\n');
  }, 10000);
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:${3000}`);
});
