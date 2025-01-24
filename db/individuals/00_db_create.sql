create database lldb;

use lldb;

create table league (
	id int auto_increment primary key,
	country varchar(100) not null,
	season int unique not null
);

create table matchday (
	matchday int not null,
	league_id int not null,
	foreign key (league_id) references league(id),
	primary key (matchday,league_id)
);

create table team (
	id int auto_increment primary key,
	name varchar(100) unique not null,
	shortName varchar(100) not null,
	year int not null,
	website text,
	president varchar(255) not null,
	badge text not null,
	city varchar(100) not null,
	mainColor varchar(7) not null,
	secondaryColor varchar(7) not null
);

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
);

create table `match` (
	matchdate datetime not null,
	localTeam_id int not null,
	awayTeam_id int not null,
	stadium_id int not null,
	matchday_id int not null,
	league_id int not null,
	foreign key (matchday_id) references matchday(matchday),
	foreign key (localTeam_id) references team(id),
	foreign key (awayTeam_id) references team(id),
	foreign key (stadium_id) references stadium(id),
	foreign key (league_id) references league(id),
	primary key (league_id,matchday_id,matchdate,localTeam_id,awayTeam_id,stadium_id)
);

CREATE INDEX idx_matchdate ON `match` (matchdate);

create table teammatchstats (
	team_id int not null,
	matchdate datetime not null,
	possession int not null,
	shots int,
	shots_on_target int,
	corners int,
	offsides int,
	fouls int,
	goals int not null,
	foreign key (team_id) references team(id),
	foreign key (matchdate) references `match`(matchdate),
	primary key (team_id,matchdate)
);

create table manager (
	id int auto_increment primary key,
	name varchar(100) not null,
	lastName varchar(100) not null,
	country varchar(100) not null,
	birthday date not null,
	photo text,
	team_id int unique not null,
	foreign key (team_id) references team(id)
);

create table player (
	id int auto_increment primary key,
	name varchar(100) not null,
	lastName varchar(100) not null,
	knownAs varchar(100),
	number int not null,
	height int not null,
	country varchar(100) not null,
	position enum('Goalkeeper','Defender','Midfielder','Forward') not null,
	birthday date not null,
	photo text,
	team_id int not null,
	foreign key (team_id) references team(id)
);

create table matchevent (
	player_id int not null,
	type enum('Substitution','YellowCard','RedCard','Goal'),
	minute int not null,
	other_player_id int,
	team_id int not null,
	matchdate datetime not null,
	foreign key (player_id) references player(id),
	foreign key (other_player_id) references player(id),
	foreign key (team_id, matchdate) references teammatchstats(team_id,matchdate),
	primary key (player_id,team_id, matchdate)
);

create table teamstats (
	team_id int not null,
	league_id int not null,
	points int not null default 0,
	matches_played int not null default 0,
	wins int not null default 0,
	draws int not null default 0,
	losses int not null default 0,
	goals_scored int not null default 0,
	goals_conceded int not null default 0,
	foreign key (team_id) references team(id),
	foreign key (league_id) references league(id),
	primary key (team_id,league_id)
);