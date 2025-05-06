import express from 'express';
import database from '../database.js';

const router = express.Router();

// CREATE - Criando uma nova consulta
router.post('/', async (req, res) => {
    const { medico_id, paciente, data, horario, status } = req.body;

    try {
        // Verificando se o medico existe 
        const [medico] = await database.execute(
            'SELECT id FROM medico WHERE id = ?',
            [medico_id]
        );

        if (medico.length === 0) {
            return res.status(400).json({ mensagem: 'Médico não encontrado' });
        }

        // Inserindo a nova consulta no banco de dados 
        const [result] = await database.execute(
            'INSERT INTO consulta (medico_id, paciente, data, horario, status) VALUES (?, ?, ?, ?, ?)',
            [medico_id, paciente, data, horario, status || 'agendada']
        );

        // Retornando a consulta criada
        const [newConsulta] = await database.execute(
            'SELECT * FROM consulta WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json(newConsulta[0]);
    } catch (err) {
        console.error('Erro ao criar consulta:', err);
        res.status(500).json({ mensagem: 'Erro ao criar consulta' });
    }
});

// READ para listar todas as consultas
router.get('/', async (req, res) => {
    try {
        const [consultas] = await database.execute(`
            SELECT c.*, m.nome as medico_nome 
            FROM consulta c
            JOIN medico m ON c.medico_id = m.id
        `);
        res.json(consultas);
    } catch (err) {
        console.error('Erro ao buscar consultas:', err);
        res.status(500).json({ mensagem: 'Erro ao buscar consultas' });
    }
});

// UPDATE atualizando o cadastro de uma consulta 
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { medico_id, paciente, data, horario, status } = req.body;

    try {
        // Verificando se a consulta existe
        const [consulta] = await database.execute(
            'SELECT id FROM consulta WHERE id = ?',
            [id]
        );

        if (consulta.length === 0) {
            return res.status(404).json({ mensagem: 'Consulta não encontrada' });
        }

        // Verificando se o id do medico existe
        if (medico_id) {
            const [medico] = await database.execute(
                'SELECT id FROM medico WHERE id = ?',
                [medico_id]
            );
            if (medico.length === 0) {
                return res.status(400).json({ mensagem: 'Médico não encontrado' });
            }
        }

        // Atualiza a consulta
        await database.execute(
            'UPDATE consulta SET medico_id = ?, paciente = ?, data = ?, horario = ?, status = ? WHERE id = ?',
            [
                medico_id || consulta[0].medico_id,
                paciente || consulta[0].paciente,
                data || consulta[0].data,
                horario || consulta[0].horario,
                status || consulta[0].status,
                id
            ]
        );

        // Retornando a consulta atualizada
        const [updatedConsulta] = await database.execute(
            'SELECT * FROM consulta WHERE id = ?',
            [id]
        );

        res.json(updatedConsulta[0]);
    } catch (err) {
        console.error('Erro ao atualizar consulta:', err);
        res.status(500).json({ mensagem: 'Erro ao atualizar consulta' });
    }
});

// DELETE - deletando um cadastro de consulta 
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Verificando se a consulta existe no banco de dados 
        const [consulta] = await database.execute(
            'SELECT id FROM consulta WHERE id = ?',
            [id]
        );

        if (consulta.length === 0) {
            return res.status(404).json({ mensagem: 'Consulta não encontrada' });
        }

        // Remove a consulta
        await database.execute(
            'DELETE FROM consulta WHERE id = ?',
            [id]
        );

        res.json({ mensagem: 'Consulta removida com sucesso' });
    } catch (err) {
        console.error('Erro ao remover consulta:', err);
        res.status(500).json({ mensagem: 'Erro ao remover consulta' });
    }
});

export default router;