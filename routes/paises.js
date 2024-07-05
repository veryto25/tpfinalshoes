const express = require('express')
const router = express.Router()
const paisController = require('../controllers/paisController')

router.get('/', paisController.getAllPaises)

router.post('/', paisController.createPais)
router.get('/buscarPais/:id', paisController.getPaisById)
router.delete('/:id', paisController.deletePais)
router.put('/:id', paisController.updatePais)

module.exports = router