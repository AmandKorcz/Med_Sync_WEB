const request = require('supertest');
const express = require('express');
const consultaRoutes = require('../routes/consulta'); 

// Mock do banco de dados
jest.mock('../database', () => ({
  query: jest.fn()
}));

const connection = require('../database');

const app = express();
app.use(express.json());
app.use('/consultas', consultaRoutes);

// Mock do middleware de autenticação (bypassa o token)
jest.mock('../middlewares/auth', () => (req, res, next) => next());

describe('Testes do consultaController', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /consultas/medico/:id_medico - deve retornar lista de consultas', async () => {
    connection.query.mockImplementation((sql, values, callback) => {
      callback(null, [{ id_consulta: 1, nome_paciente: 'João' }]);
    });

    const res = await request(app).get('/consultas/medico/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([
      expect.objectContaining({ nome_paciente: 'João' })
    ]));
  });

  test('POST /consultas - deve criar uma nova consulta', async () => {
    connection.query.mockImplementation((sql, values, callback) => {
      callback(null, { insertId: 123 });
    });

    const res = await request(app)
      .post('/consultas')
      .send({
        id_medico: 1,
        nome_paciente: "Maria",
        data_consulta: "2025-06-01",
        hora_consulta: "10:00",
        observacoes: "Nenhuma"
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id', 123);
  });

  test('PUT /consultas/:id_consulta - deve atualizar uma consulta', async () => {
    connection.query.mockImplementation((sql, values, callback) => {
      callback(null, { affectedRows: 1 });
    });

    const res = await request(app)
      .put('/consultas/1')
      .send({
        nome_paciente: "Joana",
        data_consulta: "2025-06-02",
        hora_consulta: "14:00",
        observacoes: "Atualizado"
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Consulta atualizada com sucesso!');
  });

  test('DELETE /consultas/:id_consulta - deve deletar uma consulta', async () => {
    connection.query.mockImplementation((sql, values, callback) => {
      callback(null, { affectedRows: 1 });
    });

    const res = await request(app).delete('/consultas/1');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Consulta excluída com sucesso');
  });
});
