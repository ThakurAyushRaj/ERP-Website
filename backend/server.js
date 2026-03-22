const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello, World! This is the backend server.\n');
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

