export interface Client {
    id: string,
    name: string,
    createAt: Date
}

export type ClientCreateParams = Pick<Client, "name">
export type ClientUpdateParams = Pick<Client, "id" |"name">
