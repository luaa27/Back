create database db_acme_filmes_turma_ab;

use db_acme_filmes_turma_ab;

create table tbl_filme (
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    sinopse text not null,
	duracao time not null,
	data_lancamento date not null,
	data_relancamento date,
	foto_capa varchar(200) not null,
	valor_unitario float,
	unique index(id),
	unique key(id)
);

show tables;

desc tbl_filme;

insert into tbl_filme (nome,
					   sinopse,
                       duracao,
                       data_lancamento,
                       data_relancamento,
                       foto_capa,
                       valor_unitario)
                       values
                       ("Elementos",
                       "Elementos é um filme de animação que se passa em uma sociedade extraordinária chamada Cidade Elemento, na qual os quatro elementos da natureza - ar, terra, fogo e ar - vivem em completa harmonia. Na história, somos apresentados à Faísca (fogo, dublada por Leah Lewis), uma mulher espirituosa na faixa dos vinte anos, com um grande senso de humor e apaixonada pela família, mas que tem um temperamento um pouco quente; Gota (água, dublado por Mamoudou Athie) é um jovem empático, observador e extrovertido, que não tem medo de demonstrar suas emoções - na verdade, é até um pouco difícil controlá-las; Turrão (terra, dublado por Mason Wertheimer) é um garoto muito inteligente da terra que mora na Vila do Fogo, e está sempre perto de Faísca; e Névoa (ar, dublada por Wendi McLendon-Covey), que tem uma personalidade fofa e rosa, está sempre atenta às tendências da moda e é fã dos Windbreakers, um time de Air Ball.",
                       "01:42:00",
                       "2023-06-22",
                       null,
                       "https://br.web.img2.acsta.net/c_310_420/pictures/22/11/17/20/58/0132283.jpg",
                       "50.00"),
                       ("Moana: Um mar de aventuras",
                       "Moana Waialiki é uma corajosa jovem, filha única do chefe de uma tribo na Oceania, vinda de uma longa linhagem de navegadores. Quando os pescadores de sua ilha não conseguem pescar nenhum peixe e as colheitas falham, ela descobre que o semideus Maui causou a praga ao roubar o coração da deusa Te Fiti. Entusiasta das viagens marítimas, a jovem se vê querendo descobrir mais sobre seu passado e ajudar a comunidade, mesmo que a família queira proteger Moana a qualquer custo. Então, ela resolve partir em busca de seus ancestrais, habitantes de uma ilha mítica que ninguém sabe onde é. A única maneira de curar a ilha é persuadir Maui a devolver o coração de Te Fiti, então Moana parte em uma jornada épica pelo Pacífico. Moana começa sua jornada em mar aberto, onde enfrenta terríveis criaturas marinhas e descobre histórias do submundo. O filme é baseado em histórias da mitologia polinésia.",
                       "01:47:00",
                       "2017-01-05",
                       null,
                       "https://br.web.img3.acsta.net/c_310_420/pictures/16/09/12/22/13/415370.jpg",
                       "50.00");
                       
select * from tbl_filme;

select * from tbl_filme where nome like '%elementos%';

show tables;

drop table tbl_teste;