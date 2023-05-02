module.exports.paginate = async (req, res, next) => {
  try {
    const {
      query: { limit, offset },
    } = req;
    req.pagination = {
      limit: limit <= 0 || limit > 10 ? 10 : limit,
      offset: offset < 0 ? 0 : offset,
    };
    next();
  } catch (error) {
    next(error);
  }
};
