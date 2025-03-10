const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();

bands.addBand( new Band('Queen') );
bands.addBand( new Band('Bon Jovi') );  
bands.addBand( new Band('Heroes del Silencio') );
bands.addBand( new Band('Metallica') );

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    console.log('Bands', bands.getBands());

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });

    client.on('mensaje', ( payload )=> {
        console.log('mensaje',  payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => { 
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => { 
        console.log(payload);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    //Escuchar : add-band

    //client.on('nuevo-mensaje', (payload) => {
        //console.log(payload); 
      //  client.broadcast.emit('nuevo-mensaje', payload);
        //console.log('mensaje que se va enviar', payload);
    //});
    
});