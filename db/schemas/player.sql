create table Players (
    player_id varchar(64) primary key,
    player_name varchar(64) unique not null
);

drop table Players;

-- select all players
select * from Players;