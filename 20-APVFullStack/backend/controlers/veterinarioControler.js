import Veterinario from '../models/Veterinario.js';

const registrar = async (req, res) => {
  const { email } = req.body;

  // Prevenir usarios duplicados
  const existeUsuario = await Veterinario.findOne({ email });

  if (existeUsuario) {
    const error = new Error('Usuario ya registrado');
    return res.status(400).json({ msg: error.message });
  }

  try {
    // Guardar nuevo veterinario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();
    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  res.json({
    msg: 'Desde perfil'
  });
};

const confirmar = (req, res) => {
  console.log(req.params.token);
  res.json({ msg: 'Confirmando cuenta...' });
};

export { registrar, perfil, confirmar };
