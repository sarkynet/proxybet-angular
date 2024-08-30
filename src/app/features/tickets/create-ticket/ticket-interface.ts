export interface Fixture {
    teamA: string,
    teamB: string,
    time: string,
    option: string,
    odd: number;
    status: string,
    result: boolean
}

export interface Ticket {
    _id: string,
    title: string,
    class: string,
    disabled: boolean,
    limit: number,
    closeTime: string,
    closeDate: any,
    fixtures: Fixture[] ,
    totalOdds: number,
    status: string,
    win: boolean,
    created: string,
    users: User[]
}

interface User {
    _id:string,
    stake: number
}