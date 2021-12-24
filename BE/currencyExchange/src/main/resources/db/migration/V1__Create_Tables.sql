create table currency(
     id bigint not null unique ,
    symbol varchar(3) not null unique ,
    description varchar(255) not null,
    constraint currency_pkey primary key (id)
);

create table user_credentials(
     id bigint not null unique ,
     email varchar(255) not null unique,
     name varchar(255) not null,
     password varchar(255) not null,
     is_valid boolean,
     constraint user_credentials_pkey primary key (id)
);
CREATE SEQUENCE hibernate_sequence START 1;

insert into currency (id, symbol, description) values (1, 'CAD', 'Canadian Dollar');
insert into currency (id, symbol, description) values (2, 'NGN', 'Nigerian Naira');