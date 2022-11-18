const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/conn');
const Pergunta = require('./model/Pergunta');
const Resposta = require('./model/Resposta');
const app = express();

//Setar o EJS como renderizador de HTML da aplicação
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Conexão com a base de dados
connection.authenticate()
          .then(() => { console.log('Database Connected!')})
          .catch((err) => { console.log(err) });

//Setar body-parser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

//Rotas da aplicação
app.get('/', (req, res) => {
    
    Pergunta.findAll({ raw: true , order: [
        ['id', 'DESC']
    ]})
            .then(p => res.render('index', { perguntas: p }))
            .catch((err) => { console.log(err) })
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.get('/pergunta/:id', (req, res) => {

    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id}
    }).then(pergunta => {
        if(pergunta != undefined){
            Resposta.findAll({ where:{ perguntaId: id }, order:[ ['createdAt', 'DESC'] ]})
                .then(respostas => { res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{
            res.redirect('/')
        }
    })
})

app.post('/salvarpergunta', (req, res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => { res.redirect('/')})
      .catch((err) => { console.log(err)} );
    
})

app.post('/responder', (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => { res.redirect(`/pergunta/${perguntaId}`)})
      .catch((err) => { console.log(err) });
});

app.listen(3000, () => {
    console.log('Application online!')
})