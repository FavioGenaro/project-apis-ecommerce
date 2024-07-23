const { Router } = require('express');
const router = Router();
const { cargarArchivo } = require('../controllers/uploads');

router.post( '/', cargarArchivo)

module.exports = router;