const { ValidationError,UniqueConstraintError } = require("sequelize");
module.exports.handleError = (err, req, res, next) => {
  console.log("ERROR ====>", err);

  if(err instanceof UniqueConstraintError){
    err.status = 400;
    err.message = err.errors[0].message
  }

  if(err instanceof ValidationError){
    err.status = 400;
  }
  const status = err.status || 500;
  res.status(status).send({
    error: [{ message: err.message  || 'Server Error'}],
  });
};
