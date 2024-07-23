const { response } = require('express');
const {Producto}= require('../models');
const axios = require('axios');
const { v4: uuid4 } = require('uuid')
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL ); 

const obtenerProductos = async(req, res = response ) => {

    const productos = await Producto.find({});

    
    if ( !productos ) {
        return res.status(400).json({ // estatus 400, porque es un error de correo o contraseña, no es error del servidor
            msg: 'No hay productos' // error en el correo
        });
    }

    res.json({
        // total,
        productos
    });
}


const obtenerProducto = async(req, res = response) =>{
    const { id } = req.params;
    const producto = await Producto.findById( id );
    // console.log(producto)
    res.json( producto );
}

const crearProducto = async(req, res = response ) => {

    const { name,description,stock,price} = req.body;

    const productoDB = await Producto.findOne({ name: name }); // buscamos al producto si existe en la base de datos

    if ( productoDB ) { // si ya existe, entonces mandamos un error
        return res.status(400).json({
            msg: `El producto '${ productoDB.name }', ya existe`
        });
    }
    console.log("Producto no existe");
    // verificamos si viene el files
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg:'No hay archivo que subir.'});
        return;
    }
    console.log("Hay un archivo");
    const { archivo } = req.files; // destructuramos el archivo

    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[ nombreCortado.length -1 ]

    // Validar la extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'] // lista de extensiones permitidas
    if ( !extensionesValidas.includes( extension ) ){ // si no esta dentro de la lista, retorna un error
        return res.status(400).json ({
            msg: `La extensión '${extension}' no es permitida. Las extensiones válidas son ${extensionesValidas}`
        })
    }
    console.log("La extensión esta permitida");

    // guardamos la imagen en cloudinary
    const { secure_url } = await cloudinary.uploader.upload(  archivo.tempFilePath );
    console.log("Se guardo en Cloudinary");
    // preparamos los datos
    const data = {
        name,
        description,
        stock,
        price,
        img: secure_url
    }
    const producto = new Producto(data); // creamos un producto

    // Guardar en la DB
    await producto.save();
    console.log("Se guardo en base de datos");
    res.status(201).json(producto);
}

module.exports = {
    obtenerProductos,
    crearProducto,
    obtenerProducto
}