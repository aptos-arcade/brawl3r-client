-- create a RankedMatches table with match_id as primary key, date as unix timestamp
create table CasualMatches (
    match_id varchar(40) primary key,
    date int
);

-- create a RankedResults table with match_id, player_address, outcome (0 = loss, 1 = win), and team index
create table CasualResults (
    match_id varchar(40),
    player_id varchar(64),
    collection_id_hash char(64),
    outcome int,
    team_index int,
    primary key (match_id, player_id),
    foreign key (match_id) references CasualMatches(match_id)
);

-- drop the tables
drop table CasualResults;
drop table CasualMatches;

-- select all casual matches
select * from CasualMatches;

-- select all casual results
select * from CasualResults;