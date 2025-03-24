const connection = require('./database')

connection.query('SELECT * FROM medico', (err, results) => {
    if (err) {
        console.error('Erro ao realizar a consulta, ', err.stack)
        return
    }
    console.log('Resultados da consulta:', results) //
})

connection.end()
