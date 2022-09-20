import Sequelize from 'sequelize';
import db from '../config/db.js';

export const Testimonial = db.define(
  'testimoniales',
  {
    nombre: {
      type: Sequelize.STRING
    },
    correo: {
      type: Sequelize.STRING
    },
    mensaje: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
