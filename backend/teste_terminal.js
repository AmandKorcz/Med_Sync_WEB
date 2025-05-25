const inquirer = require('inquirer').default;
const connection = require('./database.js');
const axios = require('axios');

let token = null;

//LOGIN
function loginUsuario(){
    inquirer.prompt([
        {type: 'input', name: 'email', message: 'Digite o email: '},
        {type: 'password', name: 'senha', message: 'Digite a senha: '}
    ]).then(async answers => {
        try {
            const response = await axios.post('http://localhost:3000/login/login', {
                email: answers.email,
                senha: answers.senha
            });
            token = response.data.token;
            console.log("Login realizado com sucesso");
        } catch (error) {
            console.log("Erro ao fazer login: ", error.response?.data?.message || error.message);
        } finally {
            mostrarMenu();
        }
    });
}

function criarUsuario() {
    inquirer.prompt([
        {type: 'input', name: 'nome', message: 'Nome: '},
        {type: 'input', name: 'email', message: 'Email: '},
        {type: 'input', name: 'senha', message: 'Senha: '}
    ]).then(async answers => {
        try {
            const response = await axios.post('http://localhost:3000/login/register', {
                nome: answers.nome,
                email: answers.email,
                senha: answers.senha
            });
            console.log("Usuário criado com sucesso, ID: ", response.data.id);
        } catch (error) {
            console.error("Erro ao criar usuário: ", error.response?.data?.message || error.message);
            console.error("Detalhes do erro: ", error.response?.data);
            //console.error("Detalhes completos do erro: ", error);
        } finally {
            mostrarMenu();
        }
    })
}

//MÉDICOS
async function listarMedicoAPI(){
    if (!token) return erroLogin();

    try {
        const response = await axios.get('http://localhost:3000/medico', {
            headers: {Authorization: `Bearer ${token}`}
        });
        console.table(response.data);
    } catch (error) {
        console.error("Erro ao listar os usuários: ", error.response?.data?.message || error.message);
    } finally {
        mostrarMenu();
    }
}

