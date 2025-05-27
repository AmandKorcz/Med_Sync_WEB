// tests/medicoController.test.js
const request = require('supertest');
const express = require('express');
const medicoRoutes = require('../routes/medico');
const connection = require('../database');

// Mock do middleware de autenticação
jest.mock('../middlewares/auth', () => (req, res, next) => next());

const app = express();
app.use(express.json());
app.use('/medico', medicoRoutes);

// Mock do banco de dados
jest.mock('../database');

describe('Testes das rotas de médico', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /medico - deve listar todos os médicos', async () => {
    const fakeData = [
      { id_medico: 1, nome: 'João', crm: '12345', especializacao: 'Cardiologia' },
    ];

    connection.query.mockImplementation((sql, callback) => {
      callback(null, fakeData);
    });

    const response = await request(app).get('/medico');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(fakeData);
  });

  test('POST /medico - deve criar um novo médico com sucesso', async () => {
    const novoMedico = { nome: 'Maria', crm: '67890', especializacao: 'Pediatria' };

    connection.query.mockImplementation((sql, values, callback) => {
      callback(null, { insertId: 2 });
    });

    const response = await request(app)
      .post('/medico')
      .send(novoMedico);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: 'Médico criado com sucesso',
      id: 2,
    });
  });

  test('PUT /medico/:id - deve atualizar um médico existente', async () => {
    const dadosAtualizados = {
      nome: 'João Silva',
      crm: '54321',
      especializacao: 'Dermatologia',
    };

    connection.query.mockImplementation((sql, values, callback) => {
      callback(null, { affectedRows: 1 });
    });

    const response = await request(app)
      .put('/medico/1')
      .send(dadosAtualizados);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Médico atualizado com sucesso!' });
  });

  test('DELETE /medico/:id - deve excluir um médico existente', async () => {
    connection.query.mockImplementation((sql, values, callback) => {
      callback(null, { affectedRows: 1 });
    });

    const response = await request(app).delete('/medico/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Cadastro do médico excluído com sucesso' });
  });
});
