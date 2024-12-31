const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

const authMiddleware = require('../Middlewares/authMiddleware');

// Protect all employee routes
router.use(authMiddleware);

// Routes
router.get('/', getEmployees);
router.get('/:id',
    param('id').isMongoId().withMessage('Invalid employee ID'), 
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }, 
    getEmployeeById
);
router.post('/create', 
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('position').notEmpty().withMessage('Position is required'),
    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createEmployee
);
router.put('/update/:id',
    param('id').isMongoId().withMessage('Invalid employee ID'),
  body('name').optional().notEmpty().withMessage('Name must not be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('position').optional().notEmpty().withMessage('Position must not be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
updateEmployee
);
router.delete('/delete/:id',
    param('id').isMongoId().withMessage('Invalid employee ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
   deleteEmployee
);

module.exports = router;
