const Joi = require('@hapi/joi');

module.exports = {
    registerUserPolicy (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required()
        })

        const {error, value} = schema.validate(req.body)
        if(error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: 'You password should be minimum of 5 characters'
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }
        }
        else {
            next()
        }
        
    }
}