import { Client } from '../client/model';
  
export interface Terminal {
    id: string,
    client: Client,
    name: string
    createAt: Date
}

export type TerminalCreateParams = Pick<Terminal, "name" |  "client">
export type TerminalUpdateParams = Pick<Terminal, "id" | "name" |  "client">