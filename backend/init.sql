drop table if exists Articles;
drop table if exists Pass;
create table Articles(
    id_article int auto_increment,
    nom_article varchar(255),
    stock int,
    image varchar(255),
    prix decimal(15,2),
    primary key (id_article)
);

CREATE TABLE Pass(
    id_pass INT AUTO_INCREMENT,
    nom_pass VARCHAR(255),
    prix DECIMAL(15,2),
    quantite_restante INT,
    quantite_base INT,
    duree INT,
    PRIMARY KEY(id_pass)
);