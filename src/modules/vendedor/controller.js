// --------------------
// External Dependencies
// --------------------
import Joi from "joi";

// --------------------
// Utility Modules
// --------------------
import responds from "../../red/responds.js";

// --------------------
// Database Models
// --------------------
import Model from "../../models/VendedorModel.js";

// Schema
import schema from '../../validations/vendedorValidation.js'

const getVendedores = async (req, res) => {

    return responds.success(req, res, {message: 'All Vendedores'}, 200)
}

const getOneVendedor = async (req, res) => {
    return responds.success(req, res, {message: 'One Vendedor'}, 200)
}

const createVendedor = async (req, res) => {
    
    try {
        
        // Getting and validating data
        const result = await schema.validateAsync(req.body)

        // Checking if vendedor already exists with the same cedula
        if (await Model.findOneRecord({cedula: result.cedula})) {
            return responds.error(req, res, { message: 'Cedula ya en uso' }, 409);
        }

        // Checking if vendedor already exists with the same email
        if (await Model.findOneRecord({email: result.email})) {
            return responds.error(req, res, { message: 'Email ya en uso' }, 409);
        }

        // Constructing a new vendedor object
        const newVendedor = {
            nombre: result.nombre,
            apellido: result.apellido,
            direccion: result.direccion,
            cedula: result.cedula,
            telefono: result.telefono,
            email: result.email,
        }
        
        // Inserting the new vendedor record into the database
        const answer = await Model.createRecord(newVendedor);

        // console.log(answer.insertId)

        // Respond with a success message upon successful creation
        return responds.success(req, res, { message: 'Vendedor creado exitosamente' }, 201);

    } catch (error) {

        if (error instanceof Joi.ValidationError) {
            return responds.error(req, res, {message: error.message}, 422)
        }

        // Respond with a generic error message for other errors
        return responds.error(req, res, { message: error.message }, 500);
    }

}

const updateVendedor = async (req, res) => {
    return responds.success(req, res, {message: 'Updating a vendedor'}, 200)
}

const deleteVendedor = async (req, res) => {
    return responds.success(req, res, {message: 'Deleting a vendedor'}, 200)
}

export default {getOneVendedor, getVendedores, createVendedor, updateVendedor, deleteVendedor};