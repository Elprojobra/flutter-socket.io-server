const express = require('express');
require('dotenv').config();
const path = require('path');
// app de Express
const app = express();

//node server
const server = require('http').createServer(app);
const io = require('socket.io')(server);
module.exports.io = io;
// Mensajes de sockets  

require('./sockets/socket');


io.on('connection', client => {

    console.log('Cliente conectado');

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });

    client.on('mensaje', ( payload )=> {
        console.log('Mensaje recibido',  payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });
  });

// path publico
const publicPath = path.resolve (__dirname, 'public');


app.use(express.static(publicPath));


server.listen(process.env.PORT, ( err ) => {
    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto !!!!!!!', 3000);
});