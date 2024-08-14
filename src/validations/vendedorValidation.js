import Joi from "joi";

const vendedor = Joi.object({

    // Nombre
    nombre: Joi.string()
        .pattern(/^[a-zA-Z\s]+$/)
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.pattern.base': 'El nombre o apellido solo puede contener letras y espacios'
        }),

    // Apellido
    apellido: Joi.string()
        .pattern(/^[a-zA-Z\s]+$/)
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.pattern.base': 'El nombre o apellido solo puede contener letras y espacios'
        }),

    // Dirección
    direccion: Joi.string().min(5).max(255).required(),

    // Teléfono
    telefono: Joi.string()
        .pattern(/^\+\d{1,3}\d{10,12}$/)
        .required()
        .messages({
            "string.pattern.base": "El teléfono debe ser de la siguiente estructura: +584249334420",
        }),

    // Email
    email: Joi.string().email().lowercase().required(),

    // Cédula
    cedula: Joi.string()
        .pattern(/^[VEP]-\d{7,8}$/)
        .required()
        .messages({
            'string.pattern.base': 'La cédula debe comenzar con V, E o P, seguida de 7 u 8 dígitos numéricos',
            'any.required': 'La cédula es obligatoria.'
        })
})

export default vendedor;