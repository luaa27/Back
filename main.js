/***********************************************************
 * Objetivo: Arquivo para realizar as requisições de filmes*
 * Data: 30/01/24                                          *
 * Autor: Vitoria Azevedo da Cruz                          *
 * Versão: 1.0                                             *
 ***********************************************************/

/*******************************************************************
 * O node por padrão, não faz conexão com o Banco de Dados,        *
 * portanto, precisamos de algumas dependênias para isso.          *
 *                                                                 *
 * Para realizar a conexão com o Banco de Dados precisamos utilizar*
 * algumas dependências:                                           *
 *      -SEQUELIZE ORM                                             *
 *      -PRISMA ORM                                                *
 *      -FASTIFY ORM                                               *
 *                                                                 *
 * PRISMA - Para utilizar o prisma precisamos instalar as seguintes*
 * dependências:                                                   *
 *  -npm install prisma --save                                     *
 *  -npm install @prisma/client --save                             *
 *                                                                 *
 * Após a instalação do PRISMA, devemos rodar o comando abaixo para*
 * inicializar o PRISMA                                            *
 *  -npx prisma init                                               *
 *******************************************************************/


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const filmesFuncoes = require('./controller/getFilmes')

const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())

    next()
})

//Cria um objeto do tipo JSON para receber os dados via Body nas requisições POST ou PUT
const bodyParserJSON = bodyParser.json()
/***************** Imports de arquivos e bibliotecas do Projeto ***************** */
const controllerFilmes = require('./controller/controller_filme.js')

/**********************************************************************************/
app.get('/v1/acme/filmes', cors(), async function (request, response, next) {
    let listaDeFilmes = filmesFuncoes.getFilmes()

    if (listaDeFilmes) {
        response.json(listaDeFilmes)
        response.status(200)
    } else {
        response.json({ erro: "Filme não encontrado" })
        response.status(404)
    }
})

app.get('/v1/acme/filmes/:id', cors(), async function (request, response, next) {
    let idDoFilme = request.params.id
    let filmeEscolhido = filmesFuncoes.getFilmesPeloId(idDoFilme)

    if (filmeEscolhido) {
        response.json(filmeEscolhido)
        response.status(200)
    } else {
        response.json({ erro: "Filme não encontrado" })
        response.status(404)
    }
})

//EndPoint - v2: Retorna os dados de todos os filmes
app.get('/v2/acmefilmes/filmes', cors(), async function (request, response, next) {

    //Chama a função para retornar os dados do filme
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
})

//EndPoint - v2: Retorna os dados do Filme filtrando pelo NOME
app.get('/v2/acmefilmes/filmes/filtro', cors(), async function (request, response, next) {
    let nomeDoFilme = request.query.nomeFilme

    let dadosDosFilmes = await controllerFilmes.getBuscarFilmePeloNome(nomeDoFilme)

    response.status(dadosDosFilmes.status_code)
    response.json(dadosDosFilmes)
})

//EndPoint - v2: Retorna os dados do Filme filtrando pelo ID
app.get('/v2/acmefilmes/filme/:id', cors(), async function (request, response, next) {
    //Recebe o id da requisição do Filme
    let idFilme = request.params.id

    //Solicita para a controller o Filme filtrando pelo ID
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

//EndPoint: Inserir novos filmes no Banco de Dados
    //Não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
    //Obs: esse objeto foi criado no inicio do projeto
app.post('/v2/acmefilmes/filme', cors(), bodyParserJSON, async function(request, response, next){
    //Recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body
    //Encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody)
    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.listen(8080, function () {
    console.log('API funcionando e aguardando requisições')
})