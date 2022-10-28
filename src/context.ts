import config from '../config/config';
import jwt from 'jsonwebtoken';
import { getUser } from './services/user.service';

interface Context {
    currentUser?: string
}

export const context = async ({ req }: any) => {
    const auth = req ? req.headers.authorization : null;

    try {
        if (auth && auth.toLocaleLowerCase().startsWith("bearer ")) {    
            const decodeToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
            const currentUser = getUser((<jwt.JwtPayload> decodeToken).id)                            
            return { currentUser };    
        }
    } catch (error) {        
        return {} as Context;
    }
    return {} as Context;
}