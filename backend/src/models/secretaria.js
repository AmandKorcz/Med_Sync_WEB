import { DataTypes } from 'sequelize';
import sequelize from '../database.js'; 

const Secretaria = sequelize.define('Secretaria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha_hash: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'secretaria', // Nome da tabela no banco
  timestamps: true // Adiciona createdAt e updatedAt
});

export default Secretaria;