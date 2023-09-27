const express = require('express');
const app = express();
const port = 4000;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const alatRouter = require('./routes/alat'); 
const pemilikRouter = require('./routes/pemilik'); 
const dpiRouter = require('./routes/dpi'); 
const kapalRouter = require('./routes/kapal'); 

app.use('/api/alat', alatRouter);
app.use('/api/pemilik', pemilikRouter);
app.use('/api/dpi', dpiRouter);
app.use('/api/kapal', kapalRouter);

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
