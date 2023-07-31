-- create a CasualMatches table with
-- match_id as primary key,
-- status (0 = in progress, 1 = finished, 2 = cancelled),
-- date as unix timestamp
create table CasualMatches (
    match_id varchar(40) primary key,
    status int,
    date int
);

-- create a CasualResults table with
-- match_id,
-- player_id,
-- collection_id_hash,
-- outcome (0 = loss, 1 = win),
-- team index
create table CasualResults (
    match_id varchar(40) references CasualMatches(match_id),
    player_id varchar(64) references Players(player_id),
    collection_id_hash char(64),
    outcome int,
    eliminations int,
    team_index int,
    primary key (match_id, player_id)
);

-- alter CasualResults to add eliminations column with default value 0
alter table CasualResults add column eliminations int default 0;

-- remove the eliminations column from CasualResults
alter table CasualResults drop column eliminations;

-- drop the tables
drop table CasualResults;
drop table CasualMatches;

-- select all casual matches
select * from CasualMatches;

-- select all casual results
select * from CasualResults;

-- select the top 10 players by wins over the last 10 days, include player name
select p.player_name, count(*) as wins, sum(r.eliminations) as eliminations
from CasualResults r
join Players p on p.player_id = r.player_id
join CasualMatches m on m.match_id = r.match_id
where r.outcome = 1 and m.date > extract(epoch from now()) - 864000
group by r.player_id, p.player_name
order by wins desc
limit 10;