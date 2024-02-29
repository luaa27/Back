var filmesAcme = require('../modulo/filmes')

const getFilmes = function (){
    return filmesAcme.filmes
}

const getFilmesPeloId = function(id_filme){
    let filmeID = id_filme
    let dados

    filmesAcme.filmes.filmes.forEach(function(filme){
        if(filme.id == filmeID){
            dados = filme
        }
    })
    return dados
}

// getFilmes()

// getFilmesPeloId('1')

module.exports={
    getFilmes,
    getFilmesPeloId
}