function criarMedico() {
    if (!token) return erroLogin();

    inquirer.prompt([
        {type: 'input', name: 'nome', message: 'Nome: '},
        {type: 'input', name: 'crm', message: 'crm: '},
        {type: 'input', name: 'especializacao', message: 'Especialização: '} 
    ]).then(async answers => {
        try {
            const response = await axios.post('http://localhost:3000/medico', {
                nome: answers.nome,
                crm: answers.crm,
                especializacao: answers.especializacao
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Médico foi criado com sucesso, ID: ", response.data.id)
        } catch (error) {
            console.log("Erro ao criar médico: ", error.response?.data?.message || error.message);
            //console.error("Detalhes do erro:", error.response?.data);
            //console.error("Detalhes completos do erro:", error); 
        } finally {
            mostrarMenu();
        }
    });
}

function atualizarMedico() {
    if (!token) return erroLogin();

    inquirer.prompt([
        {type: 'input', name: 'id', message: 'Digite o ID: '},
        {type: 'input', name: 'nome', message: 'Nome: '},
        {type: 'input', name: 'crm', message: 'crm: '},
        {type: 'input', name: 'especializacao', message: 'Especialização: '} 
    ]).then(async answers => {
        try {
            const response = await axios.put(`http://localhost:3000/medico/${answers.id}`, {
                nome: answers.nome,
                crm: answers.crm,
                especializacao: answers.especializacao
            }, {
                headers: {Authorization: `Bearer ${token}` }
            });
            console.log(response.data.message);
        } catch (error) {
            console.log("Erro ao atualizar o médico: ", error.response?.data?.message || error.message);
        } finally {
            mostrarMenu();
        }
    });
}

function deletarMedico() {
    if (!token) return erroLogin();

    inquirer.prompt([
        {type: 'input', name: 'id', message: 'Digite o ID: '},
    ]).then(async answers => {
        try {
            const response = await axios.delete(`http://localhost:3000/medico/${answers.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data.message);
        } catch (error) {
            console.error("Erro ao deletar usuário:", error.response?.data?.message || error.message);
        } finally {
            mostrarMenu();
        }
    });
}

//CONSULTAS
async function listarConsultasPorMedico(){
    if (!token) return erroLogin();

    inquirer.prompt([
        {type: 'input', name: 'id', message: 'ID do médico para ver as consultas marcadas: '}
    ]).then(async ({id}) => {
        try{
            const response = await axios.get(`http://localhost:3000/consulta/medico/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.table(response.data);
        } catch (error) {
            console.error("Erro ao listar consultas: ", error.response?.data?.message || error.message);
        } finally {
            mostrarMenu();
        }
    });
}

function criarConsulta(){
    if (!token) return erroLogin();

    inquirer.prompt([
        { type: 'input', name: 'id_medico', message: 'ID do médico:' },
        { type: 'input', name: 'data', message: 'Data da consulta (YYYY-MM-DD):' },
        { type: 'input', name: 'hora', message: 'Hora da consulta (HH:MM):' },
        { type: 'input', name: 'nome_paciente', message: 'Nome do paciente:' },
        { type: 'input', name: 'observacoes', message: 'Observações: '}
    ]).then(async answers => {
        try{
            const response = await axios.post('http://localhost:3000/consulta', {
                id_medico: answers.id_medico,
                data: answers.data,
                hora: answers.hora,
                nome_paciente: answers.nome_paciente,
                observacoes: answers.observacoes
            },{
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log("Consulta criada com sucesso, ID: ", response.data.id);
        } catch (error) {
            console.error("Erro ao criar consulta: ", error.response?.data?.message || error.message);
        } finally {
            mostrarMenu();
        }
    });
}

function atualizarConsulta() {
    if (!token) return erroLogin();

    inquirer.prompt([
        {type: 'input', name: 'id', message: 'ID da consulta: '},
        {type: 'input', name: 'id_medico', message: 'ID do médico: '},
        {type: 'input', name: 'data', message: 'Data (YYYY-MM-DD): '},
        {type: 'input', name: 'hora', message: 'Hora (HH:MM): '},
        {type: 'input', name: 'nome_paciente', message: 'Nome do paciente: '},
        {type: 'inpt', name: 'observacoes', message: 'Observações: '}
    ]).then(async answers => {
        try{
            const response = await axios.put(`http://localhost:3000/consulta/${answers.id}`, {
                id_medico: answers.id_medico,
                data: answers.data,
                hora: answers.hora,
                nome_paciente: answers.nome_paciente,
                observacoes: answers.observacoes
            }, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log(response.data.message || "Consulta atualizada com sucesso");
        } catch (error) {
            console.error("Erro ao atualizar a consulta: ", error.response?.data?.message || error.message);
        } finally {
            mostrarMenu();
        }
    });
}

function deletarConsulta(){
    if (!token) return erroLogin();

    inquirer.prompt([
        {type: 'input', name: 'id', message: 'ID da consulta: '}
    ]).then(async answers => {
        try{
            await axios.delete(`http://localhost:3000/consulta/${answers.id}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log("Consulta deletada com sucesso");
        } catch (error) {
            console.error("Erro ao deletar consulta: ", error.response?.data?.message || error.message);
        } finally {
            mostrarMenu();
        }
    });
}

//MENU

function erroLogin(){
    console.log("É necessário estar logado para realizar essa operação.");
    return mostrarMenu();
}

function mostrarMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'opcao',
            message: 'Escolha uma das opções a seguir:',
            choices: [
                'Login', 'Criar Usuário',
                '-------------', 
                'Listar médicos', 'Criar médico', 'Atualizar médico', 'Deletar médico', 
                '-------------',
                'Listar consultas por médico', 'Criar consulta', 'Atualizar consulta', 'Deletar consulta',
                '-------------',
                'Sair',
                '-------------',
            ]
        }
    ]).then(answers => {
        switch (answers.opcao) {
            case 'Login': loginUsuario(); break;
            case 'Criar Usuário': criarUsuario(); break;
            case 'Listar médicos': listarMedicoAPI(); break;
            case 'Criar médico': criarMedico(); break;
            case 'Atualizar médico': atualizarMedico(); break;
            case 'Deletar médico': deletarMedico(); break;
            case 'Listar consultas por médico': listarConsultasPorMedico(); break;
            case 'Criar consulta': criarConsulta(); break;
            case 'Atualizar consulta': atualizarConsulta(); break;
            case 'Deletar consulta': deletarConsulta(); break;
            case 'Sair':
                connection.end();
                console.log("Encerrando aplicação...");
                process.exit();
        }
    });
}

mostrarMenu();