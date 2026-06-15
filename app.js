const http = require('http');
const fs = require('fs');
const path = require('path');
 
const port = process.env.PORT || 4000;
 
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};
 
const server = http.createServer((req, res) => {
  const fileUrl = req.url === '/' ? '/gallery.html' : req.url;
  const safeUrl = fileUrl.split('?')[0].replace(/^\/+/, '');
  const filePath = path.join(__dirname, safeUrl);
 
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Invalid request');
    return;
  }
 
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }
 
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});
 
server.listen(port, () => {
  console.log(`Server running: http://localhost:${port}`);
});
 
 