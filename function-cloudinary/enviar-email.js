const nodemailer = require('nodemailer');

//Creamos el objeto de transporte
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ecommerce.test.arq@gmail.com',
        pass: 'brehdfauhpnupwjo'
    }
});
var mensaje = "Hola desde nodejs...";

var mailOptions = {
    from: 'faviogenarosaico@gmail.com',
    to: 'favio.saico@unmsm.edu.pe',
    subject: 'Asunto Del Correo',
    text: mensaje
};


// var message = {
//     from: "ejemplo@microlab.ec",
//     to: "alex_ejemplo@gmail.com",
//     subject: "Ejemplo de asunto de correo",
//     text: "Plaintext version of the message",
//     html: "<p>Link para entrar a la página de microlab: <br> <a href='https://microlab.ec'></a></p>"
// };

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email enviado: ' + info.response);
    }
});
