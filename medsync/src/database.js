const mysql = require('mysql2')

//Configurações de conexão
const connection = mysql.createConnection({
    host:  'localhost',
    user: 'root',
    password: 'amanda',
    database: 'medsync'
})

connection.connect((err) => {
    if (err){
        console.error('Erro ao conectar o bacno de dados, ', err.stack)
        return
    }
    console.log('Conectado com sucesso!')
})

module.exports = connection
