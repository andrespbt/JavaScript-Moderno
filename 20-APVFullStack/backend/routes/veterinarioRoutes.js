import express from 'express';
import { registrar, perfil, confirmar, autenticar } from '../controlers/veterinarioControler.js';

const router = express.Router();

router.post('/', registrar);

router.get('/perfil', perfil);

router.get('/confirmar/:token', confirmar);

router.post('/login', autenticar);

export default router;
