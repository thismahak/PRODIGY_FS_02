const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });
    

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
