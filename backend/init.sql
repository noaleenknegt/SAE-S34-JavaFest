drop table if exists Articles;
create table Articles(
    id_article int auto_increment,
    nom_article varchar(255),
    stock int,
    image varchar(255),
    prix decimal(15,2),
    primary key (id_article)
);