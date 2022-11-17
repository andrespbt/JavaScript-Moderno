import express from 'express';
import { registrar, perfil, confirmar, autenticar } from '../controlers/veterinarioControler.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registrar);

router.get('/confirmar/:token', confirmar);

router.post('/login', autenticar);

router.get('/perfil', checkAuth, perfil);

export default router;
