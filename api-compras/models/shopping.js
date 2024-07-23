// extraemos el esquema y el modelo
const {Schema, model} = require('mongoose')


const ShoppingSchema = Schema({ // Shema define cada uno de los campos del usuario
    total:{
        type: Number,
        default: 0,
        required: [true, 'El costo total es obligatorio'] // podemos pasar solo true, pero tmb nos permite pasar un mensaje de error
    },
    fecha: { 
        type: Date,
        required: [true, 'La fecha es obligatoria'] 
    }, 
    clienteID:{
        type: Schema.Types.ObjectId,
        required: [true, 'El id del cliente es obligatoria']
    },
    listProduct:{
        type: Array,
        required: [true, 'Lista de productos obligatorios']
    }
});

// reescribimos el metodo toJSON
ShoppingSchema.methods.toJSON = function () { // debe ser una función normal porque el this mantiene la referencia en la misma función.
    const { __v, estado, ...data  } = this.toObject();
    return data;
}

// exportamos el model; este pide el nombre de la colección, que es Usuario (mongosse añade la s al final del nombre) y pide tmb el shema
module.exports = model('Shopping', ShoppingSchema);