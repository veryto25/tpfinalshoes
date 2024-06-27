const express = require('express')
const app = express()
const shoesRouter = require('../routes/shoes')
const cors = require ('cors')

app.use(cors()); 

app.use(express.json())

app.use('/shoes', shoesRouter)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})