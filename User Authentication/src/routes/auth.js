import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().notEmpty()
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Protected route example
router.get('/profile', auth, (req, res) => {
  res.json({ message: 'Protected route accessed successfully', userId: req.userId });
});

export default router;