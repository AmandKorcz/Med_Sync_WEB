import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Medico = sequelize.define('Medico', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  crm: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  uf: {
    type: DataTypes.STRING(2),
    allowNull: false
  },
  especializacao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  foto_perfil: {
    type: DataTypes.STRING 
  },
  notas: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'medicos',
  timestamps: true
});

export default Medico;