const Joi= require("joi")


const newUserSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    age: Joi.number().min(0).max(120).required()
});

const loginSchema = Joi.object({
    email:Joi.string().email().required(),
    password: Joi.string().required()
})

module.exports = {newUserSchema, loginSchema}