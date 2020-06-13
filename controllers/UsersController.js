const users = require("../database/Users.json");
const fs = require("fs");
const path = require('path');

const UsersController = {
    list: (req, res) => {
        res.render('crud-usuarios/list',{users});
    },
    create: (req,res) =>{
        let err;
        switch(Number(req.query.error)) {
            case 1:
                err = "*O email já foi cadastrado.";
                break;
            case 2:
                err = "*As senhas não coincidiram.";
                break;
        }
        res.render( 'crud-usuarios/create', { err });
    },
    store: (req, res) =>{
        // armazenando dados do formulário
        let { nome, email, senha, conf } = req.body;
        
        // verificando se o email já foi cadastrado
        if(users.find(usuario => usuario.email == email)) {
            return res.redirect('/users/create?error=1');
        }
        
        // verificando se as senhas coincidem
        if(senha != conf) {
            return res.redirect('/users/create?error=2');
        }
        
        // limpando input nome
        nome = nome.trim();

        // criando id para o usuário
        let id = users[users.length - 1].id + 1;
        
        // setando imagem padrão
        let img = '/img/user-default.png'

        // adicionando usuario no database
        users.push({
            id,
            nome,
            email,
            senha,
            img
        });
        fs.writeFileSync(path.join('database', 'Users.json'), JSON.stringify(users));

        // redirecionando para lista de usuarios
        return res.redirect('/users');
    }
}

module.exports = UsersController;