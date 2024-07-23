const { response } = require('express');
const {Shopping}= require('../models');
const axios = require('axios');

const obtenerCompras = async(req, res = response ) => {

    const compras = await Shopping.find({});

    
    if ( !compras ) {
        return res.status(400).json({ // estatus 400, porque es un error de correo o contraseña, no es error del servidor
            msg: 'No hay Compras' // error en el correo
        });
    }

    res.json({
        // total,
        compras
    });
}
const obtenerComprasPorCliente = async(req, res = response ) => {
    const { id } = req.params;
    // console.log(id)
    const compra = await Shopping.find( {clienteID:id})
                            // .populate('usuario', 'nombre') // populate es para buscar otros ids que se encuentran en la consulta
    res.json( compra );
}


const obtenerCompra = async(req, res = response ) => {

    const { id } = req.params;
    // console.log(id)
    const compra = await Shopping.findById( id );

    let lista = [];

    for(let i = 0; i < compra.listProduct.length; i++ ){
        let product = compra.listProduct[i];
        // const api = `http://localhost:3003/api/product/${product._id}`;
        const api = `https://api-productos-lowq2zju5q-tl.a.run.app/api/product/${product._id}`;
        await axios.get(api)
            .then(e => {
                if(e.data){
                    product.img = e.data.img;
                    product.price = e.data.price;
                    product.name = e.data.name;
                }else{
                    product.name = "--";
                    product.img = "https://oducal.com/web/images/sin_imagen.png";
                    product.price = "--";
                }
            })
            .catch(error => {
                console.log("Error:",error);
            });
        lista.push(product);
    }
    compra.listProduct = lista;
    // compra.lista = lista;
    // console.log(producto)
    res.json( compra );

}

const crearCompra = async(req, res = response ) => {

    const nuevaCompra = req.body; // { fecha,total,clienteID,listProduct } 

    // const productoDB = await Shopping.findOne({ name }); // buscamos al producto si existe en la base de datos

    // nuevaCompra.listProduct.forEach(product => {
    //     const productID = ObjectId(product.id);
    //     // product.clienteID = clienteID;
    //     product._id =  productID;
    //     delete product.id;
    // });
    // nuevaCompra.listProduct[0].id = new ObjectId('nuevaCompra.listProduct[0].id');

    const compra = new Shopping( nuevaCompra ); // creamos un producto, empata con el modelo

    // Guardar en la DB
    await compra.save();

    // let compra1 = JSON.parse(JSON.stringify(compra))
    // let correo = []
    // let b = await axios.get(`http://localhost:3005/api/auth/${nuevaCompra.clienteID}`)
    //     .then()
    //     .catch(error => {
    //         console.log(error);
    //     });
    
    // compra1.correo = b.data.correo;


    // Obneter detalles de la compra
    // let lista = [];
    
    // for(let i = 0; i < compra1.listProduct.length; i++ ){
    //     let product = compra1.listProduct[i];
    //     let a = await axios.get(`http://localhost:3003/api/product/${product._id}`)
    //         .then()
    //         .catch(error => {
    //             console.log(error);
    //         });
    //         product.name = a.data.name;
    //     lista.push(product);
    // }
    // compra1.listProduct = lista;


    // Mandar gmail post https://us-central1-cedar-unison-388916.cloudfunctions.net/function-3
    // https://us-central1-cedar-unison-388916.cloudfunctions.net/function-3

    // await axios.post(`https://function-1-7xx2a7ygfa-uc.a.run.app`, 
    //         JSON.stringify(compra1),
    //     )
    //     .then()
    //     .catch(error => {
    //         console.log(error);
    //     });

    res.status(201).json(compra);
}


module.exports = {
    obtenerCompras,
    obtenerComprasPorCliente,
    obtenerCompra,
    crearCompra
}