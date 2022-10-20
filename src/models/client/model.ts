export interface Client {
    id: string,
    clientname: string,
    createAt: Date
}

export type ClientCreateParams = Pick<Client, "clientname">
export type ClientUpdateParams = Pick<Client, "id" |"clientname">
