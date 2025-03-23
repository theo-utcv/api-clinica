const authenticate = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization && authorization === 'Bearer ' + process.env.B_TOKEN) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  
  module.exports = { authenticate };