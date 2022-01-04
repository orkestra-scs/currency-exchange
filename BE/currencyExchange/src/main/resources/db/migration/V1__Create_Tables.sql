create table currency(
     id bigint not null unique ,
    symbol varchar(3) not null unique ,
    description varchar(255) not null,
    constraint currency_pkey primary key (id)
);

create table user_credentials(
     id bigint not null unique ,
     username varchar(255) not null unique,
     password varchar(255) not null,
     is_valid boolean,
     constraint user_credentials_pkey primary key (id)
);
CREATE SEQUENCE hibernate_sequence START 3;

create table if not exists spring_session
(
    primary_id char(36) not null,
    session_id char(36) not null,
    creation_time bigint not null,
    last_access_time bigint not null,
    max_inactive_interval integer not null,
    expiry_time bigint not null,
    principal_name varchar(100),
    constraint spring_session_pk
    primary key (primary_id)
    );

create unique index if not exists spring_session_ix1
	on spring_session (session_id);

create index if not exists spring_session_ix2
	on spring_session (expiry_time);

create index if not exists spring_session_ix3
	on spring_session (principal_name);

create table if not exists spring_session_attributes
(
    session_primary_id char(36) not null,
    attribute_name varchar(200) not null,
    attribute_bytes bytea not null,
    constraint spring_session_attributes_pk
    primary key (session_primary_id, attribute_name),
    constraint spring_session_attributes_fk
    foreign key (session_primary_id) references spring_session
    on delete cascade
    );

insert into currency (id, symbol, description) values (1, 'CAD', 'Canadian Dollar');
insert into currency (id, symbol, description) values (2, 'NGN', 'Nigerian Naira');