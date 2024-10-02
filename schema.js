const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow("",null),
        location:Joi.string().required(),
        country:Joi.string().required(),
    category: Joi.string().valid('trending', 'rooms', 'iconic cities', 'mountains', 'castles', 'pools', 'camping', 'farm', 'arctic').required(), // Ensure this line is added
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review:Joi.object({

        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
})