
create table `user` (
	id int(11) primary key auto_increment,
    email varchar(255) not null unique,
    password varchar(255) not null,
    role int not null,
    priviledge int not null,
	activation_token char(36),
	active tinyint not null default false,
    name varchar(255) not null default '',
    date_of_birth date,
    country varchar(255) not null default '',
    region varchar(255) not null default '',
    postal_code varchar(10) not null default '',
    phone_number varchar(20) not null default ''
);

create table `analysis` (
	id int(11) primary key auto_increment,
    name varchar(255) not null,
    value text not null,
    priviledge int not null
);
