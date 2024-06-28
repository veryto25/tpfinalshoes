const express = require('express')
const app = express()
const shoesRouter = require('../routes/shoes')
const cors = require ('cors')
const whiteList = ['http://127.0.0.1:5500']
// Constante cors para abrir app desde otro puerto (5500)

app.use(cors({ origin: whiteList })); 

// solucionar apertura de imagen en html ( no funicionó!!!!!)
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
   
  });

app.use(express.json());

app.use('/shoes', shoesRouter);


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})