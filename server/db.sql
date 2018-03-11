
create table `user` (
	id int(11) primary key auto_increment,
    email varchar(255) not null unique,
    password varchar(255) not null
);

create table `analysis` (
	id int(11) primary key auto_increment,
    name varchar(255) not null,
    value numeric(20,2) not null
);
