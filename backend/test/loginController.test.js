const request = require('supertest');
const express = require('express');
const app = express();
const loginRoutes = require('../routes/login');
const connection = require('../database');

jest.mock('../database');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Middleware para JSON
app.use(express.json());
app.use('/', loginRoutes);

describe('Testes do loginController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /login', () => {
        it('deve realizar login com sucesso', async () => {
            const usuarioMock = {
                id_secretaria: 1,
                email: 'teste@email.com',
                senha: 'senha_hashed'
            };

            connection.query.mockImplementation((query, values, callback) => {
                callback(null, [usuarioMock]);
            });

            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('token_fake');

            const res = await request(app).post('/login').send({
                email: 'teste@email.com',
                senha: 'senha123'
            });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
            expect(res.body.message).toBe("Login realizado com sucesso!");
        });

        it('deve retornar erro se email não for encontrado', async () => {
            connection.query.mockImplementation((query, values, callback) => {
                callback(null, []);
            });

            const res = await request(app).post('/login').send({
                email: 'naoexiste@email.com',
                senha: 'senha123'
            });

            expect(res.status).toBe(401);
            expect(res.body.message).toBe("Usuário não encontrado");
        });

        it('deve retornar erro se senha estiver incorreta', async () => {
            const usuarioMock = {
                id_secretaria: 1,
                email: 'teste@email.com',
                senha: 'senha_hashed'
            };

            connection.query.mockImplementation((query, values, callback) => {
                callback(null, [usuarioMock]);
            });

            bcrypt.compare.mockResolvedValue(false);

            const res = await request(app).post('/login').send({
                email: 'teste@email.com',
                senha: 'senhaErrada'
            });

            expect(res.status).toBe(401);
            expect(res.body.message).toBe("Senha ou usuário incorretos.");
        });
    });

    describe('POST /register', () => {
        it('deve criar novo usuário com sucesso', async () => {
            bcrypt.hash.mockResolvedValue('senha_criptografada');
            connection.query.mockImplementation((query, values, callback) => {
                callback(null, { insertId: 123 });
            });

            const res = await request(app).post('/register').send({
                nome: 'Maria',
                email: 'maria@email.com',
                senha: 'senha123'
            });

            expect(res.status).toBe(201);
            expect(res.body.message).toBe("Usuário criado com sucesso");
            expect(res.body.id).toBe(123);
        });

        it('deve retornar erro se houver falha no banco de dados', async () => {
            bcrypt.hash.mockResolvedValue('senha_criptografada');
            connection.query.mockImplementation((query, values, callback) => {
                callback(new Error("Erro no MySQL"), null);
            });

            const res = await request(app).post('/register').send({
                nome: 'Maria',
                email: 'maria@email.com',
                senha: 'senha123'
            });

            expect(res.status).toBe(500);
            expect(res.body.erro).toBe("Erro no MySQL");
        });
    });
});
