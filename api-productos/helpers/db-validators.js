const { Producto } = require('../models');

const existeProductoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    
    if ( !existeProducto ) {
        throw new Error(`El id ${ id } no existe`);
    }
}

module.exports = {
    existeProductoPorId
}