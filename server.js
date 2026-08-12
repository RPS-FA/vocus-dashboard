// Servidor estático mínimo, sem dependências — Vocus Monitoring Dashboard
const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  if (req.url === '/health') { res.writeHead(200); return res.end('ok'); }
  const file = path.join(__dirname, 'index.html');
  fs.stat(file, (err, st) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Last-Modified': st.mtime.toUTCString()
    });
    fs.createReadStream(file).pipe(res);
  });
}).listen(PORT, () => console.log('Vocus dashboard on :' + PORT));
