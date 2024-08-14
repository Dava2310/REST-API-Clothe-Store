import responds from "../../red/responds.js";
import Model from "../../models/VendedorModel.js";

const getVendedores = async (req, res) => {
    return responds.success(req, res, {message: 'All Vendedores'}, 200)
}

const getOneVendedor = async (req, res) => {
    return responds.success(req, res, {message: 'One Vendedor'}, 200)
}

const createVendedor = async (req, res) => {
    return responds.success(req, res, {message: 'Creating a vendedor'}, 200)
}

const updateVendedor = async (req, res) => {
    return responds.success(req, res, {message: 'Updating a vendedor'}, 200)
}

const deleteVendedor = async (req, res) => {
    return responds.success(req, res, {message: 'Deleting a vendedor'}, 200)
}

export default {getOneVendedor, getVendedores, createVendedor, updateVendedor, deleteVendedor};