create database lldb;

use lldb;

create table team (
	id int auto_increment primary key,
	name varchar(100) unique not null,
	year int not null,
	website text,
	president varchar(255) not null,
	badge text not null,
	city varchar(100) not null,
	mainColor varchar(7) not null,
	secondaryColor varchar(7) not null
)

create table stadium (
	id int auto_increment primary key,
	name varchar(100) not null,
	year int not null,
	latitude decimal(9,6) not null,
	longitude decimal(9,6) not null,
	capacity int not null,
	photo text,
	team_id int unique not null,
	foreign key (team_id) references team(id)
)

create table manager (
	id int auto_increment primary key,
	name varchar(100) not null,
	lastName varchar(100) not null,
	country varchar(100) not null,
	birthday date not null,
	photo text,
	team_id int unique not null,
	foreign key (team_id) references team(id)
)

create table player (
	id int auto_increment primary key,
	name varchar(100) not null,
	lastName varchar(100) not null,
	number int not null,
	height int not null,
	country varchar(100) not null,
	position enum('Goalkeeper','Defender','Midfielder','Forward'),
	birthday date not null,
	photo text,
	team_id int unique not null,
	foreign key (team_id) references team(id)
)