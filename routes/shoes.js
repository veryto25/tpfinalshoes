const express = require('express')
const router = express.Router()
const shoeController = require('../controllers/shoeController')
const upload = require('../middleware/multerConfig')

router.get('/', shoeController.getAllShoes)
// router.get('/', shoeController.getAllCreadores)
router.get('/buscarZapato/:id', shoeController.getShoeById)
router.get('/image/:id', shoeController.getShoeImage) // solucion problema imagen

router.post('/', upload.single('image'), shoeController.createShoe)

router.put('/:id', upload.single('image'), shoeController.updateShoe)
router.delete('/:id', shoeController.deleteShoe)
router.get('/deleteshoes', shoeController.getDeletedShoes)

module.exports = router