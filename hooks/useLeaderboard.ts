import { useEffect, useState, useCallback } from 'react';

import {useAptos} from "@/contexts/AptosContext";

import {LeaderboardRow} from "@/types/LeaderboardRow";

const useLeaderboard = () => {

    const { provider } = useAptos();

    const [leaderboardRows, setLeaderboardRows] = useState<LeaderboardRow[]>([]);

    const fetchLeaderboardRows = useCallback(async () => {
        const rows = await fetch('/api/leaderboard')
            .then((response) => response.json())
            .catch(() => []);
        setLeaderboardRows(rows as LeaderboardRow[]);
    }, [provider]);

    useEffect(() => {
        fetchLeaderboardRows();
    }, [fetchLeaderboardRows, provider]);


    return {
        leaderboardRows,
    }
}

export default useLeaderboard;