import express from 'express';
import database from '../database.js';

const router = express.Router();

//POST para criar um novo médico 
router.post('/', async (req, res) => {
    const {crm, nome, especializacao, notas} = req.body;

    //verifica se o médico já existe pelo número do crm
    try{
        const [existing] = await database.execute(
            'SELECT * FROM medico WHERE crm = ?',
            [crm]
        );
        if(existing.lenght > 0){
            return res.status(400).json({message: 'Médico com esse CRM já está cadastrado'})
        }

        //Inserindo o novo médico 
        const [result] = await database.execute(
            'INSERT INTO medico (crm, nome, especializacao) VALUES (?, ?, ?)',
            [crm, nome, especializacao]
        );

        res.status(201).json({
            message: 'Novo médico cadastrado com sucesso',
            id_medico: result.insertId
        });
    } catch (err) {
        console.error('Erro ao cadastrar novo médico', err);
        res.status(500).json({message: 'Erro ao cadastrar novo médico'});
    }

});

//READ para consultar cadastro de médicos 
router.get('/', async (req, res) =>{
    try {
        const [medico] = await database.execute('SELECT * FROM medico');
        res.json(medico);
    } catch (err) {
        console.error ('Erro ao consultar médicos', err);
        res.status(500).json({message: 'Erro ao consultar médicos'});
    }
});

//UPDATE para atualizar um cadastro de médico 
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {crm, nome, especializacao} = req.body;

    try{
        await database.execute(
            'UPDATE medico SET crm = ?, nome = ?, especializacao = ? WHERE id = ?',
            [crm, nome, especializacao, id]
        );

        res.json({message: 'Cadastro de médico atualizado com sucesso'});
    } catch (err) {
        console.error('Erro ao atualizar o médico', err);
        res.status(500).json({message: 'Erro ao atualizar o cadastro do médico'});
    }
});

//DELETE de cadastro de médico 
router.delete('/:id', async (req, res) =>{
    const {id} = req.params;

    try{
        await database.execute('DELETE FROM medico WHERE id = ?', [id]);
        res.json({message: 'Médico removido com sucesso'});
    } catch (err) {
        console.error('Erro ao remover o médico', err);
        res.status(500).json({message: 'Erro ao remover o médico'});
    }
});

export default router;