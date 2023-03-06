const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const saudacao = require('./saudacaoMid');
const usuarioApi = require('./APi/usuario');
const produtoApi = require('./APi/produtos');
produtoApi(app,'com param!');

app.post('/usuario', usuarioApi.salvar)
app.get('/usuario', usuarioApi.obter)

// bodyParser
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(saudacao('Lucas'));

// saudação 
app.use(saudacao('Lucas'))

app.use('/opa', (req, res, next) => {
    console.log('antes')
    next()
})

// relatorio

app.get('/Clientes/relatorio', (req, res) =>{
    res.send(`Cliente relatório: completo ${req.query.completo} ano = ${req.query.ano}`)
})

// metodo post
/*
app.post('/corpo' ,(req, res) => {
    let corpo = ' ';
    req.on('data', function(parte) {
        corpo += parte
    })
     req.on('end' , function(){
        res.send(corpo);
    }) 

   usando parse json
    req.on('end' , function(){
        res.json(JSON.parse(corpo));
    }) 
})
*/
// usando bodyPArser

app.post('/corpo' ,(req, res) => {
res.send(req.body) // JSON.stringify(req.body) ele da todo json e caso use (req.body.nome) ele passa propriedade
})

app.post('')
// cliente 
app.get('/clientes/:id', (req,res) =>{
    res.send(`Cliente ${req.params.id} selecionado !`)
})


// aplicando use |all |get | post | json
app.get('/opa',(req, res, next) => { //use|all -usa todo metodos http,caso opte por get ou post ele muda metodo
console.log("durante")
res.json({
    data:
  [  {id:7,name:'Ana',posistion: 1},
    {id:34,name:'Bia',posistion: 2},
    {id:73,name:'Carlos',posistion: 3}
],
count: 30,
skip: 0,
limit: 3,
status:200
})

next()
/*  aplicando 1 json
   res.json({
    nome:"iPad 32Gb",
    price: 1899.00,
    discount: 0.12
  }) */
   
  /* aplicando send
  res.send("<b>Estou bem !</b> </h1><br><br><br> <h2>Tipo e HTML!<h2>")
    */
})


app.use('/opa', (req, res, next) => {
    console.log('depois')
  
})
app.listen(3000, () => {
    console.log('Backend executando !!')
})