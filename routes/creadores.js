const express = require('express')
const router = express.Router()
const creadorController = require('../controllers/creadorController')

router.get('/', creadorController.getAllCreadores)

router.post('/', creadorController.createCreador)
router.get('/buscarCreador/:id', creadorController.getCreadorById)
router.delete('/:id', creadorController.deleteCreador)
router.put('/:id', creadorController.updateCreador)

module.exports = router