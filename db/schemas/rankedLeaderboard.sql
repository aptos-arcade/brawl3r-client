-- create a RankedMatches table with
-- match_id as primary key
-- status (0 = pending, 1 = active, 2 = ended)
-- date as unix timestamp
create table RankedMatches (
    match_object_id char(64) primary key,
    status int,
    date int
);

-- create a RankedResults table with match_id, player_address, outcome (0 = loss, 1 = win), and team index
create table RankedResults (
    match_object_id char(64) references RankedMatches(match_object_id),
    player_address char(64),
    collection_id_hash char(64),
    outcome int,
    eliminations int,
    team_index int,
    primary key (match_object_id, player_address)
);

-- add the eliminations column to the RankedResults table with default value 0
alter table RankedResults add column eliminations int default 0;

-- drop the tables
drop table RankedResults;
drop table RankedMatches;

-- select all ranked results
select * from RankedResults;