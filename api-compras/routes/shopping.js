// destructramos la función router
const { Router } = require('express');
const { obtenerComprasPorCliente, obtenerCompras, crearCompra, obtenerCompra } = require('../controllers/shopping');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeCompraClientePorId, existeCompraPorId } = require('../helpers/db-validators');

const router = Router(); // llamamos la función

// Obtener todas las compras en general
router.get('/',obtenerCompras)

// Obtener lista de compras de un cliente
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCompraClientePorId ),
    validarCampos
],obtenerComprasPorCliente) // función establecida en auth.js de controllers

// Obtener datos de una compra
router.get('/c/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCompraPorId ),
    validarCampos
], obtenerCompra)


// Crear compra
router.post('/', [ 
    check('fecha','La fecha es obligatorio').not().isEmpty(),
    check('total','El total es obligatorio').not().isEmpty(),
    check('clienteID','Debe iniciar sesión').isMongoId(),
    check('listProduct','No hay productos en lista').not().isEmpty(),
    validarCampos
], crearCompra);

// Actualizar producto - privado - cualquiera con token válido
// router.put('/:id',[
//     validarJWT,
//     // check('categoria','No es un id de Mongo').isMongoId(),
//     check('id').custom( existeProductoPorId ),
//     validarCampos
// ], actualizarProducto );

// Borrar una producto - Admin
// router.delete('/:id',[
//     validarJWT,
//     esAdminRole, // rol de admin
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existeProductoPorId ),
//     validarCampos,
// ], borrarProducto);


module.exports = router;