const Joi = require('joi');

const validationSchema = Joi.object({

  name: Joi.string().required().error(new Error('Please provide a valid task name')),

  desc: Joi.string().required().error(new Error('Please provide a valid task description')),

  dueDate: Joi.date().iso().error(new Error('Please provide a valid due date in ISO 8601 format (YYYY-MM-DD)')),

  isCompleted: Joi.boolean().error(new Error('Please provide a valid isCompleted value (true or false)')),

  tags: Joi.alternatives().try(
    Joi.string(), // Allow tags as a string
    Joi.array().items(Joi.string()) // Allow tags as an array of strings
  ),

});

module.exports = function validateTask(task) {
  return validationSchema.validate(task, { abortEarly: false });
};
