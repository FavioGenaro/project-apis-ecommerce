const { Shopping } = require('../models');


const existeCompraClientePorId = async( id ) => {

    // Verificar si el correo existe
    const existeCompras = await Shopping.find({clienteID:id});
    
    if ( !existeCompras ) {
        throw new Error(`El id ${ id } no existe`);
    }
}

const existeCompraPorId = async( id ) => {

    // Verificar si el correo existe
    const existeCompra = await Shopping.findById(id);
    
    if ( !existeCompra ) {
        throw new Error(`El id ${ id } no existe`);
    }
}


module.exports = {
    existeCompraPorId,
    existeCompraClientePorId
}