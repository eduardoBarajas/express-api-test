const ClienteModel = require('../models/ClienteModel');
const mongodb = require('mongodb');
class ClientesService {
    async add(cliente) {
        return new ClienteModel(cliente).save();
    }
    async findAll() {
        return ClienteModel.find();
    }
    async update(id, cliente) {
        if (mongodb.ObjectID.isValid(id)) {
            return ClienteModel.findByIdAndUpdate(id, cliente);
        } else {
            return Promise.reject(new Error('Id No Valido'));   
        }
    }
    async delete(id) {
        if (mongodb.ObjectID.isValid(id)) {
            return ClienteModel.findByIdAndDelete(id);
        } else {
            return Promise.reject(new Error('Id No Valido')); 
        }
    }
}

module.exports = Object.create(new ClientesService);