const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/public');
app.use(express.static(publicPath));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, function (err) {
  if (err) console.log(err);
  console.log('Server listening on PORT', port);
});
