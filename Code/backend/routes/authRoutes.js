import express from 'express';
import {login, callback, logout, failure, getProfile, setRole, addToPageBalance} from '../controllers/authController.js';

const router = express.Router();

router.get('/google', login);

router.get('/google/callback', callback);

router.get('/profile', getProfile);

router.post('/page', addToPageBalance);

router.get('/role', setRole);

router.get('/logout', logout);

router.get('/failure', failure);

export default router;
