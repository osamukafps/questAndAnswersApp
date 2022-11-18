const { response } = require('express');
const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
const connection = require('../db/conn');

const Resposta = connection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({ force: false})
        .then(() => { console.log("Tabela Respostas criada com sucesso!")})
        .catch((err) => { console.log(err) });

module.exports = Resposta;