const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Token recebido:', token);

    if(!token) {
        console.log("Nenhum token fornecido aos headers: ", req.headers);
        return res.status(401).json({message: "Token não fornecido"});
    }

    jwt.verify(token, 'secreto', (err, usuario) => {
        if (err) {
            console.log("Erro na verificação do token: ", err);
            return res.status(403).json({message: "Token inválido!"});
        }
        req.usuario = usuario;
        next();
    });
}

module.exports = autenticarToken;