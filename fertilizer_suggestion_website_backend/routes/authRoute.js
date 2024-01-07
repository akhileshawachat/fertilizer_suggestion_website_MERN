
import express  from 'express';
import { createUser,login } from '../controller/authController.js';
const router =  express.Router();


router.post('/create-user',createUser);
router.post('/login',login);

export default router;