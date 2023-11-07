const Joi = require('joi');

const validationSchema = Joi.object({

  name: Joi.string().required().error(new Error('Please provide a valid task name')),

  desc: Joi.string().required().error(new Error('Please provide a valid task description')),

  dueDate: Joi.date().iso().error(new Error('Please provide a valid due date in ISO 8601 format (YYYY-MM-DD)')),

  isCompleted: Joi.boolean().error(new Error('Please provide a valid isCompleted value (true or false)')),

  tags: Joi.string().custom((value, helpers) => {
    const tagsArray = value.split(',').map(tag => tag.trim());
    if (tagsArray.length === 0 || tagsArray.some(tag => !/^\w+$/.test(tag))) {
      return helpers.error('Invalid tags format. Tags should separated by commas.');
    }
    return value;
  }).error(new Error('Invalid tags format (tags should be separated by commas)')),

});

module.exports = function validateTask(task) {
  return validationSchema.validate(task, { abortEarly: false });
};
