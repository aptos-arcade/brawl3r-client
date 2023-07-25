-- create a RankedMatches table with match_id as primary key, date as unix timestamp
create table RankedMatches (
    match_object_id char(64) primary key,
    date int
);

-- create a RankedResults table with match_id, player_address, outcome (0 = loss, 1 = win), and team index
create table RankedResults (
    match_object_id char(64),
    player_address varchar(64),
    collection_id_hash char(64),
    outcome int,
    team_index int,
    primary key (match_object_id, player_address),
    foreign key (match_object_id) references RankedMatches(match_object_id)
);

-- drop the tables
drop table RankedResults;
drop table RankedMatches;