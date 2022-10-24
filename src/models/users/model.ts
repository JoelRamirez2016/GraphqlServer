export interface User {
    id: string,
    name: string
    email: string
    username: string
    password: string
    createAt: Date
}

export type UserCreateParams = Omit<User, "id" | "createAt">
export type UserUpdateParams = Omit<User, "createAt">
export type UserToken = Pick<User, "username" | "id">