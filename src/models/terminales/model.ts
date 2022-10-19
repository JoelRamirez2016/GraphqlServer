import { User } from '../user/model';
  
export interface Terminal {
    id: string,
    user: User,
    name: string
    createAt: Date
}