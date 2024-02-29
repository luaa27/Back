/*******************************************************************
 * Objetivo: Arquivo responsável pela interação entre o APP e a    * 
 * model, que teremos todas as tratativas e regra de noegócio para *
 * o CRUD de filmes                                                *
 * Data: 30/01/24                                                  *
 * Autor: Vitoria Azevedo da Cruz                                  *
 * Versão: 1.0                                                     *
********************************************************************/


const message = require("../modulo/config.js")

//Import do arquivo DAO para manipular dados do BD
const filmesDAO = require('../model/DAO/filme.js')

//Função para inserir um novo filme no Banco de Dados
const setInserirNovoFilme = async function (dadosFilme) {
    //Cria a variável JSON
    let resultDadosFilme = {}
    //Validação para verificar campos obrigatórios e consistência de dados
    if(dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome.length > 80 ||
    dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse.length > 65000 ||
    dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao.length > 8 ||
    dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length > 10 ||
    dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa.length > 200 ||
    dadosFilme.valor_unitario.length > 8){
        return message.ERROR_REQUIRED_FIELDS //400 Campos obrigatórios / incorretos
    }else{
        //encaminha os dados para o DAO inserir no BD
        let novoFilme = await filmesDAO.insertFilme(dadosFilme)
        //Validação para verificar se os dados foram inseridos pelo DAO no BD
        if(novoFilme){
            //Cria o padrão JSON para reorno dos dados criados no BD
            resultDadosFilme.status = message.SUCCESS_CREATED_ITEM.status
            resultDadosFilme.status_code = message.SUCCESS_CREATED_ITEM.status_code
            resultDadosFilme.message = message.SUCCESS_CREATED_ITEM.message
            resultDadosFilme.filme = dadosFilme
            return resultDadosFilme//201
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500 Erro na camada do DAO
        }
    }
}

//Função para atualizar um filme existente
const setAtualizarFilme = async function () {

}

//Função para excluir um filme existente
const setExcluirFilme = async function (id) {

}

//Função para retornar todos os filmes do Banco de Dados - *
const getListarFilmes = async function () {

    //Cria uma variável do tipo JSON
    let filmesJSON = {}

    //Chama a função do DAO para buscar os dados do BD
    let dadosFilmes = await filmesDAO.selectAllFilmes()

    //Verifica se os dados no DB foram processados
    if (dadosFilmes) {
        //Verifica se existem dados de retorno
        if (dadosFilmes.length > 0) {
            //Montando o JSON para retornar para o APP
            filmesJSON.filmes = dadosFilmes
            filmesJSON.quantidade = dadosFilmes.length
            filmesJSON.status_code = 200

            //Retorna o JSON montado
            return filmesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

//Função para buscar um filme pelo ID - *
const getBuscarFilme = async function (id) {
    //Recebe o id do filme
    let idFilme = id

    //Variável para criar o JSON de retorno do filme
    let filmeJSON = {}

    //Validação para ID vazio, indefinição ou não numérico
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID
    } else {

        //Solicita para o DAO a busca do filme pelo ID
        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)

        //Validação para verificar se os dados no servidor de BD foram processados
        if (dadosFilme) {
            //Validação para verificar se existem dados de retorno
            if (dadosFilme.length > 0) {
                filmeJSON.status_code = 200
                filmeJSON.filme = dadosFilme

                return filmeJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

//Função para buscar um filme pelo nome - *
const getBuscarFilmePeloNome = async function (nomeFilme) {
    let filmeNome = nomeFilme

    let filmesJson = {}

    if (filmeNome == '' || filmeNome == undefined) {
        return message.ERROR_INVALID_ID
    }else{
        let dadosDosFilmes = await filmesDAO.selectByNameFilme(filmeNome)
        //Verifica se os dados no DB foram processados
        if (dadosDosFilmes) {
            if (dadosDosFilmes.length>0) {
                filmesJson.status_code = 200
                filmesJson.filmes = dadosDosFilmes
                filmesJson.quantiade = dadosDosFilmes.length

                return filmesJson
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getBuscarFilmePeloNome
}