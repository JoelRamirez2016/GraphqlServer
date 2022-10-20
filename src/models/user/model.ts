export interface User {
    id: string,
    username: string,
    createAt: Date
}

export type UserParams = Pick<User, "username">