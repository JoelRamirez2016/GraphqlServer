import { Terminal } from "./terminal"

enum Status {
    OK = 1,
    REFUSED = 0
}
export interface Transaction {
    id: string
    terminal: Terminal
    value: number
    status: Status
    createAt: Date
}

export type TransactionCreateParams = Omit<Transaction, "id" | "createAt">
