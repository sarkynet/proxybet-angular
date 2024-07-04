export interface Fixture {
    teamA: string,
    teamB: string,
    matchTime: Date,
    option: string,
    odd: number;
    status: string,
    win: boolean
}

export interface Ticket {
    title: string,
    limit: number,
    closeTime: string,
    closeDate: string,
    fixtures: [] | any,
    totalOdds: number,
    status: string,
    win: boolean,
    users: [] | any
}