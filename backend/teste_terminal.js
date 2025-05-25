const inquirer = require('inquirer').default;
const { listarMedico } = require('./controllers/medicoController.js');
const connection = require('./database.js');
const axios = require('axios');

let token = null;

function loginUsuario(){
    inquirer.prompt([
        {type: 'input', name: 'email', message: 'Digite o email: '},
        {type: 'password', name: 'senha', message: 'Digite a senha: '}
    ]).then(async answers => {
        try {
            const response = await axios.post('http://localhost:3000/login', {
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
            console.error("Detalhes completos do erro: ", error);
        } finally {
            mostrarMenu();
        }
    })
}

async function listarMedicoAPI(){
    if (!token) {
        console.log("Erro:  é necessário estar logado para realizar essa operação");
        return mostrarMenu();
    }

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
    inquirer.prompt([
        {type: 'input', name: 'nome', message: 'Nome: '},
        {type: 'input', name: 'crm', message: 'CRM: '},
        {type: 'input', name: 'especializacao', message: 'Especialização: '} 
    ]).then(async answers => {
        try {
            const response = await axios.post('http://localhost:3000/medico', {
                nome: answers.nome,
                crm: answers.crm,
                especializacao: answers.especializacao
            });
            console.log("Médico foi criado com sucesso, ID: ", response.data.id)
        } catch (error) {
            console.log("Erro ao criar médico: ", error.response?.data?.message || error.message);
            console.error("Detalhes do erro:", error.response?.data);
            console.error("Detalhes completos do erro:", error); 
        } finally {
            mostrarMenu();
        }
    });
}

function atualizarMedico() {
    if (!token) {
        console.log("Erro: é necessário estar logado para realizar essa operação");
        return mostrarMenu();
    }

    inquirer.prompt([
        {type: 'input', name: 'id', message: 'Digite o ID: '},
        {type: 'input', name: 'nome', message: 'Nome: '},
        {type: 'input', name: 'CRM', message: 'CRM: '},
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
            console.log("Erro ao autalizar o médico: ", error.require?.data?.message || error.message);
        } finally {
            mostrarMenu();
        }
    });
}

function deletarMedico() {
    if (!token) {
        console.log("Erro: é necessário estar logado para realizar essa operação");
        return mostrarMenu();
    }

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

function mostrarMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'opcao',
            message: 'Escolha uma das opções a seguir:',
            choices: ['Login', 'Criar Usuário', 'Listar médicos', 'Criar médico', 'Atualizar médico', 'Deletar médico', 'Sair']
        }
    ]).then(answers => {
        switch (answers.opcao) {
            case 'Login':
                loginUsuario();
                break;
            case 'Criar Usuário':
                criarUsuario();
                break;
            case 'Listar médicos':
                listarMedicoAPI();
                break;
            case 'Criar médico':
                criarMedico();
                break;
            case 'Atualizar médico':
                atualizarMedico();
                break;
            case 'Deletar médico':
                deletarMedico();
                break;
            case 'Sair':
                connection.end();
                console.log("Encerrando aplicação...");
                process.exit();
        }
    });
}

mostrarMenu();