
create table `user` (
	id int(11) primary key auto_increment,
    email varchar(255) not null unique,
    password varchar(255) not null,
    role int not null,
    priviledge int not null,
	activation_token char(36),
	active tinyint not null default false
);

create table `analysis` (
	id int(11) primary key auto_increment,
    name varchar(255) not null,
    value text not null,
    priviledge int not null
);
