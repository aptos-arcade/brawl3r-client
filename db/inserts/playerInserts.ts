
const upsertPlayerName = (playerId: string, name: string) => `
    insert into Players (player_id, player_name)
    values ('${playerId}', '${name}')
    on conflict (player_id) do update
    set player_name = '${name}';
`;