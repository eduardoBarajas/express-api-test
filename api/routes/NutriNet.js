var express = require('express');
var router = express.Router();
var ClientesService = require('../services/ClientesService');
var ValidateRequest = require('../helpers/ClientsRequestValidator');

router.post('/Cliente', (req, res) => {
    // se revisa que los datos sean validos
    let validRequest = ValidateRequest(req);
    if (validRequest.success) {
        // si los datos son validos se agrega y se regresa la respuesta.
        let newCliente = {
            Nombre: req.body['Nombre'],
            Apellidos: req.body['Apellidos'],
            Nombre_Usuario: req.body['Nombre_Usuario'],
            Correo_Electronico: req.body['Correo_Electronico'],
            Contrasena: req.body['Contrasena'],
            Edad: req.body['Edad'],
            Estatura: req.body['Estatura'],
            Peso: req.body['Peso'],
            GEB: req.body['GEB']
        };
        ClientesService.add(newCliente).then(result => {
            res.status(200).send(JSON.stringify(result));
        }).catch(error => {
            res.status(500).send(JSON.stringify(error));
        });
    } else {
        // si los datos no son validos entonce se regresa el codigo para Bad Request y se envian los errores encontrados
        res.status(400).send(JSON.stringify({status: 'Error', message: 'Algunos campos estan incorrectos', errors: validRequest.errors}));
    }
});

router.get('/Cliente', (req, res) => {
    ClientesService.findAll().then( result => {
        res.status(200).send(JSON.stringify(result));
    }).catch(error => {
        res.status(500).send(JSON.stringify(error));
    });
});

router.delete('/Cliente/:id', (req, res) => {
    ClientesService.delete(req.params.id).then( result => {
        res.status(200).send(JSON.stringify(result));
    }).catch( error => {
        res.status(500).send(JSON.stringify(error));
    });
});

router.put('/Cliente/:id', (req, res) => {
    // se revisa que los datos sean validos
    let validRequest = ValidateRequest(req);
    if (validRequest.success) {
        // si los datos son validos se actualiza y se regresa la respuesta.
        let cliente = {
            Nombre: req.body['Nombre'],
            Apellidos: req.body['Apellidos'],
            Nombre_Usuario: req.body['Nombre_Usuario'],
            Correo_Electronico: req.body['Correo_Electronico'],
            Contrasena: req.body['Contrasena'],
            Edad: +req.body['Edad'],
            Estatura: +req.body['Estatura'],
            Peso: +req.body['Peso'],
            GEB: +req.body['GEB']
        };
        ClientesService.update(req.params.id, cliente).then(result => {
            res.status(200).send(JSON.stringify(result));
        }).catch(error => {
            console.log(error);
            res.status(500).send(JSON.stringify(error));
        });
    } else {
        // si los datos no son validos entonce se regresa el codigo para Bad Request y se envian los errores encontrados
        res.status(400).send(JSON.stringify({status: 'Error', message: 'Algunos campos estan incorrectos', errors: validRequest.errors}));
    }
});

module.exports = router;