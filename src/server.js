const express = require('express')
const shoesRouter = require('../routes/shoes')
const creadoresRouter = require('../routes/creadores')
var bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const whiteList = ['http://127.0.0.1:5500']
// Constante cors para abrir app desde otro puerto (5500)
app.use(express.urlencoded({ extended: true }));


app.use(cors({ origin: whiteList }));
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json())

app.use('/shoes', shoesRouter);
app.use('/creadores',creadoresRouter);

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
});