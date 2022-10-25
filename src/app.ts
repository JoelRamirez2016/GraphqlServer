import config from '../config/config';
import jwt from 'jsonwebtoken';
import { getUser } from './services/user.service';

export const context = ({ req }: any) => {
    const auth = req ? req.headers.authorization : null;

    try {
        if (auth && !auth.toLocaleLowerCase().startsWith("bearer ")) {    
            const decodeToken = jwt.verify(auth.substring(7), config.JWT_SECERT);
            const currentUser = getUser((<jwt.JwtPayload> decodeToken).id);
            return { currentUser };    
        }
    } catch (error) {
        return {};
    }
    return {};
}