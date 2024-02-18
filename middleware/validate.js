/* global module */

const { isDate, validator } = require('../helpers/validate');

const saveBook = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    author: 'required|string',
    description: 'required|string',
    genre: 'required|string',
    // publication_date: 'required|string',
    publication_date: [
        'required',
        value => isDate(value, { format: 'MM/DD/YYYY' })
      ]
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveBook
};
