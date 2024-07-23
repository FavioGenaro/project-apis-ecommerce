const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const cloudinary = require('cloudinary').v2 // importamos el paquete
cloudinary.config(process.env.CLOUDINARY_URL); // configuramos cloudinary, para que sepa que usuario lo usa, nos autenticamos


const cargarArchivo = async(req, res = response) => {

    // console.log(req.files.archivo)
    // verificamos si viene el files
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg:'No hay archivo que subir.'});
        return;
    }
    // console.log(req.files);

    const { archivo } = req.files; // destructuramos el archivo

    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[ nombreCortado.length -1 ]

    // Validar la extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'] // lista de extensiones permitidas
    if ( !extensionesValidas.includes( extension ) ){ // si no esta dentro de la lista, retorna un error
        return res.status(400).json ({
            msg: `La extensión ${extension} no es permitida, ${extensionesValidas}`
        })
    }

    // establecemos el nombre del archivo como un id, para que los nombres no se crucen
    const nombreTemp = uuidv4() + '.' + extension
    archivo.name = nombreTemp
    // path donde se va a colocar el archivo, en la carpeta upload de este proyecto
    // el nombre del archivo es archivo.name
    // uploadPath = path.join( __dirname, '../uploads/', nombreTemp);

    const { tempFilePath } = archivo // del objeto destrucnturamos la ruta temporal, para enviarlo a cloudinary
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath ); // subimos la imagen a cloudinary (A)
    let link = secure_url; // secure_url es el enlace que retorna al subir la imagen (podemos no destructurar y ver toda la info que retorna cloudinary B)


    // ejecutamos la función de mover a la ruta
    // archivo.mv(uploadPath, (err) => {
    //     if (err) {
    //         console.log(err)
    //         return res.status(500).send(err); // si hay un error al mover retorna un error
    //     }
    //     res.json({msg:'File uploaded to ' +  uploadPath}) // si se sube bien
    // });

    res.json({
        msg: 'Cargar archivo',
        img:link
    })

}

// const multer = require('multer')
// const sharp = require('sharp')

// const cargarArchivo2 = async(req, res = response) => {


// }


module.exports = {
    cargarArchivo,
    cargarArchivo2
}